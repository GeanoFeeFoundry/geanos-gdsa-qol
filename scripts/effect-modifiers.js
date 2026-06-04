// Parses FoundryVTT ActiveEffects on a character and derives pre-fill modifiers
// for GDSA skill/stat/spell/liturgy/AT/PA/FK/dodge dialogs.
//
// Effect format expected in effect.description:
//   "wache halten -5, raufen AT -4"
//   "alle körperlichen Talente -2; MU +1"
//   "alle Zauber -3"
//
// Separators between entries: , ; / newline
// Modifier must be the last token: [target text] [+/-][number]

// ─── Effect source ────────────────────────────────────────────────────────────

// Strip HTML tags and decode common entities from a description string.
// FoundryVTT stores ActiveEffect descriptions as rich text (ProseMirror HTML).
function _stripHtml(html) {
    const doc = new DOMParser().parseFromString(html ?? "", "text/html");
    return doc.body.textContent ?? "";
}

export function getActorEffects(actor) {
    const result = [];
    for (const e of (actor.effects ?? [])) {
        if (e.disabled) continue;
        const name = e.name ?? e.label ?? "";
        const raw  =
            e.description           ??
            e._source?.description  ??
            e.flags?.gdsa?.description ??
            e.flags?.core?.description ??
            "";
        const description = _stripHtml(raw).trim();
        if (name && description) result.push({ name, description });
    }
    return result;
}

// ─── Description parsing ──────────────────────────────────────────────────────

function _parseDescription(desc) {
    const entries = [];
    for (const part of desc.split(/[,;\n\/]+/)) {
        // Match: [any text] [optional colon] [+/-][digits]
        // Handles formats like "Wissenstalente: -3" and "raufen AT -4"
        const m = part.trim().match(/^(.+?):?\s*([+\-]\s*\d+)\s*$/);
        if (!m) continue;
        // Strip trailing colon/whitespace from the target
        const rawTarget = m[1].trim().replace(/:+$/, "").trim();
        const modifier  = parseInt(m[2].replace(/\s/g, ""));
        if (rawTarget && Number.isFinite(modifier)) {
            entries.push({ rawTarget: rawTarget.toLowerCase(), modifier });
        }
    }
    return entries;
}

// ─── Normalisation ────────────────────────────────────────────────────────────

function _n(s) {
    return s.toLowerCase()
        .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
        .replace(/\s+/g, " ").trim();
}

// ─── Talent category lookup (uses GDSA's CONFIG.Templates at runtime) ─────────

function _talentCat(talentName) {
    const nT = _n(talentName);
    const talent = CONFIG.Templates?.talents?.all?.find(t =>
        // Match by document name OR by the German display name (system.tale.DE),
        // because GDSA talent packs may store one but sheet may display the other.
        _n(t.name) === nT ||
        _n(t.system?.tale?.DE  ?? "") === nT ||
        _n(t.system?.tale?.EN  ?? "") === nT
    );
    return talent?.system?.tale?.type ?? null;
    // known categories: "body", "social", "nature", "knowledge", "craft", "combat",
    //                   "gift", "lang", "sign", "meta"
}

function _isFkTalent(talentName) {
    const nT = _n(talentName);
    const t = CONFIG.Templates?.talents?.all?.find(t =>
        _n(t.name) === nT ||
        _n(t.system?.tale?.DE ?? "") === nT ||
        _n(t.system?.tale?.EN ?? "") === nT
    );
    return t?.system?.tale?.cmbttype === "range";
}

// ─── Spell Merkmal lookup ─────────────────────────────────────────────────────

