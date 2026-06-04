// Applies combat effects (damage, INI loss, status conditions) to targeted tokens.
// All functions are permission-safe: failures report to chat rather than throwing.

import { getRSForDamage } from "./rs-helper.js";

export function getFirstTarget() {
    return [...game.user.targets][0] ?? null;
}

// ─── Internal helpers ────────────────────────────────────────────────────────

async function _applyAuDamage(token, amount) {
    const actor = token.actor;
    const current = parseInt(actor.system.AuP?.value) || 0;
    const newVal = Math.max(0, current - amount);
    try {
        await actor.update({ "system.AuP.value": newVal });
        return { applied: true, oldValue: current, newValue: newVal };
    } catch {
        return { applied: false, oldValue: current };
    }
}

async function _applyLePDamage(token, amount) {
    const actor = token.actor;
    const current = parseInt(actor.system.LeP?.value) || 0;
    const newVal = Math.max(0, current - amount);
    try {
        await actor.update({ "system.LeP.value": newVal });
        return { applied: true, oldValue: current, newValue: newVal };
    } catch {
        return { applied: false, oldValue: current };
    }
}

async function _applyINILossToken(token, formula) {
    const roll = await new Roll(formula).evaluate();
    const loss = roll.total;

    const combatant = game.combat?.combatants.find(c => c.tokenId === token.id);
    if (!combatant) {
        return { applied: false, loss, reason: "not_in_combat" };
    }

    const currentINI = combatant.initiative ?? 0;
    const newINI = currentINI - loss;
    try {
        await game.combat.updateEmbeddedDocuments("Combatant", [{ _id: combatant.id, initiative: newINI }]);
        return { applied: true, loss, oldValue: currentINI, newValue: newINI };
    } catch {
        return { applied: false, loss };
    }
}

async function _applyINILossActor(actor, formula) {
    const roll = await new Roll(formula).evaluate();
    const loss = roll.total;

    const combatant = game.combat?.combatants.find(c => c.actor?.id === actor.id);
    if (!combatant) {
        return { applied: false, loss, reason: "not_in_combat" };
    }

    const currentINI = combatant.initiative ?? 0;
    const newINI = currentINI - loss;
    try {
        await game.combat.updateEmbeddedDocuments("Combatant", [{ _id: combatant.id, initiative: newINI }]);
        return { applied: true, loss, oldValue: currentINI, newValue: newINI };
    } catch {
        return { applied: false, loss };
    }
}

// Creates or updates the "Liegend" ActiveEffect on the token's actor.
// The effect description uses one line per modifier so that:
//   • effect-modifiers.js pre-fills AT/PA/Ausweichen dialogs from the description
//   • registerEffectChangeHooks applies INI via system.INIBasis.modi ADD
//   • removing the effect automatically reverts all modifiers
//
// iniLoss: pre-rolled INI loss amount (0 = no INI entry in description)
async function _applyProne(token, iniLoss = 0) {
    const actor = token.actor ?? token.document?.actor;
    if (!actor) return { applied: false };

    // Comma-separated so the description survives FoundryVTT's HTML field sanitization.
    // (Newlines get collapsed to spaces by DOMPurify; commas are parsed by _parseDescription.)
    const lines = ["AT: -3", "PA: -3"];
    if (iniLoss > 0) lines.push(`INI: -${iniLoss}`);
    const description = lines.join(", ");

    try {
        const existing = actor.effects.find(e => e.name === "Liegend");
        if (existing) {
            await existing.update({ description });
        } else {
            await actor.createEmbeddedDocuments("ActiveEffect", [{
                name:        "Liegend",
                icon:        "icons/svg/falling.svg",
                description,
                statuses:    ["prone"],   // keeps FoundryVTT's prone token overlay in sync
            }]);
        }
        return { applied: true };
    } catch (err) {
        console.error("GDSA-QoL | Liegend-Effekt konnte nicht erstellt werden:", err);
        return { applied: false };
    }
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Apply a set of effects to the target token and return formatted result notes.
 * Effects: { auDamage?, lePDamage?, iniLossFormula?, selfINILossFormula?, prone?, ignoreRS? }
 * target must not be null — caller is responsible for the null check.
 * Set ignoreRS: true for attacks that bypass armor (e.g. Fulminictus Donnerkeil).
 */
export async function applyAndReport(actor, target, effects) {
    const notes = [];
    const name = target.name;

    if (effects.auDamage) {
        const r = await _applyAuDamage(target, effects.auDamage);
        notes.push(r.applied
            ? `${name}: −${effects.auDamage} AuP erhalten.`
            : `⚠ AuP-Schaden (${effects.auDamage}) konnte nicht auf ${name} angewendet werden.`
        );
    }

    if (effects.lePDamage) {
        const targetActor  = target.actor ?? target.document?.actor ?? target;
        const { rs } = getRSForDamage(targetActor, effects.ignoreRS ?? false);
        const rawDmg       = effects.lePDamage;
        const effectiveDmg = Math.max(0, rawDmg - rs);

        const r = await _applyLePDamage(target, effectiveDmg);
        notes.push(r.applied
            ? `${name}: −${effectiveDmg} LeP erhalten.`
            : `⚠ LeP-Schaden (${effectiveDmg}) konnte nicht auf ${name} angewendet werden.`
        );
    }

    // INI loss — when combined with prone, the loss goes into the Liegend effect
    // description so it is automatically reverted when the effect ends.
    // When prone is NOT involved, apply directly to the combat tracker as before.
    let proneINILoss = 0;
    if (effects.iniLossFormula) {
        if (effects.prone) {
            // Roll now; the result will be written into the Liegend description below
            const roll = await new Roll(effects.iniLossFormula).evaluate();
            proneINILoss = roll.total;
            notes.push(`${name}: −${proneINILoss} INI (im Liegend-Effekt gespeichert, wird bei Aufhebung wiederhergestellt).`);
        } else {
            // Standalone INI loss (e.g. Sprungtritt) — applies directly to tracker
            const r = await _applyINILossToken(target, effects.iniLossFormula);
            if (r.applied) {
                notes.push(`${name}: −${r.loss} INI (${r.oldValue} → ${r.newValue}).`);
            } else if (r.reason === "not_in_combat") {
                notes.push(`${name}: −${r.loss} INI (Token nicht im Kampf — INI-Tracker nicht aktualisiert).`);
            } else {
                notes.push(`⚠ INI-Verlust (${r.loss}) für ${name} konnte nicht angewendet werden.`);
            }
        }
    }

    if (effects.selfINILossFormula) {
        const actorName = actor.name ?? "Angreifer";
        const r = await _applyINILossActor(actor, effects.selfINILossFormula);
        if (r.applied) {
            notes.push(`${actorName}: −${r.loss} eigene INI (${r.oldValue} → ${r.newValue}).`);
        } else if (r.reason === "not_in_combat") {
            notes.push(`${actorName}: −${r.loss} eigene INI (nicht im Kampf — INI-Tracker nicht aktualisiert).`);
        } else {
            notes.push(`⚠ Eigener INI-Verlust (${r.loss}) konnte nicht angewendet werden.`);
        }
    }

    if (effects.prone) {
        // proneINILoss = 0 when no iniLossFormula was given alongside prone
        const r = await _applyProne(target, proneINILoss);
        notes.push(r.applied
            ? `${name}: Status "Liegend" angewendet${proneINILoss ? ` (incl. INI −${proneINILoss})` : ""}.`
            : `⚠ Status "Liegend" konnte nicht auf ${name} angewendet werden.`
        );
    }

    return notes;
}
