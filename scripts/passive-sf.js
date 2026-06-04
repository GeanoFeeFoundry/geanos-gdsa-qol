// Passive SF corrections that affect dice-roll mechanics.
//
// Kampfgespür  — INI +2 already included by system in INIBasis.value; no action needed.
// Kampfreflexe — System unconditionally adds +4 to INI (system bug: ignores BE condition).
//                preUpdateCombatant subtracts 4 when gBEArmour > 4 to enforce the rule.
// Tollpatsch   — 1W20 AT/PA/Stat: die=19 triggers fumble confirmation (die=20 already does).
//                Patched via createChatMessage since ATKCheck/PACheck ignore isGoofy.
// Feste Matrix — 3W20 spell/ritual: standard fumble needs 2×20 + third die ≥ 18.
//                If system shows Patzer but third die < 18: remove Patzer, show TaP*.
// Wilde Magie  — 3W20 spell/ritual: fumble already at 2 dice ≥ 19 (19+19, 19+20).
//                If system misses this: add Patzer indicator.
//
// Feste Matrix and Wilde Magie are mutually exclusive per the rules ("Nicht mit …").

function _actorHasSF(actor, sfName) {
    return actor.items.some(i =>
        i.type === "Template" &&
        i.system?.type === "trai" &&
        i.name === sfName
    );
}

function _actorHasTollpatsch(actor) {
    if (!actor) return false;
    const localName = game.i18n?.localize("GDSA.flaws.goofy") ?? "Tollpatsch";
    return actor.items.some(i =>
        i.type === "Template" && (i.name === localName || i.name === "Tollpatsch")
    );
}

function _actorHasTemplate(actor, name) {
    return actor?.items.some(i => i.type === "Template" && i.name === name) ?? false;
}

// ─── Feste Matrix / Wilde Magie: patch 3-die spell/ritual chat messages ───────
//
// skillCheck in dice.js determines goof as: any 2 dice = 20 (standard).
// We intercept createChatMessage, detect spell messages by .spellName, and
// re-evaluate the fumble condition according to the active magic trait.
//
// Feste Matrix: fumble only when 2 dice = 20 AND third die ≥ 18.
//   → If system shows Patzer but third die < 18: replace with computed TaP* result.
// Wilde Magie:  fumble already when any 2 dice ≥ 19 (not caught by standard check).
//   → If system shows no Patzer but top-2 dice ≥ 19: replace with Patzer.
//
// TaP* re-computation reads dice + attribute names from the HTML, stat values from
// the actor, and the dialog modifier from the rollposMod/rollnegMod divs.

function _readThreeDice(doc) {
    const els = doc.querySelectorAll(".dices2 .dice");
    if (els.length !== 3) return null;
    return [
        parseInt(els[0].textContent),
        parseInt(els[1].textContent),
        parseInt(els[2].textContent),
    ];
}

// Returns ["MU","IN","CH"] parsed from the spellTable or skillTable attribute row.
function _readAttrNames(doc) {
    for (const cell of doc.querySelectorAll(".spellTable td, .skillTable td")) {
        const m = cell.textContent.trim().replace(/\s/g, "").match(/^([A-Z]{2})\/([A-Z]{2})\/([A-Z]{2})$/);
        if (m) return [m[1], m[2], m[3]];
    }
    return null;
}

// Returns the ZfW/TaW as shown in the .spellName or .flawName header (last number token).
function _readZfw(doc) {
    const el = doc.querySelector(".spellName, .flawName");
    if (!el) return null;
    const tokens = el.textContent.trim().split(/\s+/);
    const v = parseInt(tokens[tokens.length - 1]);
    return isNaN(v) ? null : v;
}

