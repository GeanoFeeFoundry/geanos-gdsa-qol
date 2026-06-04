// Automatically pre-fills advantage / disadvantage fields in GDSA modifier dialogs
// for characters with relevant Vorteile or Nachteile.
//
// Mechanism: capture-phase click listeners on .skill-roll / .spell-roll / .stat-roll
// register a persistent renderDialog hook that adjusts input[name='advantage'] or
// input[name='disadvantage'] on the next dialog that has these fields.
// Shift-clicks skip the GDSA modifier dialog — interceptors bail out early.
//
// Effect table format:
//   talents:  { bonus: N, names: [...lowercase substrings...] }
//   spells:   { bonus: N, names: [...lowercase substrings...], allSpells: true }
//   stats:    { bonus: N, stattype: "XX" }
// Negative bonus = disadvantage (pre-fills the Erschwernis field).

import { getEffectMods, getWeaponCombatInfo } from "./effect-modifiers.js";
import { applyStatusEffect, applyStatusEffectRoll } from "./status-effects.js";

// ─── Regen-dialog pre-fill ───────────────────────────────────────────────────
//
// GDSA's regeneration dialog (GetRegInfo) has three bonus fields:
//   input[name='reglep']  — flat LeP bonus per resting phase
//   input[name='regasp']  — flat AsP bonus per resting phase
//   input[name='regkap']  — flat KaP bonus per resting phase
//   input[name='disadvantage'] — environmental penalty (applied to all)
//
// GDSA already handles these internally in onReg — DON'T double-count:
//   Schlechte Regeneration (Nachteil) → HPBonus -= 1 (LeP)
//   Regeneration I/II (SF)            → APBonus += 1/2 (AsP)
//   Meisterliche Regeneration (SF)    → full recalculation of AsP
//
// We pre-fill only what GDSA does NOT handle:
//   Schnelle Heilung I/II/III  → reglep  +1/+2/+3
//   Astrale Regeneration I/II/III → regasp +1/+2/+3
//   Astraler Block (Nachteil)  → regasp  −1

// Extract Roman numeral level (I=1, II=2, III=3) from an item name.
function _romanLevel(name) {
    if (/\bIII\b/.test(name)) return 3;
    if (/\bII\b/.test(name))  return 2;
    if (/\bI\b/.test(name))   return 1;
    return 1;
}

// Computes the regen bonus/penalty from the actor's items.
// Returns { lep, asp, lepContrib, aspContrib, lepSysNotes, aspSysNotes }.
// lepSysNotes / aspSysNotes list traits that the GDSA system handles natively
// (i.e. the module does NOT pre-fill a value for them, but they are already
// applied by the system — shown in the tooltip so players don't enter them twice).
function _regenDeltas(actor) {
    let lep = 0, asp = 0;
    const lepContrib = [], aspContrib = [];
    const lepSysNotes = [], aspSysNotes = [];

    for (const item of actor.items) {
        if (item.type !== "Template") continue;
        const n = item.name ?? "";

        if (n.startsWith("Schnelle Heilung")) {
            const v = _romanLevel(n);
            lep += v;
            lepContrib.push({ name: n, bonus: v });
        }
        if (n.startsWith("Astrale Regeneration")) {
            const v = _romanLevel(n);
            asp += v;
            aspContrib.push({ name: n, bonus: v });
        }
        if (n === "Astraler Block") {
            asp -= 1;
            aspContrib.push({ name: n, bonus: -1 });
        }
        if (n === "Heimwehkrank") {
            asp -= 1;
            aspContrib.push({ name: n, bonus: -1 });
        }
        // System-handled (GDSA onReg applies these; module must not double-count):
        if (n === "Schlechte Regeneration")        lepSysNotes.push(n);
        if (n.startsWith("Regeneration"))          aspSysNotes.push(n);
        if (n.startsWith("Meisterliche Regeneration")) aspSysNotes.push(n);
    }

    return { lep, asp, lepContrib, aspContrib, lepSysNotes, aspSysNotes };
}

