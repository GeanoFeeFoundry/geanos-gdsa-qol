// Automatically deducts AsP and KaP costs when a GDSA spell/liturgy roll is posted.
//
// GDSA does NOT have ".consume" buttons in spell templates — costs are rendered
// as plain text: "<td>N AsP</td>" inside .spellTable (spells/rituals/shamanistic)
// or .holyTable (wonders/liturgies/KaP). This hook reads that text, applies the
// success/failure cost rule, and updates the actor synchronously before Foundry
// saves the message.
//
// Cost rules (spellTable — Zauber/Rituale/Schamanismus):
//   - Success or unknown: full AsP cost
//   - Failure: ½ AsP (rounded up); Hexe tradition: ⅓ AsP (rounded up)
//
// Cost rules (holyTable — Liturgien/Wunder):
//   - Success: full KaP cost; Grad V+ additionally reduces KaP.max (KaPInfo.modi) by pKaP
//   - Failure: ⅕ of success cost (min 1 KaP); Grad V+ additionally deducts pKaP
//
// Cost rules (skillTable — Mirakel / MHK):
//   - Always full cost regardless of success (Mirakel: 5 KaP; MHK: N AsP)

// ─── Helpers ─────────────────────────────────────────────────────────────────

function _isSpellMessage(content) {
    return content.includes("spellTable") || content.includes("holyTable") || content.includes("skillTable");
}

// Extracts cost value and resource type from the spell/skill table cells.
// Detects the resource ("AsP"/"KaP") from the cell text directly, so it works
// for spellTable (Zauber), holyTable (Liturgien), and skillTable (Mirakel/MHK).
// For KaP liturgy cells, also parses the permanent component ("davon N permanent", Grad V+).
function _extractCost(doc) {
    const isLiturgy = !!doc.querySelector(".holyTable");
    for (const td of doc.querySelectorAll("td")) {
        const text = td.textContent.trim();
        const resource = text.includes("AsP") ? "AsP" : text.includes("KaP") ? "KaP" : null;
        if (!resource) continue;
        const v = parseInt(text);
        if (!Number.isFinite(v) || v <= 0) continue;
        let permanent = 0;
        if (isLiturgy && resource === "KaP") {
            const m = text.match(/davon\s+(\d+)\s+permanent/);
            if (m) permanent = parseInt(m[1]);
        }
        return { value: v, resource, permanent, isLiturgy };
    }
    return null;
}

// Detects roll success/failure from the rendered HTML.
// Returns true (success), false (failure), or null (unknown → treat as success).
function _detectSuccess(doc) {
    if (doc.querySelector(".rollFlawSuccess, .rollSkillSuccess")) return true;
    if (doc.querySelector(".rollFlawFail, .rollSkillFail"))       return false;

    const resultEl = doc.querySelector(".roll-result, .skill-result, .zauber-result, .result");
    if (resultEl) {
        const cls = resultEl.className.toLowerCase();
        if (cls.includes("success") || cls.includes("gelungen") || cls.includes("crit")) return true;
        if (cls.includes("fail")    || cls.includes("misslungen") || cls.includes("patzer")) return false;
    }

    if (doc.querySelector(".success, .gelungen, .critical-success")) return true;
    if (doc.querySelector(".failure, .fail, .misslungen, .patzer, .fumble, .critical-failure")) return false;

    const text = (resultEl ?? doc.body).textContent.toLowerCase();
    if (/\bgelungen\b|\berfolg\b/.test(text))   return true;
    if (/\bmisslungen\b|\bpatzer\b/.test(text)) return false;

    return null;
}