// Returns the dialog modifier shown in .rollposMod or .rollnegMod (+N or -N), or 0.
function _readDialogModifier(doc) {
    const pos = doc.querySelector(".rollposMod");
    const neg = doc.querySelector(".rollnegMod");
    if (pos) {
        const m = pos.textContent.match(/\d+/);
        return m ? parseInt(m[0]) : 0;
    }
    if (neg) {
        const m = neg.textContent.match(/\d+/);
        return m ? -parseInt(m[0]) : 0;
    }
    return 0;
}

// Computes TaP* from the original dice order, stat values, ZfW, and modifier.
function _recomputeTap(diceOrig, statVals, zfw, modif) {
    const disAdTemp = (modif < 0 && zfw + modif < 0) ? zfw + modif : 0;
    let overflow = 0;
    for (let i = 0; i < 3; i++) {
        const limit = statVals[i] - disAdTemp;
        if (diceOrig[i] > limit) overflow += diceOrig[i] - limit;
    }
    return zfw + modif - overflow;
}

// Replaces .dice-formula content with a corrected non-fumble result.
function _patchToResult(doc, tap, label) {
    const formula = doc.querySelector(".dice-formula");
    if (!formula) return;
    const suf = ` (${label})`;
    if (tap >= 0) {
        const ok  = game.i18n.localize("GDSA.chat.stat.sucessWith") || "Erfolgreich mit";
        const tps = game.i18n.localize("GDSA.chat.stat.TaPS")       || " TaP*";
        formula.innerHTML = `<div class="rollSkillSuccess">${ok} ${tap}${tps}${suf}</div>`;
    } else {
        const fail   = game.i18n.localize("GDSA.chat.stat.fail")   || "Misslungen";
        const maxErl = game.i18n.localize("GDSA.chat.stat.maxErl") || " TaP*";
        formula.innerHTML =
            `<div class="rollSkillFail">${fail}${suf}<br /><span id="additionalInfo">${tap}${maxErl}</span></div>`;
    }
}

// Replaces .dice-formula content with a fumble that the standard check missed.
function _patchToGoof(doc, label) {
    const formula = doc.querySelector(".dice-formula");
    if (!formula) return;
    const goof = game.i18n.localize("GDSA.chat.stat.goof") || "Patzer!";
    formula.innerHTML = `<div class="rollFlawFail">${goof} (${label})</div>`;
}

async function _applyMagicFumbleRules(message) {
    if (message.author?.id !== game.user.id) return;
    if (message.getFlag("geanos-gdsa-qol", "festWildPatched")) return;

    const content = message.content ?? "";
    if (!content.includes("flawBox")) return;

    let actor = game.actors?.get(message.speaker?.actor ?? "");
    if (!actor && message.speaker?.token) {
        const scene = game.scenes?.get(message.speaker?.scene ?? canvas?.scene?.id ?? "");
        actor = scene?.tokens?.get(message.speaker.token)?.actor;
    }
    if (!actor) return;

    const hasFeste = _actorHasTemplate(actor, "Feste Matrix");
    const hasWilde = _actorHasTemplate(actor, "Wilde Magie");
    if (!hasFeste && !hasWilde) return;

    const parser = new DOMParser();
    const doc    = parser.parseFromString(content, "text/html");

    // Only spell/ritual messages (3-die probes with .spellName, not talent probes)
    if (!doc.querySelector(".spellName")) return;

    const diceOrig = _readThreeDice(doc);
    if (!diceOrig) return;

    const sorted = [...diceOrig].sort((a, b) => b - a); // descending copy
    const [d_hi, d_mid, d_lo] = sorted;

    const systemShowsGoof = !!doc.querySelector(".dice-formula .rollFlawFail");

    // ── Feste Matrix: 2×20 but third die < 18 → not a fumble per rules ──────────
    if (hasFeste && systemShowsGoof && d_hi === 20 && d_mid === 20 && d_lo < 18) {
        const attrNames = _readAttrNames(doc);
        const zfw       = _readZfw(doc);
        if (!attrNames || zfw === null) return;

        const modif    = _readDialogModifier(doc);
        const statVals = attrNames.map(n => (parseInt(actor.system[n]?.value) || 0));
        const tap      = _recomputeTap(diceOrig, statVals, zfw, modif);

        _patchToResult(doc, tap, "Feste Matrix");
        await message.update({
            content: doc.body.innerHTML,
            flags: { "geanos-gdsa-qol": { festWildPatched: true } },
        });
        return;
    }

    // ── Wilde Magie: 2 dice ≥ 19 but not 2×20 (standard check missed it) ────────
    if (hasWilde && !systemShowsGoof && d_hi >= 19 && d_mid >= 19 && d_mid < 20) {
        _patchToGoof(doc, "Wilde Magie");
        await message.update({
            content: doc.body.innerHTML,
            flags: { "geanos-gdsa-qol": { festWildPatched: true } },
        });
        return;
    }
}