// Registers a persistent renderDialog hook that pre-fills reglep/regasp
// in the first dialog that has those fields (= the regen dialog), with tooltips.
// Even when no numeric value is pre-filled, a tooltip is shown on fields where
// the system already handles a relevant trait (blue tint instead of green).
function _prefillRegenDialog(actor) {
    const { lep, asp, lepContrib, aspContrib, lepSysNotes, aspSysNotes } = _regenDeltas(actor);
    const hasLep = lep !== 0 || lepSysNotes.length > 0;
    const hasAsp = asp !== 0 || aspSysNotes.length > 0;
    if (!hasLep && !hasAsp) return;

    const lepTooltip = _buildTooltip(lepContrib, lepSysNotes);
    const aspTooltip = _buildTooltip(aspContrib, aspSysNotes);

    let hookId;
    hookId = Hooks.on("renderDialog", (_dlg, html) => {
        const lepField = html[0].querySelector("input[name='reglep']");
        const aspField = html[0].querySelector("input[name='regasp']");
        if (!lepField && !aspField) return;
        Hooks.off("renderDialog", hookId);

        if (lepField && hasLep) {
            if (lep !== 0) {
                lepField.value = String((parseInt(lepField.value) || 0) + lep);
                lepField.dispatchEvent(new Event("input",  { bubbles: true }));
                lepField.dispatchEvent(new Event("change", { bubbles: true }));
                _attachTooltip(lepField, lepTooltip);
            } else {
                _attachInfoTooltip(lepField, lepTooltip);
            }
        }
        if (aspField && hasAsp) {
            if (asp !== 0) {
                aspField.value = String((parseInt(aspField.value) || 0) + asp);
                aspField.dispatchEvent(new Event("input",  { bubbles: true }));
                aspField.dispatchEvent(new Event("change", { bubbles: true }));
                _attachTooltip(aspField, aspTooltip);
            } else {
                _attachInfoTooltip(aspField, aspTooltip);
            }
        }
    });
}

// ─── Shared name lists ────────────────────────────────────────────────────────

// Social talents where appearance / voice bonuses commonly apply
const _SOC = ["betören", "überreden", "überzeugen"];

// Spells affected by the caster's appearance or CH bonus
const _APP_SPELLS = ["bannbaladin", "seidenzunge", "levthans feuer", "satuarias herrlichkeit"];

// ─── Effect table ─────────────────────────────────────────────────────────────
//
// Key = VNA item name (or prefix — looked up by startsWith on the actor's items).
// One entry per VNA; arrays allow multiple independent effect groups.
//
// bonus > 0 → fills input[name='advantage']
// bonus < 0 → fills input[name='disadvantage'] by abs(bonus)

