// Replaces GDSA's 1W20 stat check for NPC talents and spells with a proper
// 3W20 talent probe, applies the NPC modifier panel, and — for spell items —
// switches to spell-Cast-Roll.hbs so that:
//   • AsP cost and casting duration appear in the chat (identical layout to PC spells)
//   • The AsP tracker (asp-tracker.js) fires and deducts AsP automatically
//   • The MR tracker (mr-tracker.js) fires and applies MR when isMR = true
//
// Item routing:
//   spell (type = "spell")          → spell-Cast-Roll.hbs  (cost, duration, traits)
//   talent (Template, type = "npct") → skill-Roll.hbs       (no AsP, talent info only)
//   other (no att1/att2/att3)        → 1W20 stat check fallback
//
// NPC attributes: flat numbers  (actor.system.MU = 12)
// PC  attributes: value-objects (actor.system.MU.value = 12)

// ─── GDSA module cache ────────────────────────────────────────────────────────

let _gdsa = null;
async function _loadGDSA() {
    if (_gdsa) return _gdsa;
    const [lsFunc, dice] = await Promise.all([
        import("/systems/gdsa/module/listenerFunctions.js"),
        import("/systems/gdsa/module/dice.js"),
    ]);
    _gdsa = { lsFunc, dice };
    return _gdsa;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function _attVal(actor, key) {
    const v = actor.system[key.toUpperCase()];
    if (v == null) return 0;
    if (typeof v === "object") return (parseInt(v.value) || 0) + (parseInt(v.temp) || 0);
    return parseInt(v) || 0;
}

function _readPanelMod(html) {
    const adv = Math.max(0, parseInt(html.find(".gdsa-qol-npc-adv").val()) || 0);
    const dis = Math.max(0, parseInt(html.find(".gdsa-qol-npc-dis").val()) || 0);
    return adv - dis;
}

function _resetModPanel(html) {
    html.find(".gdsa-qol-npc-adv").val("0");
    html.find(".gdsa-qol-npc-dis").val("0");
}

// Resolve AsP cost from item.system.costs which may be:
//   "11"   — plain integer string
//   "1W6"  — German dice formula
//   11     — already a number (some items store it this way)
//   false  — boolean default from template.json → treat as 0
//   undefined — field missing → 0
async function _resolveSpellCost(item) {
    const costs = item.system?.costs;

    // Reject boolean false, null, undefined, empty string
    if (costs === false || costs == null || costs === "") return 0;

    const raw = String(costs).replace(/kap|asp/gi, "").trim();
    if (!raw || raw === "false") return 0;

    // Dice formula (W / d notation)
    if (/[wWdD]/.test(raw)) {
        try {
            const r = await new Roll(raw.replace(/[wW]/g, "d")).evaluate();
            return r.total;
        } catch { return 0; }
    }

    const v = parseInt(raw);
    return isNaN(v) ? 0 : v;
}

// ─── 3W20 roll logic ─────────────────────────────────────────────────────────

async function _tryNPC3W20(actor, item, modifier) {
    const { dice } = await _loadGDSA();

    let taw, att1, att2, att3, isSpell;

    const tale = item.system?.tale;
    if (tale?.att1) {
        // NPC talent Template (npct): attributes under system.tale
        att1    = tale.att1.toUpperCase();
        att2    = tale.att2.toUpperCase();
        att3    = tale.att3.toUpperCase();
        taw     = parseInt(tale.taw) || 0;
        isSpell = false;
    } else if (item.system?.att1) {
        // Spell item: attributes directly in system
        att1    = item.system.att1.toUpperCase();
        att2    = item.system.att2.toUpperCase();
        att3    = item.system.att3.toUpperCase();
        taw     = parseInt(item.system.zfw) || 0;
        isSpell = true;
    } else {
        return false; // no 3W20 data → fall through to 1W20
    }

    let optional;

    if (isSpell) {
        // ── Spell: use spell-Cast-Roll.hbs so AsP tracker & MR tracker fire ──
        const cost   = await _resolveSpellCost(item);
        const action = parseInt(item.system?.zduration) || 1;

        optional = {
            template: "systems/gdsa/templates/chat/chatTemplate/spell-Cast-Roll.hbs",
            item,
            att1,
            att2,
            att3,
            cost,          // shown as "N AsP" in spellTable → triggers AsP tracker
            action,        // shown as "N Aktionen"
            usedVar:  [],
            usedVars: [],  // modifier is shown by Dice.skillCheck's modPresent/isDis
            vari:     false,
            varis:    false,
            notEnoughAsP: false,
            noChat:   false,
            mhk:      false,
            asp:      0,
        };
    } else {
        // ── Talent: skill-Roll.hbs (no AsP cost) ─────────────────────────────
        optional = {
            template: "systems/gdsa/templates/chat/chatTemplate/skill-Roll.hbs",
            item,
            att1,
            att2,
            att3,
            noChat: false,
            used:   [],    // modifier shown by modPresent/isDis, not duplicated here
            mhk:    false,
            asp:    0,
        };
    }

    await dice.skillCheck(
        item.name, taw,
        _attVal(actor, att1),
        _attVal(actor, att2),
        _attVal(actor, att3),
        actor,
        false,    // isGoofy
        modifier,
        optional
    );
    return true;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function registerNPCSpellRollHook() {
    Hooks.on("renderActorSheet", async (app, html, sheetData) => {
        if (app.actor?.type !== "NonPlayer") return;

        html.find(".npc-roll").off("click").on("click", async function (event) {
            event.preventDefault();

            const modifier = _readPanelMod(html);

            const itemId = $(this).closest(".item").attr("data-item-id");
            const item   = itemId ? app.actor.items.get(itemId) : null;

            // ── 3W20 path (talent or spell) ───────────────────────────────────
            if (item) {
                const handled = await _tryNPC3W20(app.actor, item, modifier);
                if (handled) {
                    _resetModPanel(html);
                    return;
                }
            }

            // ── 1W20 fallback (plain stat roll) ───────────────────────────────
            _resetModPanel(html);

            if (modifier !== 0) {
                const { dice } = await _loadGDSA();
                const dataset  = $(this).closest(".item")[0].dataset;
                await dice.statCheck(
                    dataset.name,
                    parseInt(dataset.value) || 0,
                    0,
                    app.actor,
                    modifier,
                    {}
                );
            } else {
                const { lsFunc } = await _loadGDSA();
                lsFunc.onNPCRoll(sheetData, event);
            }
        });
    });
}
