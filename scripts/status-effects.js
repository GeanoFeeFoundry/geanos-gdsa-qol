// Automatic status-effect management for DSA 4.1 conditions.
//
// Supported effects:
//   Erschöpfung   — fatigue counter (max = KO); overflow converts to Überlastung
//   Überlastung   — overexertion; each point = −1 effective KO (via system.KO.temp ADD)
//   Verzückung    — rapture counter (no mechanical automation beyond tracking)
//   Entrückung    — karmal rapture counter (same)
//
// Public API:
//   applyStatusEffect(actor, effectName, points)      — add fixed points
//   applyStatusEffectRoll(actor, effectName, formula) — roll, then add result

const _ICONS = {
    Erschöpfung: "icons/svg/daze.svg",
    Überlastung:  "icons/svg/unconscious.svg",
    Verzückung:   "icons/svg/paralysis.svg",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Strip HTML (same helper as in effect-modifiers.js — duplicated to avoid circular import)
function _strip(html) {
    return new DOMParser().parseFromString(html ?? "", "text/html").body.textContent ?? "";
}

// Read the numeric counter from an effect's description ("Erschöpfung: 3" → 3)
function _getCounter(effect) {
    const m = _strip(effect.description ?? "").match(/:\s*(\d+)/);
    return m ? parseInt(m[1]) : 0;
}

function _buildDesc(name, points) {
    return `${name}: ${points}`;
}

// Find an active effect by exact name on the actor
function _findEffect(actor, name) {
    return actor.effects.find(e => e.name === name && !e.disabled) ?? null;
}

// ─── Core apply functions ─────────────────────────────────────────────────────

async function _setGenericEffect(actor, name, points) {
    const existing = _findEffect(actor, name);
    const desc = _buildDesc(name, points);
    if (existing) {
        await existing.update({ description: desc });
    } else {
        await actor.createEmbeddedDocuments("ActiveEffect", [{
            name,
            icon: _ICONS[name] ?? "icons/svg/daze.svg",
            description: desc,
        }]);
    }
}

async function _setUeberlastung(actor, totalPoints) {
    const existing = _findEffect(actor, "Überlastung");
    const desc = _buildDesc("Überlastung", totalPoints);
    // Each Überlastung point lowers effective KO by 1 via the temp modifier.
    // mode 2 = CONST.ACTIVE_EFFECT_MODES.ADD
    const changes = [{
        key:      "system.KO.temp",
        mode:     2,
        value:    String(-totalPoints),
        priority: null,
    }];

    if (existing) {
        await existing.update({ description: desc, changes });
    } else {
        await actor.createEmbeddedDocuments("ActiveEffect", [{
            name:        "Überlastung",
            icon:        _ICONS["Überlastung"],
            description: desc,
            changes,
        }]);
    }
}

async function _applyErschoepfung(actor, addPoints) {
    // barrier = effective KO = base + temp
    // system.KO.temp is modified by Überlastung (ActiveEffect ADD -N), so the
    // barrier automatically decreases by 1 per Überlastung point.
    // KO.baseAnti is an internal GDSA field that is always 0 in normal play.
    const koValue = parseInt(actor.system.KO?.value) || 0;
    const koTemp  = parseInt(actor.system.KO?.temp)  || 0;
    const barrier = Math.max(1, koValue + koTemp);
    const existing = _findEffect(actor, "Erschöpfung");
    const current  = existing ? _getCounter(existing) : 0;
    let   remainder = current + addPoints;
    let   ueGain    = 0;

    // Each barrier crossing: +1 Überlastung, remainder wraps to (total - barrier - 1).
    // The crossing point itself is "consumed" (hence the -1), so:
    //   total = KO+1 → new Erschöpfung = 0 (deleted)
    //   total = KO+2 → new Erschöpfung = 1
    //   total = 2*(KO+1) → Überlastung+2, Erschöpfung = 0 (deleted)
    while (remainder > barrier) {
        ueGain++;
        remainder = remainder - barrier - 1;
    }

    // Update Erschöpfung effect
    if (remainder <= 0) {
        if (existing) await existing.delete();   // no Erschöpfung left → remove effect
    } else {
        await _setGenericEffect(actor, "Erschöpfung", remainder);
    }

    // Apply accumulated Überlastung gains
    if (ueGain > 0) {
        const existingUe = _findEffect(actor, "Überlastung");
        const currentUe  = existingUe ? _getCounter(existingUe) : 0;
        await _setUeberlastung(actor, currentUe + ueGain);

        ChatMessage.create({
            content: `<div class="gdsa-sf-notes"><div class="gdsa-sf-note">` +
                `⚠ ${actor.name}: KO-Schwelle (${barrier}) ${ueGain}× überschritten — ` +
                `+${ueGain} Überlastung` +
                (remainder > 0 ? `, neuer Erschöpfungs-Zähler: ${remainder}` : ", Erschöpfung zurückgesetzt") +
                `.</div></div>`,
            speaker: ChatMessage.getSpeaker({ actor }),
        });
    }
}

async function _applyUeberlastung(actor, addPoints) {
    const existing = _findEffect(actor, "Überlastung");
    const current  = existing ? _getCounter(existing) : 0;
    await _setUeberlastung(actor, current + addPoints);
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function applyStatusEffect(actor, effectName, points) {
    if (!actor || !points || points <= 0) return;

    switch (effectName) {
        case "Erschöpfung": await _applyErschoepfung(actor, points); break;
        case "Überlastung":  await _applyUeberlastung(actor, points); break;
        case "Verzückung": {
            // Accumulates: adds to existing counter rather than overwriting
            const existing = _findEffect(actor, "Verzückung");
            const current  = existing ? _getCounter(existing) : 0;
            await _setGenericEffect(actor, "Verzückung", current + points);
            break;
        }
        default: await _setGenericEffect(actor, effectName, points); break;
    }
}

// Roll a dice formula (e.g. "1W3") then apply the result as status effect points.
export async function applyStatusEffectRoll(actor, effectName, formula) {
    if (!actor || !formula) return;
    const roll = await new Roll(formula.replace(/[Ww]/g, "d")).evaluate();
    if (roll.total > 0) await applyStatusEffect(actor, effectName, roll.total);
}