// Checks whether the actor has the Hexe tradition (1/3 AsP cost on failure).
function _isHexe(actor) {
    return actor.items.some(i => {
        const isTraitOrTradition =
            (i.type === "Template" && i.system?.type === "trai") ||
            i.type === "Tradition";
        if (!isTraitOrTradition) return false;
        const n = i.name.toLowerCase();
        return n.includes("hexe") || n.includes("repräsentation (hexe)");
    });
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function registerAspTrackerHook() {
    // Must NOT be async — Foundry does not await hook callbacks.
    // actor.update() is fired as fire-and-forget; message.updateSource() is synchronous.
    Hooks.on("preCreateChatMessage", (message, data, _options, _userId) => {
        const content = message.content ?? data.content ?? "";
        if (!_isSpellMessage(content)) return true;

        const doc   = new DOMParser().parseFromString(content, "text/html");
        const entry = _extractCost(doc);
        if (!entry) return true;

        const actorId = message.speaker?.actor ?? data.speaker?.actor;
        const actor   = actorId ? game.actors?.get(actorId) : null;
        if (!actor) return true;

        const success = _detectSuccess(doc);
        const isSpell  = !!doc.querySelector(".spellTable");
        const hexe     = entry.resource === "AsP" && isSpell && _isHexe(actor);

        // Failure discounts only apply to spell/liturgy tables, not to skillTable (Mirakel/MHK).
        // spellTable + AsP fail: ½ (or ⅓ for Hexe)
        // holyTable  + KaP fail: ⅕ (min 1); pKaP is an additional charge on top
        // skillTable (Mirakel/MHK): always full cost regardless of success/failure
        let cost = entry.value;
        if (success === false) {
            if (entry.isLiturgy && entry.resource === "KaP") {
                cost = Math.max(1, Math.ceil(entry.value / 5));
            } else if (isSpell && entry.resource === "AsP") {
                cost = hexe ? Math.ceil(entry.value / 3) : Math.ceil(entry.value / 2);
            }
        }

        // Permanent KaP (Grad V+ liturgies only): owed on both success and failure.
        // On failure it is additional to the 1/5 cost; on success it is part of the listed total.
        const permanentCost = entry.isLiturgy ? (entry.permanent ?? 0) : 0;

        // Total reduction to KaP.value:
        //   liturgy success → full cost (pKaP already counted in the listed total)
        //   liturgy failure → ⅕ cost + pKaP
        //   spell/Mirakel/MHK → cost as computed above (no extra permanent part)
        const totalValueCost = (entry.isLiturgy && success === false)
            ? cost + permanentCost
            : cost;

        const statPath = entry.resource === "AsP" ? "system.AsP.value" : "system.KaP.value";
        const current  = parseInt(
            entry.resource === "AsP" ? actor.system.AsP?.value : actor.system.KaP?.value
        ) || 0;
        const newVal   = Math.max(0, current - totalValueCost);

        const updates = { [statPath]: newVal };
        if (permanentCost > 0) {
            // Reduce the KaP maximum permanently (KaP.max is derived from KaPInfo.modi).
            const currentModi = parseInt(actor.system.KaPInfo?.modi) || 0;
            updates["system.KaPInfo.modi"] = Math.max(0, currentModi - permanentCost);
        }

        actor.update(updates).catch(err =>
            console.error("Geano's GDSA QoL | Fehler beim Abziehen von " + entry.resource + ":", err)
        );

        if (game.settings.get("geanos-gdsa-qol", "aspTrackerVisible")) {
            let qualifier = "";
            if (success === false) {
                if (entry.isLiturgy && entry.resource === "KaP") {
                    qualifier = permanentCost > 0
                        ? ` <em>(⅕ bei Misserfolg + ${permanentCost} pKaP permanent)</em>`
                        : ` <em>(⅕ bei Misserfolg)</em>`;
                } else if (isSpell && entry.resource === "AsP") {
                    qualifier = hexe ? " <em>(Hexe: ⅓ bei Misserfolg)</em>" : " <em>(½ bei Misserfolg)</em>";
                }
            } else if (permanentCost > 0) {
                qualifier = ` <em>(davon ${permanentCost} permanent)</em>`;
            } else if (!entry.isLiturgy && !isSpell) {
                qualifier = entry.resource === "KaP" ? " <em>(Mirakel)</em>" : " <em>(MHK)</em>";
            }
            const noteBlock =
                `<div class="gdsa-sf-notes gdsa-asp-cost">` +
                `<div class="gdsa-sf-note">${entry.resource}: −${totalValueCost} (${current} → ${newVal})${qualifier}</div>` +
                `</div>`;
            message.updateSource({ content: content + noteBlock });
        }
        return true;
    });
}