const _EFFECTS = {

    // ── VORTEILE ─────────────────────────────────────────────────────────────

    "Gut Aussehend": [
        { talents: { bonus: 1, names: _SOC } },
        { spells:  { bonus: 1, names: ["bannbaladin", "seidenzunge", "levthans feuer"] } },
        { stats:   { bonus: 1, stattype: "CH" } },
    ],
    "Gutaussehend": [   // GDSA stores without space
        { talents: { bonus: 1, names: _SOC } },
        { spells:  { bonus: 1, names: ["bannbaladin", "seidenzunge", "levthans feuer"] } },
        { stats:   { bonus: 1, stattype: "CH" } },
    ],

    "Herausragendes Aussehen": [
        { talents: { bonus: 3, names: _SOC } },
        { spells:  { bonus: 2, names: _APP_SPELLS } },
        { stats:   { bonus: 3, stattype: "CH" } },
    ],

    // +5 Singen, +2 gesellschaftliche Proben mit Stimme, +2 Bannbaladin/Seidenzunge
    "Wohlklang": [
        { talents: { bonus: 5, names: ["singen"] } },
        { talents: { bonus: 2, names: _SOC } },
        { spells:  { bonus: 2, names: ["bannbaladin", "seidenzunge"] } },
    ],

    // +5 Orientierung
    "Richtungssinn": [
        { talents: { bonus: 5, names: ["orientierung"] } },
    ],

    // +7 Orientierung (beinhaltet Richtungssinn)
    "Innerer Kompass": [
        { talents: { bonus: 7, names: ["orientierung"] } },
    ],

    // +5 Sinnenschärfe (alle Varianten des Vorteils per Prefix-Match abgedeckt)
    "Herausragender Sinn": [
        { talents: { bonus: 5, names: ["sinnenschärfe"] } },
    ],
    "Herausragender Sechster Sinn": [
        { talents: { bonus: 3, names: ["magiegespür"] } },
    ],

    // +3 Abrichten, Reiten; +3 Sanftmut
    "Tierfreund": [
        { talents: { bonus: 3, names: ["abrichten", "reiten"] } },
        { spells:  { bonus: 3, names: ["sanftmut"] } },
    ],

    // +7 KL-Proben zum Erinnern — pre-filled for all KL rolls; remove if not a recall check
    "Eidetisches Gedächtnis": [
        { stats: { bonus: 7, stattype: "KL" } },
    ],

    // +1 gesellschaftliche Talentproben (in eigener Kultur)
    "Guter Ruf": [
        { talents: { bonus: 1, names: _SOC } },
    ],

    // KO +7 bei Giftwiderstandsproben (Prefix deckt Einzelgift/Kategorie/alle-Gifte-Varianten)
    "Resistenz gegen Gift": [
        { stats: { bonus: 7, stattype: "KO" } },
    ],

    // KO +15 bei Giftwiderstandsproben (Prefix deckt alle Immunitätsvarianten)
    "Immunität gegen Gift": [
        { stats: { bonus: 15, stattype: "KO" } },
    ],

    // ── NACHTEILE (bonus negative = Erschwernis) ──────────────────────────────

    // –2 gesellschaftliche/CH-Proben
    "Unansehnlich": [
        { talents: { bonus: -2, names: _SOC } },
        { spells:  { bonus: -2, names: _APP_SPELLS } },
        { stats:   { bonus: -2, stattype: "CH" } },
    ],

    // –5 gesellschaftliche/CH-Proben
    "Widerwärtiges Aussehen": [
        { talents: { bonus: -5, names: _SOC } },
        { spells:  { bonus: -5, names: _APP_SPELLS } },
        { stats:   { bonus: -5, stattype: "CH" } },
    ],

    // –2 gesellschaftliche/CH-Proben mit aktiver Stimme, –2 Singen, –2 Zaubern
    "Unangenehme Stimme": [
        { talents: { bonus: -2, names: [..._SOC, "singen"] } },
        { spells:  { bonus: -2, names: ["bannbaladin", "seidenzunge"] } },
    ],

    // –3 gesellschaftliche Sprech-Talente, –3 alle verbalen Zauber (= alle Zauber)
    "Sprachfehler": [
        { talents: { bonus: -3, names: [..._SOC, "lehren"] } },
        { spells:  { bonus: -3, allSpells: true } },
    ],

    // –5 Abrichten, Reiten
    "Raubtiergeruch": [
        { talents: { bonus: -5, names: ["abrichten", "reiten"] } },
    ],

    // ── LISTE A: klar automatisierbar (keine Bedingung) ───────────────────────

    // –4 Fernkampf-Talente (Wurfwaffen, Bogen, Armbrust, Blasrohr …)
    // Einäugige Zauberer: +4 Erschwernis beim gezielten Zaubern — zu situativ für Auto-Fill
    "Einäugig": [
        { talents: { bonus: -4, names: ["wurfwaffen", "bogen", "armbrust", "blasrohr", "diskus", "zwille", "fernkampf"] } },
    ],

    // +2 Fernkampf-Talente; +2 Zauber auf Reichweite Horizont — Horizont-Zauber
    // sind am Dialog nicht erkennbar, daher nur FK-Talente
    "Entfernungssinn": [
        { talents: { bonus: 2, names: ["wurfwaffen", "bogen", "armbrust", "blasrohr", "diskus", "zwille", "fernkampf"] } },
    ],

    // KO –5 bei Krankheitswiderstandsproben; player entscheidet ob die KO-Probe
    // krankheitsbedingt ist und kann den Wert ggf. entfernen
    "Krankheitsanfällig": [
        { stats: { bonus: -5, stattype: "KO" } },
    ],

    // KO +7 bei Krankheitsproben (Prefix deckt "Resistenz gegen Krankheiten (Gruppe)" etc.)
    "Resistenz gegen Krankheiten": [
        { stats: { bonus: 7, stattype: "KO" } },
    ],

    // KO +15 bei Krankheitsproben (Prefix deckt alle Immunitätsvarianten)
    "Immunität gegen Krankheiten": [
        { stats: { bonus: 15, stattype: "KO" } },
    ],

    // ── LISTE B: situativ, aber player kann ggf. anpassen ────────────────────

    // +3 bei Balance-/Sturzsituationen (Körperbeherrschung, Tanzen, Athletik, Akrobatik)
    "Balance": [
        { talents: { bonus: 3, names: ["körperbeherrschung", "tanzen", "athletik", "akrobatik"] } },
    ],

    // +7 wie Balance, stärkere Variante
    "Herausragende Balance": [
        { talents: { bonus: 7, names: ["körperbeherrschung", "tanzen", "athletik", "akrobatik"] } },
    ],

    // +7 IN beim Glücksspiel; situativ — player kann entfernen wenn nicht Glücksspiel
    "Glück im Spiel": [
        { stats: { bonus: 7, stattype: "IN" } },
    ],

    // –2 gesellschaftliche/CH-Proben in Riechweite; situativ
    "Übler Geruch": [
        { talents: { bonus: -2, names: _SOC } },
        { stats:   { bonus: -2, stattype: "CH" } },
    ],

    // –1 gesellschaftliche Talentproben (in eigener Kultur)
    "Schlechter Ruf": [
        { talents: { bonus: -1, names: _SOC } },
    ],

    // Gebieter der Rotte: Kadaver-Variante des SKELETTARIUS nicht mehr erschwert (+3).
    // disad=3 aus zauber.db. Pre-fill gilt für alle Varianten — bei Nicht-Kadaver manuell entfernen.
    "Gebieter der Rotte": [
        { spells: { bonus: 3, names: ["skelettarius"] } },
    ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Returns array of { vnaName, effect } pairs for all matching VNA items on the actor.
// vnaName = the actual item.name (e.g. "Astrale Regeneration II"), not the table key.
function _matchingEffects(actor) {
    const results = [];
    for (const [key, effects] of Object.entries(_EFFECTS)) {
        const item = actor.items.find(i =>
            i.type === "Template" && (i.name === key || i.name.startsWith(key))
        );
        if (item) {
            for (const effect of effects) results.push({ vnaName: item.name, effect });
        }
    }
    return results;
}

// Builds a tooltip string from a contributors list [{name, bonus}] plus optional
// system-handled notes (trait names the system applies; module does not pre-fill).
function _buildTooltip(contributors, sysNotes = []) {
    if (!contributors.length && !sysNotes.length) return "";
    const lines = contributors.map(c => {
        const sign = c.bonus > 0 ? "+" : "";
        return `${c.name}: ${sign}${c.bonus}`;
    });
    if (contributors.length > 1) {
        const total = contributors.reduce((s, c) => s + c.bonus, 0);
        const sign  = total > 0 ? "+" : "";
        lines.push("─────────────────");
        lines.push(`Gesamt: ${sign}${total}`);
    }
    if (sysNotes.length) {
        if (lines.length) lines.push("─────────────────");
        for (const note of sysNotes) lines.push(`${note}: (System)`);
    }
    return lines.join("\n");
}

// Attaches the tooltip to an input field and applies a green tint — signals that
// the module pre-filled a numeric value (hover to see breakdown).
function _attachTooltip(input, tooltip) {
    if (!tooltip) return;
    input.title = tooltip;
    input.style.borderColor = "#6d8a6d";
    input.style.background  = "rgba(109,138,109,.12)";
}

// Attaches a tooltip to an input field WITHOUT pre-filling a value — used when
// the module has no numeric contribution but wants to inform the player that the
// system already handles certain traits for this field (blue tint).
function _attachInfoTooltip(input, tooltip) {
    if (!tooltip) return;
    input.title = tooltip;
    input.style.borderColor = "#5a7fa5";
    input.style.background  = "rgba(90,127,165,.08)";
}

// Registers a persistent renderDialog hook that adjusts advantage or disadvantage
// by delta and attaches a tooltip listing the contributing VNA entries.
function _prefillDelta(delta, contributors) {
    if (!delta) return;
    const field   = delta > 0 ? "advantage" : "disadvantage";
    const abs     = Math.abs(delta);
    const tooltip = _buildTooltip(contributors ?? []);
    let hookId;
    hookId = Hooks.on("renderDialog", (_dlg, html) => {
        const input = html[0].querySelector(`input[name='${field}']`);
        if (!input) return;
        Hooks.off("renderDialog", hookId);
        const cur = parseInt(input.value) || 0;
        input.value = String(cur + abs);
        _attachTooltip(input, tooltip);
        input.dispatchEvent(new Event("input",  { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
    });
}

// ─── ActiveEffect helpers ─────────────────────────────────────────────────────

// Check if the actor has a named ActiveEffect currently active (not disabled).
function _actorHasActiveEffect(actor, name) {
    return actor?.effects.some(e => !e.disabled && e.name === name) ?? false;
}

// Check if the first selected target has a named ActiveEffect active.
function _targetHasActiveEffect(name) {
    const target = [...(game.user?.targets ?? [])][0];
    const actor  = target?.actor ?? target?.document?.actor;
    return actor?.effects.some(e => !e.disabled && e.name === name) ?? false;
}

// ─── AT-dialog pre-fill (advan/disad fields, not advantage/disadvantage) ──────

function _prefillAtDialog(delta, contributors) {
    if (!delta) return;
    const field   = delta > 0 ? "advan" : "disad";
    const abs     = Math.abs(delta);
    const tooltip = _buildTooltip(contributors ?? []);
    let hookId;
    hookId = Hooks.on("renderDialog", (_dlg, html) => {
        const input = html[0].querySelector(`input[name='${field}']`);
        if (!input) return;
        Hooks.off("renderDialog", hookId);
        const cur = parseInt(input.value) || 0;
        input.value = String(cur + abs);
        _attachTooltip(input, tooltip);
        input.dispatchEvent(new Event("input",  { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
    });
}

// ─── Combined delta + contributor computation (VNA + active effects) ──────────

function _combine(vnaResult, effResult) {
    return {
        delta:        vnaResult.delta + effResult.delta,
        contributors: [...vnaResult.contributors, ...effResult.contributors],
    };
}

// Returns { delta, contributors } for a talent probe.
function _talentResult(actor, talentName) {
    let delta = 0;
    const contributors = [];
    for (const { vnaName, effect } of _matchingEffects(actor)) {
        if (!effect.talents) continue;
        const lc = talentName.toLowerCase();
        if (effect.talents.names.some(n => lc.includes(n))) {
            delta += effect.talents.bonus;
            contributors.push({ name: vnaName, bonus: effect.talents.bonus });
        }
    }
    return _combine({ delta, contributors }, getEffectMods(actor, "talent", talentName));
}

// Returns { delta, contributors } for a spell probe.
function _spellResult(actor, spellName) {
    let delta = 0;
    const contributors = [];
    for (const { vnaName, effect } of _matchingEffects(actor)) {
        if (!effect.spells) continue;
        if (effect.spells.allSpells) {
            delta += effect.spells.bonus;
            contributors.push({ name: vnaName, bonus: effect.spells.bonus });
            continue;
        }
        const lc = spellName.toLowerCase();
        if (effect.spells.names.some(n => lc.includes(n))) {
            delta += effect.spells.bonus;
            contributors.push({ name: vnaName, bonus: effect.spells.bonus });
        }
    }
    return _combine({ delta, contributors }, getEffectMods(actor, "spell", spellName));
}

// Returns { delta, contributors } for a liturgy/wonder probe.
function _liturgyResult(actor, liturgyName) {
    return getEffectMods(actor, "liturgy", liturgyName);
}

// Returns { delta, contributors } for a stat probe.
function _statResult(actor, stattype) {
    let delta = 0;
    const contributors = [];
    for (const { vnaName, effect } of _matchingEffects(actor)) {
        if (!effect.stats) continue;
        if (effect.stats.stattype === stattype) {
            delta += effect.stats.bonus;
            contributors.push({ name: vnaName, bonus: effect.stats.bonus });
        }
    }
    return _combine({ delta, contributors }, getEffectMods(actor, "stat", stattype));
}

// Returns { delta, contributors } for an AT roll (melee combat talent).
// Liegend −3 is read from the effect's description ("AT: -3") via getEffectMods.
function _atResult(actor, talentName) {
    return getEffectMods(actor, "at", talentName);
}

// Returns { delta, contributors } for a PA roll.
// Liegend −3 is read from the effect's description ("PA: -3") via getEffectMods.
function _paResult(actor, talentName) {
    return getEffectMods(actor, "pa", talentName);
}

// Returns { delta, contributors } for a FK roll (ranged combat talent).
function _fkResult(actor, talentName) {
    return getEffectMods(actor, "fk", talentName);
}

// Returns { delta, contributors } for an Ausweichen roll.
// Liegend −3 is read from "Ausweichen: -3" in the effect description.
function _ausweichenResult(actor) {
    return getEffectMods(actor, "ausweichen", null);
}

// Returns the Liegend bonus for an attacker targeting a lying opponent:
//   AT +3  (easier to hit a lying character)
//   PA +5  (easier to parry a lying character's hampered attacks)
function _liegendTargetBonus(type) {
    if (!_targetHasActiveEffect("Liegend")) return { delta: 0, contributors: [] };
    const bonus = type === "pa" ? 5 : 3;
    return { delta: bonus, contributors: [{ name: "Liegend (Ziel)", bonus }] };
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function registerAdvantageEffectsHook() {
    Hooks.on("renderActorSheet", (app, html) => {
        if (app.actor?.type !== "PlayerCharakter") return;

        // Gaben that cost Erschöpfung on every use (rolled via .skill-roll in the Talente tab)
        const _GABEN_ERSCHOePFUNG = new Map([
            ["Empathie",    1],
            ["Magiegespür", 1],
            ["Prophezeien", 2],
            ["Tierempathie",1],
        ]);

        // ── Talent rolls (.skill-roll) ────────────────────────────────────────
        // onSkillRoll reads talent name from element.closest("tr")
        //   .querySelector("[class=skillTemp]").dataset.lbl
        html[0].querySelectorAll(".skill-roll").forEach(btn => {
            btn.addEventListener("click", event => {
                const row     = event.currentTarget.closest("tr");
                const skillEl = row?.querySelector("[class=skillTemp]");
                const talName = skillEl?.dataset.lbl ?? "";
                if (!talName) return;
                // Gaben cost Erschöpfung on use, including shift-click (instant roll without dialog)
                const gabeCost = _GABEN_ERSCHOePFUNG.get(talName);
                if (gabeCost) applyStatusEffect(app.actor, "Erschöpfung", gabeCost);
                if (event.shiftKey) return;
                const { delta, contributors } = _talentResult(app.actor, talName);
                if (delta) _prefillDelta(delta, contributors);
            }, { capture: true });
        });

        // ── Spell rolls (.spell-roll) ─────────────────────────────────────────
        html[0].querySelectorAll(".spell-roll").forEach(btn => {
            btn.addEventListener("click", event => {
                if (event.shiftKey) return;
                const itemId    = event.currentTarget.closest(".item")?.dataset?.itemId;
                const item      = itemId ? app.actor.items.get(itemId) : null;
                const spellName = item?.name ?? "";
                if (!spellName) return;
                const { delta, contributors } = _spellResult(app.actor, spellName);
                if (delta) _prefillDelta(delta, contributors);
            }, { capture: true });
        });

        // ── Stat rolls (.stat-roll) ───────────────────────────────────────────
        html[0].querySelectorAll(".stat-roll").forEach(btn => {
            btn.addEventListener("click", event => {
                if (event.shiftKey) return;
                const stattype = event.currentTarget.closest(".item")?.dataset?.stattype;
                if (!stattype) return;
                const { delta, contributors } = _statResult(app.actor, stattype);
                if (delta) _prefillDelta(delta, contributors);
            }, { capture: true });
        });

        // ── AT / FK rolls (.attack-roll) ──────────────────────────────────────
        // GetAtkInfo dialog uses advan/disad fields (not advantage/disadvantage).
        // Also applies +3 when the targeted opponent is lying (Liegend).
        html[0].querySelectorAll(".attack-roll").forEach(btn => {
            btn.addEventListener("click", event => {
                if (event.shiftKey) return;
                const itemId = event.currentTarget.closest("tr")?.dataset?.itemId;
                if (!itemId) return;
                const { talentName, isRanged } = getWeaponCombatInfo(app.actor, itemId);
                const base    = isRanged ? _fkResult(app.actor, talentName) : _atResult(app.actor, talentName);
                const liegend = _liegendTargetBonus("at");
                const result  = _combine(base, liegend);
                if (result.delta) _prefillAtDialog(result.delta, result.contributors);
            }, { capture: true });
        });

        // ── PA rolls (.parry-roll) ────────────────────────────────────────────
        // +5 when parrying a lying opponent's (hampered) attack.
        html[0].querySelectorAll(".parry-roll").forEach(btn => {
            btn.addEventListener("click", event => {
                if (event.shiftKey) return;
                const itemId = event.currentTarget.closest("tr")?.dataset?.itemId;
                if (!itemId) return;
                const { talentName } = getWeaponCombatInfo(app.actor, itemId);
                const base    = _paResult(app.actor, talentName);
                const liegend = _liegendTargetBonus("pa");
                const result  = _combine(base, liegend);
                if (result.delta) _prefillDelta(result.delta, result.contributors);
            }, { capture: true });
        });

        // ── Dodge rolls (.dogde-roll) ─────────────────────────────────────────
        html[0].querySelectorAll(".dogde-roll").forEach(btn => {
            btn.addEventListener("click", event => {
                if (event.shiftKey) return;
                const result = _ausweichenResult(app.actor);
                if (result.delta) _prefillDelta(result.delta, result.contributors);
            }, { capture: true });
        });

        // ── Liturgy / wonder rolls (.wonder-roll) ─────────────────────────────
        html[0].querySelectorAll(".wonder-roll").forEach(btn => {
            btn.addEventListener("click", event => {
                if (event.shiftKey) return;
                const itemId    = event.currentTarget.closest(".item")?.dataset?.itemId;
                const item      = itemId ? app.actor.items.get(itemId) : null;
                const liturgyName = item?.name ?? "";
                if (!liturgyName) return;
                const result = _liturgyResult(app.actor, liturgyName);
                if (result.delta) _prefillDelta(result.delta, result.contributors);
            }, { capture: true });
        });

        // ── Flaw-Rolls (.flaw-roll) ───────────────────────────────────────────
        // Talentschub: 1W3 Erschöpfung when activated (has its own roll button).
        // Kampfrausch: fully custom activation flow (replaces the default 1W20 roll).
        // Named Gaben (Empathie etc.) are NOT here — they are rolled via .skill-roll
        // from the Talente tab; their Erschöpfung cost is handled in the block above.
        html[0].querySelectorAll(".flaw-roll").forEach(btn => {
            btn.addEventListener("click", async event => {
                const row      = event.currentTarget.closest(".item");
                const flawName = row?.dataset?.flawName ?? "";

                if (flawName.startsWith("Talentschub")) {
                    applyStatusEffectRoll(app.actor, "Erschöpfung", "1W3");
                    return;
                }
                if (flawName === "Kampfrausch") {
                    event.stopPropagation();
                    _activateKampfrausch(app.actor);
                }
            }, { capture: true });
        });

        // ── Regeneration button (.doReg) ──────────────────────────────────────
        html[0].querySelectorAll(".doReg").forEach(btn => {
            btn.addEventListener("click", () => {
                _prefillRegenDialog(app.actor);
            }, { capture: true });
        });
    });
}

// ─── Kampfrausch activation ───────────────────────────────────────────────────

async function _activateKampfrausch(actor) {
    // Step 1: confirm and apply self-injury (1W3 LeP + 1 Erschöpfung)
    const injuryRoll = await new Roll("1d3").evaluate();
    const injury     = injuryRoll.total;
    const newLeP     = Math.max(0, (parseInt(actor.system.LeP?.value) || 0) - injury);
    await actor.update({ "system.LeP.value": newLeP });
    await applyStatusEffect(actor, "Erschöpfung", 1);

    ChatMessage.create({
        content: `<div class="gdsa-sf-notes"><div class="gdsa-sf-note">⚔ ${actor.name}: Kampfrausch-Aktivierung — −${injury} LeP + 1 Erschöpfung (Selbstverletzung).</div></div>`,
        speaker: ChatMessage.getSpeaker({ actor }),
    });

    // Step 2: SE+10 probe using GDSA's native talent dialog
    const { lsFunc, dice } = await (async () => {
        const [lf, d] = await Promise.all([
            import("/systems/gdsa/module/listenerFunctions.js"),
            import("/systems/gdsa/module/dice.js"),
        ]);
        return { lsFunc: lf, dice: d };
    })();

    const talentTemplate = CONFIG.Templates?.talents?.all?.find(t => t.name === "Selbstbeherrschung");
    if (!talentTemplate) { ui.notifications.warn("Selbstbeherrschung-Template nicht gefunden."); return; }

    const tale    = talentTemplate.system?.tale ?? {};
    const taw     = parseInt(actor.system.skill?.["Selbstbeherrschung"]) || 0;
    const getAtt  = n => (parseInt(actor.system[n.toUpperCase()]?.value) || 0) + (parseInt(actor.system[n.toUpperCase()]?.temp) || 0);
    const att1    = (tale.att1 ?? "mu").toUpperCase();
    const att2    = (tale.att2 ?? "mu").toUpperCase();
    const att3    = (tale.att3 ?? "ko").toUpperCase();
    const optional = {
        template: "systems/gdsa/templates/chat/chatTemplate/skill-Roll.hbs",
        item: talentTemplate, att1, att2, att3, noChat: false, used: ["Kampfrausch-Aktivierung +10 Erschwernis"], mhk: false, asp: 0,
    };

    const result = await dice.skillCheck("Selbstbeherrschung", taw, getAtt(att1), getAtt(att2), getAtt(att3), actor, false, 10, optional);

    if (result?.succ) {
        // Step 3: Create Kampfrausch effect
        const existing = actor.effects.find(e => e.name === "Kampfrausch");
        if (!existing) {
            await actor.createEmbeddedDocuments("ActiveEffect", [{
                name:        "Kampfrausch",
                icon:        "icons/svg/regen.svg",
                description: "Kampfrausch aktiv: Keine Wunden-/LE/AuP-Malus. Nur Wuchtschlag-Manöver. AT/TP +1. PA −1. GM notiert Schäden verdeckt.",
            }]);
        }
        ChatMessage.create({
            content: `<div class="gdsa-sf-notes"><div class="gdsa-sf-note">✓ ${actor.name}: Kampfrausch aktiv — kein Schmerzempfinden, nur Wuchtschlag-Manöver.</div></div>`,
            speaker: ChatMessage.getSpeaker({ actor }),
        });
    } else {
        ChatMessage.create({
            content: `<div class="gdsa-sf-notes"><div class="gdsa-sf-note">✗ ${actor.name}: Kampfrausch-Aktivierung misslungen.</div></div>`,
            speaker: ChatMessage.getSpeaker({ actor }),
        });
    }
}