// Maps normalised German Merkmal name patterns → trait code array.
// String patterns are checked via nR.includes(pat); RegExp via pat.test(nR).
// Broad patterns (Elementar, Dämonisch) list all sub-type codes so that
// "Elementar: -3" also matches spells with only trait "feur" / "eis" etc.
const _MERKMAL_MAP = [
    { pat: "antimagie",       codes: ["anti"]   },
    { pat: "beschwoerung",    codes: ["conju"]  },  // _n("Beschwörung")
    { pat: "eigenschaft",     codes: ["attri"]  },
    { pat: "einfluss",        codes: ["sugge"]  },
    { pat: /\bform\b/,        codes: ["form"]   },
    { pat: "geisterwesen",    codes: ["ghost"]  },
    { pat: "heilung",         codes: ["heal"]   },
    { pat: "hellsicht",       codes: ["forse"]  },
    { pat: "herbeirufung",    codes: ["summ"]   },
    { pat: "herrschaft",      codes: ["reign"]  },
    { pat: "illusion",        codes: ["illu"]   },
    { pat: /\bkraft\b/,       codes: ["force"]  },
    { pat: "limbus",          codes: ["limbus"] },
    { pat: "metamagie",       codes: ["meta"]   },
    { pat: /\bobjekt\b/,      codes: ["object"] },
    { pat: "schaden",         codes: ["damage"] },
    { pat: "telekinese",      codes: ["teleke"] },
    { pat: "temporal",        codes: ["tempo"]  },
    { pat: "umwelt",          codes: ["soround"]},
    { pat: "verstaendigung",  codes: ["speak"]  },  // _n("Verständigung")
    // Elementar: broad pattern covers all sub-types
    { pat: "elementar",       codes: ["elem","feur","wass","eis","humu","luft","erz"] },
    { pat: /\bfeuer\b/,       codes: ["feur"]   },
    { pat: "wasser",          codes: ["wass"]   },
    { pat: /\beis\b/,         codes: ["eis"]    },
    { pat: /\berz\b/,         codes: ["erz"]    },
    { pat: /\bluft\b/,        codes: ["luft"]   },
    { pat: "humus",           codes: ["humu"]   },
    // Dämonisch: broad pattern covers all named demons
    { pat: "daemonisch",      codes: ["daemo","blak","belh","char","thar","amaz","bels","asfa","tasf","belz","agri","belk","loig"] },
    { pat: "blakharaz",       codes: ["blak"]   },
    { pat: "belhalhar",       codes: ["belh"]   },
    { pat: "charyptoroth",    codes: ["char"]   },
    { pat: "thargunitoth",    codes: ["thar"]   },
    { pat: "amazeroth",       codes: ["amaz"]   },
    { pat: "belshirash",      codes: ["bels"]   },
    { pat: "asfaloth",        codes: ["asfa"]   },
    { pat: "tasfarelel",      codes: ["tasf"]   },
    { pat: "belzhorash",      codes: ["belz"]   },
    { pat: "agrimoth",        codes: ["agri"]   },
    { pat: "belkelel",        codes: ["belk"]   },
    { pat: "lolgramoth",      codes: ["loig"]   },
];

function _patTest(pat, nR) {
    return typeof pat === "string" ? nR.includes(pat) : pat.test(nR);
}

// Returns the trait code array for a spell (trait1–trait4 minus "none").
function _spellTraits(spellName) {
    const nS = _n(spellName);
    const spell = CONFIG.Templates?.spell?.all?.find(s => _n(s.name) === nS);
    if (!spell) return [];
    return ["trait1","trait2","trait3","trait4"]
        .map(k => spell.system?.[k])
        .filter(t => t && t !== "none");
}

// ─── Liturgy deity (Verbreitung) lookup ──────────────────────────────────────

// Maps normalised deity name patterns → 3-letter Verbreitung key used in
// liturgy system.verb objects (e.g. "Pra", "Ron").
const _DEITY_VERBREITUNG = [
    { pat: "praios",     code: "Pra" },
    { pat: "rondra",     code: "Ron" },
    { pat: "phex",       code: "Phx" },
    { pat: "firun",      code: "Fir" },
    { pat: "travia",     code: "Tra" },
    { pat: "ingerimm",   code: "Ing" },
    { pat: "boron",      code: "Bor" },
    { pat: "efferd",     code: "Eff" },
    { pat: "hesinde",    code: "Hes" },
    { pat: "peraine",    code: "Per" },
    { pat: "rahja",      code: "Rah" },
    { pat: /\btsa\b/,    code: "Tsa" },
    { pat: "ifirn",      code: "Ifi" },
    { pat: "aves",       code: "Ave" },
    { pat: /\bkor\b/,    code: "Kor" },
    { pat: "nandus",     code: "Nan" },
    { pat: "swafnir",    code: "Swf" },
    { pat: "tairach",    code: "Tai" },
    { pat: "angrosch",   code: "Ang" },
    { pat: "gravesh",    code: "Grv" },
    { pat: "himmelsw",   code: "Him" },  // _n("Himmelswölfe") starts with "himmelsw"
    { pat: "zsahh",      code: "Zsa" },
    { pat: "szint",      code: "Hsz" },  // H'Szint → loose match on "szint"
    { pat: "kamaluq",    code: "Kam" },
    { pat: "namenlos",   code: "Nam" },
];