// ─── Lästige Mindergeister: auto-create effect on trigger conditions ──────────
//
// Triggers when an actor with "Lästige Mindergeister" casts a spell that:
//   (a) fails (rollSkillFail) AND cost > 10 AsP, or
//   (b) fumbles (Patzer) — accounting for Feste Matrix / Wilde Magie rules.
//
// Creates an ActiveEffect named "Lästige Mindergeister" with description
// "alle Proben: -1" if one isn't already active on the actor, and posts a
// chat note. The effect persists until the SL removes it manually.

// True when the spell message represents a real Patzer, accounting for actor traits.
function _isSpellPatzer(doc, actor) {
    if (!doc.querySelector(".dice-formula .rollFlawFail")) return false;
    const diceEls = doc.querySelectorAll(".dices2 .dice");
    if (diceEls.length !== 3) return false;   // notEnoughAsP renders without dice check
    const sorted = [...diceEls]
        .map(el => parseInt(el.textContent))
        .sort((a, b) => b - a);

    if (sorted[0] === 20 && sorted[1] === 20) {
        // Feste Matrix: not a real Patzer when third die < 18
        if (_actorHasTemplate(actor, "Feste Matrix") && sorted[2] < 18) return false;
        return true;
    }
    // Wilde Magie: second-highest die ≥ 19 also counts as Patzer
    if (_actorHasTemplate(actor, "Wilde Magie") && sorted[1] >= 19) return true;
    return false;
}

function _readAspCost(doc) {
    for (const cell of doc.querySelectorAll(".spellTable td")) {
        const m = cell.textContent.trim().match(/^(\d+)\s*AsP/i);
        if (m) return parseInt(m[1]);
    }
    return 0;
}

async function _applyLastigeMindergeister(message) {
    if (message.author?.id !== game.user.id) return;
    if (!message.content?.includes("spellName")) return;

    let actor = game.actors?.get(message.speaker?.actor ?? "");
    if (!actor && message.speaker?.token) {
        const scene = game.scenes?.get(message.speaker?.scene ?? canvas?.scene?.id ?? "");
        actor = scene?.tokens?.get(message.speaker.token)?.actor;
    }
    if (!actor) return;
    if (!_actorHasTemplate(actor, "Lästige Mindergeister")) return;

    const parser = new DOMParser();
    const doc    = parser.parseFromString(message.content, "text/html");
    if (!doc.querySelector(".spellName")) return;

    const isPatzer  = _isSpellPatzer(doc, actor);
    const isFail    = !!doc.querySelector(".dice-formula .rollSkillFail");
    const aspCost   = _readAspCost(doc);

    if (!isPatzer && !(isFail && aspCost > 10)) return;

    const EFFECT_NAME = "Lästige Mindergeister";
    const existing    = actor.effects.find(e => e.name === EFFECT_NAME && !e.disabled);
    const reason      = isPatzer
        ? "Patzer"
        : `misslungener Zauber (${aspCost} AsP)`;

    if (existing) {
        // Parse current penalty from "alle Proben: -N", default to 1 if not found
        const m          = (existing.description ?? "").match(/alle Proben:\s*-(\d+)/i);
        const newPenalty = (m ? parseInt(m[1]) : 1) + 1;
        await existing.update({ description: `alle Proben: -${newPenalty}` });
        ChatMessage.create({
            content: `<div class="gdsa-sf-notes"><div class="gdsa-sf-note">` +
                     `⚡ ${actor.name}: Ein weiterer Mindergeist erscheint (${reason}) – jetzt alle Proben –${newPenalty}.` +
                     `</div></div>`,
            speaker: ChatMessage.getSpeaker({ actor }),
        });
    } else {
        await actor.createEmbeddedDocuments("ActiveEffect", [{
            name:        EFFECT_NAME,
            icon:        "icons/svg/aura.svg",
            description: "alle Proben: -1",
        }]);
        ChatMessage.create({
            content: `<div class="gdsa-sf-notes"><div class="gdsa-sf-note">` +
                     `⚡ ${actor.name}: Lästige Mindergeister erscheinen (${reason}) – alle Proben –1.` +
                     `</div></div>`,
            speaker: ChatMessage.getSpeaker({ actor }),
        });
    }
}

