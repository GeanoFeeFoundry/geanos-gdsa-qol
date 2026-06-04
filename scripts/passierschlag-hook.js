// Passierschlag support for both PlayerCharakter and NonPlayer sheets.
//
// PC attacks: GDSA opens an AT modifier dialog before rolling. We inject a Passierschlag
// checkbox into that dialog (renderDialog hook). When checked, −4 is applied to the
// modifier input. Target's Aufmerksamkeit (+4) and Kampfgespür (+2) raise the malus.
//
// NPC attacks: GDSA calls Dice.ATKCheck() directly — no dialog is shown. We inject a
// persistent toggle checkbox next to each weapon's AT button in the NPC sheet. When
// checked and AT is clicked, we temporarily reduce dataset.at by 4 before the GDSA
// handler reads it, then restore the original value. The toggle auto-unchecks after use.

import { getEffectMods } from "./effect-modifiers.js";

const _INJECTED_CLASS    = "gdsa-passierschlag-injected";
const _LH_INJECTED_CLASS = "gdsa-qol-lh-injected";

// Ordered list of input selectors to find the AT modifier field
const _MOD_SELECTORS = [
    "input[name='modifier']",
    "input[name='erschwernis']",
    "input[name='modifikator']",
    "input[name='atModifier']",
    "input[name='at']",
    "input[name='value']",
    "input[type='number']",
];

// Keywords that positively identify an AT dialog
const _AT_TITLE_WORDS  = ["attacke", "angriff", "at-mod"];
const _AT_TITLE_RE     = /\bat\b/;

// Keywords that exclude a dialog — PA and spell contexts never need Passierschlag
const _PA_TITLE_WORDS  = ["parade", "parieren", "paraden", "pa-mod"];
const _PA_TITLE_RE     = /\bpa\b/;
const _SPL_TITLE_WORDS = ["zauber", "ritual", "spruch", "liturgie", "karma"];

function _isAttackDialog(dialog, html) {
    const title = (dialog.options?.title ?? dialog.title ?? "").toLowerCase();

    const hasPA  = _PA_TITLE_WORDS.some(w => title.includes(w)) || _PA_TITLE_RE.test(title);
    const hasSpl = _SPL_TITLE_WORDS.some(w => title.includes(w));

    // Never inject into PA or spell dialogs regardless of other content
    if (hasPA || hasSpl) return false;

    const hasAT = _AT_TITLE_WORDS.some(w => title.includes(w)) || _AT_TITLE_RE.test(title);
    if (hasAT) return true;

    // Content fallback for dialogs with generic titles ("Modifikation" etc.).
    // Require explicit AT evidence AND no PA/spell content.
    const text = html[0]?.textContent?.toLowerCase() ?? "";
    const hasPAContent  = text.includes("parade") || text.includes("parieren");
    const hasSplContent = text.includes("zaubern") || text.includes("ritual");
    if (hasPAContent || hasSplContent) return false;

    const hasATContent = text.includes("attacke") || text.includes("angriff");
    const hasInput     = !!html[0]?.querySelector(_MOD_SELECTORS.join(", "));
    return hasATContent && hasInput;
}

function _findModInput(html) {
    for (const sel of _MOD_SELECTORS) {
        const el = html[0].querySelector(sel);
        if (el) return el;
    }
    return null;
}

// Returns the element to insert the row after.
// Prefers the row/label containing "Sturmangriff"; falls back to the modifier input's parent.
function _findAnchor(html, modInput) {
    for (const el of html[0].querySelectorAll("label, .form-group, li, div")) {
        if (el.textContent.trim().toLowerCase().includes("sturmangriff")) {
            return el.closest(".form-group, li") ?? el;
        }
    }
    return modInput.closest(".form-group") ?? modInput.parentElement;
}

// Returns {malus, label} based on whether the targeted token's actor
// has Aufmerksamkeit (+4) and/or Kampfgespür (+2).
function _passierschlagMalus() {
    const targets = [...(game.user?.targets ?? [])];
    if (targets.length !== 1) return { malus: 4, label: "Passierschlag" };

    const targetActor = targets[0].actor;
    if (!targetActor) return { malus: 4, label: "Passierschlag" };

    const hasSF = name => targetActor.items.some(i =>
        i.type === "Template" && i.system?.type === "trai" && i.name === name
    );

    let extra = 0;
    const reasons = [];
    if (hasSF("Aufmerksamkeit")) { extra += 4; reasons.push("Aufmerksamkeit"); }
    if (hasSF("Kampfgespür"))    { extra += 2; reasons.push("Kampfgespür");    }

    const malus = 4 + extra;
    const label = reasons.length
        ? `Passierschlag (−${malus}, ${reasons.join(" + ")})`
        : "Passierschlag";
    return { malus, label };
}