// Returns the system.verb object for a liturgy (keys = deity codes, values = boolean).
function _liturgyVerb(liturgyName) {
    const nL = _n(liturgyName);
    const liturgy = CONFIG.Templates?.liturgy?.all?.find(l => _n(l.name) === nL);
    return liturgy?.system?.verb ?? null;
}

// ─── Universal modifier check ─────────────────────────────────────────────────
//
// Returns true when the rawTarget clearly means "all rolls of any kind", e.g.:
//   "alle Proben"   "alle Proben und Würfe"   "alle"   "alle Würfe"
//
// Excluded: qualified "alle X" patterns that belong to a specific matcher
// ("alle Zauber" → _matchSpell, "alle Talente" → _matchTalent, etc.)
function _isUniversalMod(nR) {
    if (nR === "alle") return true;
    if (/\balle\b/.test(nR) && /\bwurf/.test(nR)) return true;
    // "alle Proben" without a type qualifier
    if (/\balle\b/.test(nR) && /\bprobe/.test(nR) &&
        !/\bzauber\b/.test(nR) && !/\btalent\b/.test(nR) &&
        !/\bliturg\b/.test(nR) && !/\bwunder\b/.test(nR)) return true;
    return false;
}

// ─── Match functions ──────────────────────────────────────────────────────────

function _matchTalent(raw, talentName) {
    const nR = _n(raw), nT = _n(talentName);
    if (_isUniversalMod(nR)) return true;
    if (nR === nT) return true;
    if (nT.length >= 4 && nR.includes(nT)) return true;
    if (nR.length >= 4 && nT.includes(nR)) return true;

    const cat = _talentCat(talentName);

    // Category keywords — prefix-based (no trailing \b) so "Xtalente" forms work too.
    // All patterns are tested on the normalised rawTarget (nR).
    //
    // German group names from GDSA (de.json): Körperlich, Gesellschaft, Natur,
    // Wissen, Sprachen, Schriften, Handwerk, Gaben, Metatalent/Metamagie, Kampf.
    if (/körperl|koerperl/.test(nR))                          return cat === "body";
    if (/gesellschaft/.test(nR))                               return cat === "social";
    if (/\bnatur/.test(nR))                                    return cat === "nature";
    if (/\bwissen/.test(nR))                                   return cat === "knowledge";
    if (/handwerk|craft/.test(nR))                             return cat === "craft";
    if (/\bgabe/.test(nR))                                     return cat === "gift";
    if (/\bsprach/.test(nR))                                   return cat === "lang";
    if (/\bschrift/.test(nR))                                  return cat === "sign";
    if (/metatalent|metamagie/.test(nR))                       return cat === "meta";
    if (/\bkampf/.test(nR) && !/\bausweich/.test(nR))         return cat === "combat";
    if (/^alle\b.*\btal/.test(nR))                             return true;
    return false;
}

function _matchSpell(raw, spellName) {
    const nR = _n(raw), nS = _n(spellName);
    if (_isUniversalMod(nR)) return true;
    if (nR === nS) return true;
    if (nS.length >= 4 && nR.includes(nS)) return true;
    if (nR.length >= 4 && nS.includes(nR)) return true;
    if (/alle\s+zauber|jeder\s+zauber/.test(nR)) return true;
    // Merkmal matching: check if rawTarget names a Merkmal of this spell
    const traits = _spellTraits(spellName);
    if (traits.length) {
        for (const { pat, codes } of _MERKMAL_MAP) {
            if (_patTest(pat, nR) && traits.some(t => codes.includes(t))) return true;
        }
    }
    return false;
}

function _matchLiturgy(raw, liturgyName) {
    const nR = _n(raw), nL = _n(liturgyName);
    if (_isUniversalMod(nR)) return true;
    if (nR === nL) return true;
    if (nL.length >= 4 && nR.includes(nL)) return true;
    if (nR.length >= 4 && nL.includes(nR)) return true;
    if (/alle\s+liturg|jede\s+liturg|alle\s+wunder/.test(nR)) return true;
    // Deity (Verbreitung) matching: "Praios Liturgien", "alle Boron-Liturgien" etc.
    const verb = _liturgyVerb(liturgyName);
    if (verb) {
        for (const { pat, code } of _DEITY_VERBREITUNG) {
            if (_patTest(pat, nR) && verb[code] === true) return true;
        }
    }
    return false;
}