// ─── Tollpatsch: patch GDSA's native AT/PA chat messages ─────────────────────
//
// GDSA's ATKCheck / PACheck / statCheck have no isGoofy parameter, so die=19
// is never treated as a fumble trigger even for Tollpatsch actors.
// This hook fires once per message (only for the message author) and:
//   1. Detects GDSA 1W20 AT or PA messages where the first die = 19
//   2. Rolls a new confirmation die
//   3. Patches the message HTML to show the correct fumble / no-fumble result
//   4. Persists the change via message.update() so all clients see it
//
// Re-processing is guarded by a FoundryVTT message flag.
async function _applyTollpatschToMessage(message) {
    // message.author is the v12 API (message.user is deprecated).
    const authorId = message.author?.id ?? message._source?.user;

    // Only the message author's client processes the update
    if (authorId !== game.user.id) return;

    // Already patched by a previous run?
    if (message.getFlag("geanos-gdsa-qol", "tollpatschPatched")) return;

    const content = message.content ?? "";
    if (!content.includes("flawBox")) return;

    // Resolve the rolling actor — try linked actor first, then token actor fallback
    let actor = game.actors?.get(message.speaker?.actor ?? "");
    if (!actor && message.speaker?.token) {
        const scene = game.scenes?.get(message.speaker?.scene ?? canvas?.scene?.id ?? "");
        actor = scene?.tokens?.get(message.speaker.token)?.actor;
    }

    if (!actor || !_actorHasTollpatsch(actor)) return;

    // Parse HTML
    const parser = new DOMParser();
    const doc    = parser.parseFromString(content, "text/html");

    // Detect roll type by dice container class:
    //   AT / PA messages  → ".dices2 .dice"  (attack-Roll.hbs / parry-Roll.hbs)
    //   Stat probe msgs   → ".dices  .dice"  (stat-Roll.hbs)
    //   Talent probes     → ".dices2 .dice"  but 3 dice — GDSA handles isGoofy already
    //
    // For die = 19, GDSA shows exactly 1 die (confirm only fires on 1 or 20).
    // We therefore require exactly 1 die in the container.
    let diceContainer = null;
    let isStatRoll    = false;

    const atPaDice  = doc.querySelectorAll(".dices2 .dice");
    const statDice  = doc.querySelectorAll(".dices  .dice");

    if (atPaDice.length === 1) {
        diceContainer = doc.querySelector(".dices2");
    } else if (statDice.length === 1) {
        diceContainer = doc.querySelector(".dices");
        isStatRoll    = true;
    } else {
        return; // talent probe (3 dice) or already-confirmed roll (2 dice)
    }

    const dieVal = parseInt(diceContainer.querySelector(".dice")?.textContent ?? "0");
    if (dieVal !== 19) return; // 20 already handled natively; others unaffected

    // Extract effective value from the title.
    //   AT/PA  format: "Angriff (14)"  → parenthesised number
    //   Stat   format: "Mut 12"        → last whitespace-delimited token
    const titleText = doc.querySelector(".flawName")?.textContent?.trim() ?? "";
    let effectiveValue;
    if (isStatRoll) {
        effectiveValue = parseInt(titleText.split(/\s+/).at(-1));
    } else {
        const m = titleText.match(/\((\d+)\)/);
        if (!m) return;
        effectiveValue = parseInt(m[1]);
    }
    if (!effectiveValue || isNaN(effectiveValue)) return;

    // Roll confirmation die, then write a single update (content + flag).
    const confirmDie = (await new Roll("1d20").evaluate()).total;
    const isFumble   = confirmDie > effectiveValue;

    // For stat rolls: remove the diefiller (30px spacer) before adding the
    // confirmation die — otherwise diefiller(30) + die1(60) + die2(60) = 150px
    // overflows the 120px container and the second die wraps to the next line.
    if (isStatRoll) {
        diceContainer.querySelector(".diefiller")?.remove();
    }

    // Explicitly fix container width to fit two 60px dice side by side.
    // .dices already has 120px but the diefiller above occupied some of it.
    // .dices2 uses width:fit-content which may not account for floated children.
    diceContainer.style.width = "120px";

    // Append confirmation die
    const confirmEl = doc.createElement("div");
    confirmEl.className = "dice";
    confirmEl.textContent = String(confirmDie);
    diceContainer.appendChild(confirmEl);

    // Update result text
    const resultSec = doc.querySelector(".dice-formula");
    if (resultSec) {
        const goofLbl = game.i18n.localize("GDSA.chat.stat.goof") || "Patzer!";
        if (isFumble) {
            resultSec.innerHTML = `<div class="rollFlawFail">${goofLbl} (Tollpatsch)</div>`;
        }
        // Non-confirmed: the two dice + existing failure banner carry all the info.
    }

    // Single server round-trip: content + processed flag
    // (fires updateChatMessage, not createChatMessage → no loop)
    await message.update({
        content: doc.body.innerHTML,
        flags:   { "geanos-gdsa-qol": { tollpatschPatched: true } },
    });
}