// Returns true if the given dialog is a PA modifier dialog.
// Mirrors the inverse of _isAttackDialog using the already-defined PA keyword lists.
function _isDefenseDialog(dialog, html) {
    const title = (dialog.options?.title ?? dialog.title ?? "").toLowerCase();

    // Positive: PA keywords in title
    if (_PA_TITLE_WORDS.some(w => title.includes(w)) || _PA_TITLE_RE.test(title)) return true;

    // Exclude AT and spell dialogs
    const hasAT  = _AT_TITLE_WORDS.some(w => title.includes(w)) || _AT_TITLE_RE.test(title);
    const hasSpl = _SPL_TITLE_WORDS.some(w => title.includes(w));
    if (hasAT || hasSpl) return false;

    // Content fallback: PA keywords in text + a numeric input present
    const text     = html[0]?.textContent?.toLowerCase() ?? "";
    const hasPA    = text.includes("parade") || text.includes("parieren");
    const hasInput = !!html[0]?.querySelector(_MOD_SELECTORS.join(", "));
    return hasPA && hasInput;
}

// Returns true when the current attacker has the Linkshänder advantage AND
// the combat round is still within the 5-round surprise window.
// Attacker = active combatant (whose turn it is), with a fallback to the
// defender's current targets (the defender typically has the attacker targeted).
function _attackerHasLinkhaender() {
    if (!game.combat || game.combat.round > 5) return false;

    const curId    = game.combat.current?.combatantId;
    let   attacker = curId ? game.combat.combatants.get(curId)?.actor : null;

    if (!attacker) {
        const targets = [...(game.user?.targets ?? [])];
        if (targets.length === 1) attacker = targets[0].actor;
    }

    if (!attacker) return false;

    return attacker.items.some(i =>
        i.type === "Template" && i.name === "Linkshänder"
    );
}

// ─── NPC sheet Passierschlag / modifier panel ─────────────────────────────────
//
// Adds a compact modifier panel (Erleichterung | Erschwernis | Passierschlag)
// to the NPC combat section. When AT is clicked:
//   1. The total modifier is applied by temporarily adjusting dataset.at so
//      the GDSA system rolls against the correct effective value.
//   2. A module-level flag (_npcMod) records the original AT and modifier so
//      the preCreateChatMessage hook can patch the rendered chat content to
//      show the true base AT with a proper modifier annotation.

// Cache for GDSA system modules (loaded once on first use)
let _gdsaModules = null;
async function _loadGDSAModules() {
    if (_gdsaModules) return _gdsaModules;
    const [lsFunc, dice] = await Promise.all([
        import("/systems/gdsa/module/listenerFunctions.js"),
        import("/systems/gdsa/module/dice.js"),
    ]);
    _gdsaModules = { lsFunc, dice };
    return _gdsaModules;
}

// Set by the AT click wrapper, read & cleared by preCreateChatMessage.
// PA rolls don't need this — Dice.PACheck natively supports modifiers.
let _npcMod = null; // { origValue, modifiedValue, modifier, label }

// ─── Sync helpers for all open NPC sheets ────────────────────────────────────

// Update Passierschlag label in all open NPC sheets (called when targets change).
function _syncPsLabels() {
    const { label } = _passierschlagMalus();
    for (const app of Object.values(ui.windows ?? {})) {
        if (app.actor?.type !== "NonPlayer") continue;
        app.element?.find(".gdsa-qol-ps-label").text(label);
    }
}

// Update Linkshänder PA-Erschwernis status in all open NPC sheets.
// When active: pre-sets Erschwernis field to ≥1 and shows indicator label.
// When no longer active: resets only if it was auto-set by this function.
function _syncLHStatus() {
    const isLH = _attackerHasLinkhaender();
    const round = game.combat?.round ?? "";

    for (const app of Object.values(ui.windows ?? {})) {
        if (app.actor?.type !== "NonPlayer") continue;
        const panel = app.element?.find(".gdsa-qol-npc-panel");
        if (!panel?.length) continue;

        const disField = panel.find(".gdsa-qol-npc-dis");
        const lhLabel  = panel.find(".gdsa-qol-lh-pa-label");

        if (isLH) {
            // Only auto-set if currently 0 (don't override GM's higher value)
            if ((parseInt(disField.val()) || 0) < 1) {
                disField.val("1");
                disField.data("gdsa-lh-set", true);
            }
            lhLabel.text(`⚔ Linkshänder −1 PA (Runde ${round}/5)`).show();
        } else {
            // Reset only if we were the ones who set it
            if (disField.data("gdsa-lh-set")) {
                disField.val("0").removeData("gdsa-lh-set");
            }
            lhLabel.text("").hide();
        }
    }
}

