// Intercepts GDSA spell/liturgy chat messages and applies target MR to the roll result.
//
// isMR gate:
//   The spell item has a boolean field item.system.isMR ("Gegen MR" checkbox).
//   We look up the spell by name from the chat message and read that field:
//     isMR = true  → apply MR to ZfP*
//     isMR = false → spell bypasses MR entirely
//     isMR = undefined (old item without field) → apply MR (backward-compatible)
//
// MR detection per actor type:
//   PlayerCharakter — MR.value (manually entered + advantage adjustments from
//                     prepareData); if 0, falls back to MRBase (attribute formula).
//   NonPlayer       — MR.a (primary MR as entered on the NPC sheet).
//
// Only applies MR to successful rolls (.rollSkillSuccess); a failed probe
// needs no MR check since the spell already missed.

// ─── Helpers ─────────────────────────────────────────────────────────────────

function _isSpellMessage(doc) {
    return !!(
        doc.querySelector(".spellName") ||
        (doc.querySelector(".spellHeader") && doc.querySelector(".holyTable"))
    );
}

function _extractTap(doc) {
    // MR is only relevant on a successful spell probe
    const el = doc.querySelector(".rollSkillSuccess");
    if (!el) return null;
    const match = el.textContent.match(/(-?\d+)\s*(?:TaP|ZfP|TaPS|ZfPS)/i);
    if (match) return parseInt(match[1]);
    const fallback = el.textContent.match(/-?\d+/);
    return fallback ? parseInt(fallback[0]) : null;
}

function _getTargetMR() {
    const target = [...(game.user?.targets ?? [])][0];
    if (!target) return { mr: 0, targetName: null };
    const actor = target.actor ?? target.document?.actor;
    if (!actor) return { mr: 0, targetName: target.name };

    const sys = actor.system;
    let mr;

    if (actor.type === "NonPlayer") {
        // NPCs: MR.a = primary MR as entered on the NPC sheet
        mr = parseInt(sys.MR?.a) || 0;
    } else {
        // PlayerCharakter:
        //   MR.value = manually entered base + advantage/disadvantage deltas
        //              added by _setCharacterValues (async, but synchronous before any await).
        //   MRBase   = (MU+KL+KO)/5 + modi + buy — computed reference field.
        // Prefer MR.value; fall back to MRBase when MR.value hasn't been filled in (= 0).
        const mrValue = parseInt(sys.MR?.value) || 0;
        const mrBase  = parseInt(sys.MRBase)    || 0;
        mr = mrValue || mrBase;
    }

    return { mr, targetName: actor.name ?? target.name };
}

// Resolve isMR from the spell item by reading the spell name that GDSA embeds
// in the browserImg's name attribute inside the spell chat message.
// Returns: true = check MR, false = bypass MR, undefined = unknown → check MR.
function _getSpellIsMR(doc, speakerActor) {
    if (!speakerActor) return undefined;

    // GDSA puts item.name into <img class="browserImg" name="{{item.name}}">
    const spellName = doc.querySelector(".spellImg .browserImg")?.getAttribute("name");
    if (!spellName) return undefined;

    const spellItem = speakerActor.items.find(
        i => i.type === "spell" && i.name === spellName
    );
    // Return the stored boolean; undefined if field not present on the item.
    return spellItem?.system?.isMR;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function registerMRTrackerHook() {
    Hooks.on("preCreateChatMessage", (message, data, _options, _userId) => {
        if (!game.settings.get("geanos-gdsa-qol", "mrTracker")) return true;

        const content = message.content ?? data.content ?? "";
        if (!content.includes("rollSkill")) return true;

        const doc = new DOMParser().parseFromString(content, "text/html");
        if (!_isSpellMessage(doc)) return true;

        // Look up the spell item to check isMR
        const speakerActor = game.actors?.get(message.speaker?.actor ?? "")
            ?? (() => {
                // Fallback for unlinked tokens
                const scene = game.scenes?.get(message.speaker?.scene ?? "");
                return scene?.tokens?.get(message.speaker?.token ?? "")?.actor;
            })();

        const isMR = _getSpellIsMR(doc, speakerActor);

        // isMR = false  → spell explicitly bypasses MR (checkbox unchecked)
        // isMR = true   → spell checks MR (checkbox checked)
        // isMR = undefined → field not found / old item → apply MR (backward-compatible)
        if (isMR === false) return true;

        const { mr, targetName } = _getTargetMR();
        if (mr <= 0) return true;

        const tap = _extractTap(doc);
        // tap === null means no .rollSkillSuccess element → spell already failed → MR irrelevant
        if (tap === null) return true;

        const tapAfterMR   = tap - mr;
        const stillSuccess = tapAfterMR >= 0;
        const mrNote = `MR ${targetName ? `(${targetName})` : ""}: ${tap} ZfP* − ${mr} MR = ${tapAfterMR} → ${stillSuccess ? "Wirkung trifft" : "Wirkung scheitert an MR"}`;

        if (!stillSuccess) {
            const successEl = doc.querySelector(".rollSkillSuccess");
            if (successEl) {
                const failEl = doc.createElement("div");
                failEl.className = "rollSkillFail";
                failEl.innerHTML = `Misslungen (MR) <span id="additionalInfo">−${mr} Magieresistenz</span>`;
                successEl.replaceWith(failEl);
            }
        }

        const noteBlock = `<div class="gdsa-sf-notes"><div class="gdsa-sf-note">${mrNote}</div></div>`;
        message.updateSource({ content: doc.body.innerHTML + noteBlock });

        return true;
    });
}