const _STAT_ALIASES = {
    MU: ["mut"],
    KL: ["klugheit"],
    IN: ["intuition"],
    CH: ["charisma"],
    FF: ["fingerfertigkeit"],
    GE: ["gewandtheit"],
    KO: ["konstitution"],
    KK: ["koerperkraft", "kraft"],
    MR: ["magieresistenz"],
};

function _matchStat(raw, stattype) {
    const nR = _n(raw);
    if (_isUniversalMod(nR)) return true;
    if (nR === stattype.toLowerCase()) return true;
    return (_STAT_ALIASES[stattype] ?? []).some(a => nR === a || nR.includes(a));
}

// AT: "raufen at", "alle at", "at", plain talent name
function _matchAT(raw, combatTalent) {
    const nR  = _n(raw);
    const nCT = _n(combatTalent ?? "");
    if (_isUniversalMod(nR)) return true;
    if (/^alle\s+at$/.test(nR) || nR === "at") return true;
    if (nCT.length >= 3 && nR.includes(nCT) && /\bat\b/.test(nR)) return true;
    if (nCT.length >= 3 && nR === nCT) return true; // bare talent name → AT
    return false;
}

// PA: "raufen pa", "alle pa", "pa", plain talent name (if not caught by AT)
function _matchPA(raw, combatTalent) {
    const nR  = _n(raw);
    const nCT = _n(combatTalent ?? "");
    if (_isUniversalMod(nR)) return true;
    if (/^alle\s+pa$/.test(nR) || nR === "pa") return true;
    if (nCT.length >= 3 && nR.includes(nCT) && /\bpa\b/.test(nR)) return true;
    return false;
}

// FK: "bogen fk", "alle fk", "fk", "fernkampf", or any ranged-talent name
function _matchFK(raw, fkTalent) {
    const nR  = _n(raw);
    const nCT = _n(fkTalent ?? "");
    if (_isUniversalMod(nR)) return true;
    if (/^alle\s+fk$/.test(nR) || nR === "fk" || nR.includes("fernkampf")) return true;
    if (nCT.length >= 3 && nR.includes(nCT)) return true;
    return false;
}

function _matchAusweichen(raw) {
    const nR = _n(raw);
    return _isUniversalMod(nR) || nR.includes("ausweich");
}

// ─── Resource modifier changes ───────────────────────────────────────────────
//
// Keywords like "INI", "LeP", "AsP" etc. in effect descriptions are NOT pre-filled
// into dialog fields. Instead they are written directly into the ActiveEffect's
// `changes` array so FoundryVTT applies (and automatically reverts) them as the
// effect becomes active / disabled / deleted.
//
// Data-path mapping (ADD mode = 2):
//   INI / Initiative  → system.INIBasis.modi   (affects the 1d6+@INIBasis.modi formula)
//   LeP               → system.LeP.max         (temporary max-LeP reduction)
//   AsP               → system.AsP.max         (temporary max-AsP reduction)
//   pAsP              → system.AsP.max         (permanent AsP consumption → reduces max)
//   AuP               → system.AuP.max         (temporary max-AuP reduction)
//   KaP               → system.KaP.max         (temporary max-KaP reduction)

const _RESOURCE_KEYS = {
    ini:           "system.INIBasis.modi",
    initiative:    "system.INIBasis.modi",
    lep:           "system.LeP.max",
    lebensenergie: "system.LeP.max",
    asp:           "system.AsP.max",
    astralpunkte:  "system.AsP.max",
    pasp:          "system.AsP.max",
    aup:           "system.AuP.max",
    ausdauer:      "system.AuP.max",
    kap:           "system.KaP.max",
    karmapunkte:   "system.KaP.max",
};

// All data-paths we own, so we can remove stale changes on update.
const _RESOURCE_PATHS = new Set(Object.values(_RESOURCE_KEYS));

function _isOurChange(change) {
    return _RESOURCE_PATHS.has(change.key);
}

// Build the changes[] entries for resource keywords found in a description.
function _buildResourceChanges(description) {
    const stripped = _stripHtml(description ?? "");
    const changes  = [];
    for (const { rawTarget, modifier } of _parseDescription(stripped)) {
        const path = _RESOURCE_KEYS[rawTarget.toLowerCase()];
        if (path) {
            changes.push({ key: path, mode: 2, value: String(modifier), priority: null });
        }
    }
    return changes;
}