// ─── Effect-mod pre-fill for NPC panel ───────────────────────────────────────

// Aggregate unique effect contributors across all roll types so the panel
// shows one combined delta. Contributors are deduplicated by effect name so
// that an effect like "Liegend" (AT: -3, PA: -3) only counts once.
function _getActorEffectModsForPanel(actor) {
    const seen = new Map(); // effectName → bonus
    for (const type of ["at", "pa", "talent", "spell", "stat"]) {
        for (const c of getEffectMods(actor, type, "").contributors) {
            if (!seen.has(c.name)) seen.set(c.name, c.bonus);
        }
    }
    let delta = 0;
    const contributors = [];
    for (const [name, bonus] of seen) {
        delta += bonus;
        contributors.push({ name, bonus });
    }
    return { delta, contributors };
}

function _buildEffectTooltip(contributors) {
    if (!contributors.length) return "";
    const lines = contributors.map(c => `${c.name}: ${c.bonus > 0 ? "+" : ""}${c.bonus}`);
    if (contributors.length > 1) {
        const total = contributors.reduce((s, c) => s + c.bonus, 0);
        lines.push("─────────────────");
        lines.push(`Gesamt: ${total > 0 ? "+" : ""}${total}`);
    }
    return lines.join("\n");
}

// Reads effect mods for the actor and pre-fills the adv/dis panel fields,
// attaching a tooltip that lists the contributing effects.
function _prefillNPCEffectMods(html, actor) {
    const { delta, contributors } = _getActorEffectModsForPanel(actor);
    if (delta === 0) return;
    const tooltip = _buildEffectTooltip(contributors);
    const green = { borderColor: "#6d8a6d", background: "rgba(109,138,109,.12)" };
    const red   = { borderColor: "#8a6d6d", background: "rgba(138,109,109,.12)" };
    if (delta > 0) {
        html.find(".gdsa-qol-npc-adv").val(String(delta)).css(green).attr("title", tooltip);
    } else {
        html.find(".gdsa-qol-npc-dis").val(String(Math.abs(delta))).css(red).attr("title", tooltip);
    }
}

// After every roll reset, re-apply effect mods and LH status.
function _resetPanel(html, actor) {
    html.find(".gdsa-qol-npc-adv").val("0").css({ borderColor: "", background: "" }).removeAttr("title");
    html.find(".gdsa-qol-npc-dis").val("0").css({ borderColor: "", background: "" }).removeAttr("title").removeData("gdsa-lh-set");
    html.find(".gdsa-qol-npc-ps").prop("checked", false);
    _syncLHStatus();
    if (actor) _prefillNPCEffectMods(html, actor);
}