export function registerPassiveSFHook() {
    // Tollpatsch: patch GDSA's native AT/PA/stat messages when die = 19.
    // Feste Matrix / Wilde Magie: patch 3-die spell/ritual messages.
    // Note: in FoundryVTT v12 the createChatMessage hook does not reliably provide
    // userId as 4th argument — we read the author from message.author (v12 API).
    Hooks.on("createChatMessage", (message) => {
        _applyTollpatschToMessage(message);
        _applyMagicFumbleRules(message);
        _applyLastigeMindergeister(message);
    });

    Hooks.on("preUpdateCombatant", (combatant, updateData, options) => {
        // Only fires when initiative is being set
        if (updateData.initiative === undefined) return;
        // Idempotency guard — prevents double-apply if this hook fires twice
        if (options._gdsaQolINIApplied) return;

        const actor = combatant.actor;
        if (!actor || actor.type !== "PlayerCharakter") return;

        // Kampfgespür (+2) is already included in INIBasis.value by the system — no adjustment needed.

        // Kampfreflexe: the system always adds +4 to INIBasis regardless of BE (system bug).
        // Rules say +4 only applies at BE ≤ 4, so we subtract 4 when BE > 4 to correct.
        let adjustment = 0;
        if (_actorHasSF(actor, "Kampfreflexe")) {
            const be = parseInt(actor.system?.gBEArmour) || 0;
            if (be > 4) adjustment -= 4;
        }

        if (adjustment !== 0) {
            updateData.initiative = (updateData.initiative ?? 0) + adjustment;
            options._gdsaQolINIApplied = true;
        }
    });
}