// Called on preCreateActiveEffect / preUpdateActiveEffect.
// Merges computed resource changes with any user-defined non-resource changes.
function _syncResourceChanges(effect, descriptionOrData) {
    const desc =
        typeof descriptionOrData === "string"
            ? descriptionOrData
            : (descriptionOrData.description ?? effect.description ?? "");
    const resourceChanges = _buildResourceChanges(desc);
    // Preserve non-resource changes the user (or another system) added
    const userChanges = (effect.changes ?? []).filter(c => !_isOurChange(c));
    return [...userChanges, ...resourceChanges];
}

export function registerEffectChangeHooks() {
    // ── Effect CREATED ────────────────────────────────────────────────────────
    Hooks.on("preCreateActiveEffect", (effect, data) => {
        const desc = data.description ?? "";
        const resourceChanges = _buildResourceChanges(desc);
        // Only inject if we actually found resource keywords — preserves manually
        // set changes (e.g. KO.temp from Überlastung) when there are none.
        if (!resourceChanges.length) return;
        const userChanges = (data.changes ?? []).filter(c => !_isOurChange(c));
        effect.updateSource({ changes: [...userChanges, ...resourceChanges] });
    });

    // ── Effect UPDATED ────────────────────────────────────────────────────────
    Hooks.on("preUpdateActiveEffect", (effect, data) => {
        if (!("description" in data)) return;
        const resourceChanges = _buildResourceChanges(data.description ?? "");
        // Same guard: don't overwrite manually-set changes (like Überlastung KO.temp)
        // when no resource keywords are present in the new description.
        if (!resourceChanges.length) return;
        const userChanges = (effect.changes ?? []).filter(c => !_isOurChange(c));
        data.changes = [...userChanges, ...resourceChanges];
    });
}

// ─── Weapon talent info ───────────────────────────────────────────────────────

// Returns { talentName, isRanged } for a weapon identified by itemId on the sheet.
export function getWeaponCombatInfo(actor, itemId) {
    const UNARMED = {
        raufen: "Raufen", ringen: "Ringen",
        biss:   "Raufen", schwanz: "Raufen",
    };
    if (UNARMED[itemId]) return { talentName: UNARMED[itemId], isRanged: false };

    const weaponItem = actor.items.get(itemId);
    const skillId    = weaponItem?.system?.weapon?.skill;
    if (!skillId) return { talentName: null, isRanged: false };

    const talent = CONFIG.Templates?.talents?.all?.find(t => t._id === skillId);
    if (!talent) return { talentName: null, isRanged: false };

    return {
        talentName: talent.name,
        isRanged:   talent.system?.tale?.cmbttype === "range",
    };
}

// ─── Public API ───────────────────────────────────────────────────────────────

// Returns { delta, contributors } for a given probe type and name.
// type: "talent" | "spell" | "liturgy" | "stat" | "at" | "pa" | "fk" | "ausweichen"
// name: talent/spell/stat name, or combat talent name for AT/PA/FK
export function getEffectMods(actor, type, name) {
    const effects = getActorEffects(actor);
    let delta = 0;
    const contributors = [];

    for (const { name: effectName, description } of effects) {
        for (const { rawTarget, modifier } of _parseDescription(description)) {
            let matches = false;
            switch (type) {
                case "talent":     matches = _matchTalent(rawTarget, name);     break;
                case "spell":      matches = _matchSpell(rawTarget, name);      break;
                case "liturgy":    matches = _matchLiturgy(rawTarget, name);    break;
                case "stat":       matches = _matchStat(rawTarget, name);       break;
                case "at":         matches = _matchAT(rawTarget, name);         break;
                case "pa":         matches = _matchPA(rawTarget, name);         break;
                case "fk":         matches = _matchFK(rawTarget, name);         break;
                case "ausweichen": matches = _matchAusweichen(rawTarget);       break;
            }
            if (matches) {
                delta += modifier;
                contributors.push({ name: effectName, bonus: modifier });
            }
        }
    }

    // Verzückung: 1 Erschwernis per point on talents, spells, stats, and combat rolls.
    // The counter is stored as "Verzückung: N" in the description (unsigned → not caught
    // by _parseDescription which requires an explicit +/- sign on the modifier).
    if (["talent", "spell", "stat", "at", "pa", "fk"].includes(type)) {
        const vz = effects.find(e => e.name === "Verzückung");
        if (vz) {
            const m     = vz.description.match(/Verzückung:\s*(\d+)/i);
            const points = m ? parseInt(m[1]) : 0;
            if (points > 0) {
                delta -= points;
                contributors.push({ name: "Verzückung", bonus: -points });
            }
        }
    }

    return { delta, contributors };
}