export function registerNPCPassierschlagHook() {

    // Keep Passierschlag label in sync whenever the user's targets change
    Hooks.on("targetToken", (user) => {
        if (user.id === game.user.id) _syncPsLabels();
    });

    // Keep Linkshänder PA status in sync when the active combatant changes
    // (turn change, round change, combat start/end)
    Hooks.on("updateCombat", () => _syncLHStatus());
    Hooks.on("combatStart",  () => _syncLHStatus());

    // ── 1. Inject modifier panel + intercept AT and PA clicks ─────────────────
    Hooks.on("renderActorSheet", async (app, html, sheetData) => {
        if (app.actor?.type !== "NonPlayer") return;

        const { label: psLabel } = _passierschlagMalus();

        if (!html.find(".gdsa-qol-npc-panel").length) {
            const panel = $(`
                <div class="gdsa-qol-npc-panel" style="
                    padding:4px 6px;margin-bottom:5px;
                    background:rgba(0,0,0,.07);border-radius:3px;font-size:11px;">
                  <div style="font-weight:bold;opacity:.65;margin-bottom:3px;">Modifikatoren</div>
                  <div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;">
                    <span>Erl.</span>
                    <input type="number" class="gdsa-qol-npc-adv" value="0" min="0"
                      style="width:34px;text-align:center;padding:1px 3px;">
                    <span>Ersch.</span>
                    <input type="number" class="gdsa-qol-npc-dis" value="0" min="0"
                      style="width:34px;text-align:center;padding:1px 3px;">
                    <span style="opacity:.35;margin:0 2px;">│</span>
                    <input type="checkbox" class="gdsa-qol-npc-ps"
                      style="width:auto;margin:0;cursor:pointer;"
                      title="Passierschlag — nur AT">
                    <label class="gdsa-qol-ps-label"
                      style="margin:0;cursor:pointer;font-style:italic;"
                      title="Passierschlag — nur AT">${psLabel}</label>
                  </div>
                  <div class="gdsa-qol-lh-pa-label"
                    style="display:none;margin-top:3px;font-size:10px;color:#8B0000;font-style:italic;"></div>
                </div>`);
            html.find(".mainColum2 .hrMenu2").after(panel);
        } else {
            // Re-render: refresh labels only
            html.find(".gdsa-qol-ps-label").text(psLabel);
        }

        // Apply current Linkshänder status immediately on render
        _syncLHStatus();
        // Pre-fill panel with effect mods from the actor's active effects
        _prefillNPCEffectMods(html, app.actor);

        const { lsFunc, dice } = await _loadGDSAModules();

        // ── AT handler ──────────────────────────────────────────────────────
        html.find(".npc-at").off("click").on("click", async function (event) {
            const adv = Math.max(0, parseInt(html.find(".gdsa-qol-npc-adv").val()) || 0);
            const dis = Math.max(0, parseInt(html.find(".gdsa-qol-npc-dis").val()) || 0);
            const ps  = html.find(".gdsa-qol-npc-ps").prop("checked");
            // Re-read malus at click time — target may have changed since panel rendered
            const { malus: psMalus, label: psLbl } = _passierschlagMalus();
            const totalMod = adv - dis - (ps ? psMalus : 0);

            if (totalMod === 0) {
                await lsFunc.onNPCAttackRoll(sheetData, event);
                _resetPanel(html, app.actor);
                return;
            }

            const parts = [];
            if (ps)  parts.push(psLbl);
            if (adv) parts.push(`Erl. +${adv}`);
            if (dis) parts.push(`Ersch. −${dis}`);

            const row    = $(this).closest(".item");
            const origAt = parseInt(row.attr("data-at"));
            const modAt  = origAt + totalMod;

            _npcMod = { origValue: origAt, modifiedValue: modAt, modifier: totalMod, label: parts.join(", ") };
            row.attr("data-at", String(modAt));

            try {
                await lsFunc.onNPCAttackRoll(sheetData, event);
            } finally {
                row.attr("data-at", String(origAt));
                _resetPanel(html, app.actor);
                _npcMod = null;
            }
        });

        // ── PA handler ──────────────────────────────────────────────────────
        // Dice.PACheck already handles modifiers natively:
        //   PAValue = base PA (correct title), modPresent/isAdv/isDis from modi.
        // So we bypass onNPCParryRoll (fire-and-forget, no await) and call
        // PACheck directly with the modifier — no chat patching needed.
        html.find(".npc-pa").off("click").on("click", async function (event) {
            event.preventDefault();
            const adv = Math.max(0, parseInt(html.find(".gdsa-qol-npc-adv").val()) || 0);
            const dis = Math.max(0, parseInt(html.find(".gdsa-qol-npc-dis").val()) || 0);
            // Passierschlag is an AT-only SF — intentionally excluded from PA
            const totalMod = adv - dis;
            _resetPanel(html, app.actor);

            const row        = $(this).closest(".item");
            const pa         = parseInt(row.attr("data-pa"));
            const weaponName = row.attr("data-name");
            const actor      = sheetData.actor;

            const context = {
                skill: { system: { tale: { DE: "NPC-Angriff", BEtype: "0" } } },
                item:  { img: "./icons/skills/melee/shield-block-gray-yellow.webp",
                         system: { weapon: { type: weaponName, size: "null" } } },
            };

            await dice.PACheck(pa, totalMod, actor, context);
        });
    });

    // ── 2. Patch the AT chat message ─────────────────────────────────────────
    // Fires synchronously inside the awaited lsFunc.onNPCAttackRoll call,
    // so _npcMod is guaranteed to still be set at this point.
    Hooks.on("preCreateChatMessage", (document, _data, _options, userId) => {
        if (!_npcMod)                return;
        if (userId !== game.user.id) return;

        const content = document._source?.content ?? "";
        if (!content.includes(`(${_npcMod.modifiedValue})`)) return;
        if (!content.includes("flawBox"))                    return;

        const parser = new DOMParser();
        const doc    = parser.parseFromString(content, "text/html");

        // ① Restore true base AT in the title
        const flawName = doc.querySelector(".flawName");
        if (flawName) {
            flawName.textContent = flawName.textContent.replace(
                `(${_npcMod.modifiedValue})`,
                `(${_npcMod.origValue})`
            );
        }

        // ② Highlight modifier area
        doc.querySelector(".flawBox")?.classList.add("statModBoxAdd");

        // ③ Inject modifier annotation in #collapsable
        const collapsable = doc.querySelector("#collapsable");
        if (collapsable) {
            const isBenefit = _npcMod.modifier > 0;
            const cls       = isBenefit ? "rollposMod" : "rollnegMod";
            const typeLabel = isBenefit
                ? game.i18n.localize("GDSA.chat.skill.advantageOf")
                : game.i18n.localize("GDSA.chat.skill.disadvantageOf");
            const amount = Math.abs(_npcMod.modifier);
            const suffix = _npcMod.label ? ` (${_npcMod.label})` : "";

            const modDiv = doc.createElement("div");
            modDiv.className = cls;
            modDiv.textContent = `${typeLabel} ${amount}${suffix}`;
            const filler = doc.createElement("div");
            filler.className = "dicefiller";
            collapsable.append(modDiv, filler);
        }

        document.updateSource({ content: doc.body.innerHTML });
        // _npcMod is cleared in the AT handler's finally block
    });
}

export function registerPassierschlagHook() {
    Hooks.on("renderDialog", (dialog, html, _data) => {
        // Re-render guard — do not inject twice
        if (html[0].querySelector(`.${_INJECTED_CLASS}`)) return;
        if (!_isAttackDialog(dialog, html)) return;

        const modInput = _findModInput(html);
        if (!modInput) return;

        const { malus, label } = _passierschlagMalus();

        // Build checkbox row
        const row = document.createElement("div");
        row.className = `form-group ${_INJECTED_CLASS}`;
        row.style.cssText = "display:flex;align-items:center;gap:6px;margin-top:4px;";
        row.innerHTML =
            `<input type="checkbox" id="gdsa-passierschlag-cb" style="width:auto;margin:0;">` +
            `<label for="gdsa-passierschlag-cb" style="margin:0;cursor:pointer;font-weight:normal;">` +
            `${label}</label>`;

        const anchor = _findAnchor(html, modInput);
        anchor.insertAdjacentElement("afterend", row);

        const cb = row.querySelector("#gdsa-passierschlag-cb");
        cb.addEventListener("change", () => {
            const cur = parseInt(modInput.value) || 0;
            modInput.value = cb.checked ? cur - malus : cur + malus;
            modInput.dispatchEvent(new Event("input",  { bubbles: true }));
            modInput.dispatchEvent(new Event("change", { bubbles: true }));
        });
    });

    // ── Linkshänder: −1 PA in Runden 1–5 (PC-Charakterbogen) ────────────────
    // ownedCharParry (.bntChatParry in chat) is not implemented in GDSA.
    // PCs parry via .parry-roll buttons on their sheet, which open
    // Dialog.GetSkillCheckOptions with a generic title — impossible to detect
    // from renderDialog alone.
    // Fix: intercept .parry-roll clicks in capture phase (before GDSA's jQuery
    // handler), register Hooks.once("renderDialog") so the very next dialog
    // that opens (the PA dialog) gets the −1 injected.
    Hooks.on("renderActorSheet", (app, html) => {
        if (app.actor?.type !== "PlayerCharakter") return;

        html[0].querySelectorAll(".parry-roll").forEach(btn => {
            btn.addEventListener("click", () => {
                if (!_attackerHasLinkhaender()) return;

                const round = game.combat?.round ?? "";
                Hooks.once("renderDialog", (_dlg, dHtml) => {
                    // Safety: only inject if not already done and a mod input exists
                    if (dHtml[0].querySelector(`.${_LH_INJECTED_CLASS}`)) return;
                    const modInput = _findModInput(dHtml);
                    if (!modInput) return;

                    // Pre-apply −1
                    const cur = parseInt(modInput.value) || 0;
                    modInput.value = String(cur - 1);
                    modInput.dispatchEvent(new Event("input",  { bubbles: true }));
                    modInput.dispatchEvent(new Event("change", { bubbles: true }));

                    // Label
                    const label = document.createElement("div");
                    label.className = `form-group ${_LH_INJECTED_CLASS}`;
                    label.style.cssText = "margin-top:4px;font-size:11px;color:#8B0000;font-style:italic;";
                    label.textContent = `⚔ Linkshänder: −1 PA (Runde ${round}/5)`;
                    const anchor = modInput.closest(".form-group") ?? modInput.parentElement;
                    anchor.insertAdjacentElement("afterend", label);
                });
            }, { capture: true }); // capture phase: runs before GDSA's jQuery bubbling handler
        });
    });
}
