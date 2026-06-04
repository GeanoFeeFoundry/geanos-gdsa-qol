// Fixes GDSA damage-application buttons that fail with
// "Context was not found in Memory. Please reroll the initial Check."
//
// Root cause: GDSA's executeHealthLoss() reads a chatId from .iniBox[data-chatid]
// and looks up cached context via CONFIG.cache.get(chatId). The cache is only
// populated when damage is rolled via the AT chat button — rolling from the sheet
// produces a valid chat message but no cache entry, so the context lookup always
// fails for sheet-originated rolls.
//
// Fix: in Hooks.once("renderChatMessage") — which fires after GDSA's own
// Hooks.once hook has already registered $(document).on('click', '.bntChatDMG',
// executeHealthLoss) — we remove GDSA's handler with $(document).off() and
// replace it with our own. Our handler reads damage from .iniBox[data-dmgValue]
// directly without needing the cache.
//
// Button layout in damage-Roll.hbs:
//   <div class="iniBox" data-dmgValue="{{totalDMG}}" data-chatid="..." data-zone="...">
//     <input class="armourCheck" type="checkbox" checked>  ← armor toggle
//     <button class="item bntChat4 bntChatDMG" data-dmgModi="0.5">1/2</button>
//     <button class="item bntChat4 bntChatDMG" data-dmgModi="1">1</button>
//     <button class="item bntChat4 bntChatDMG" data-dmgModi="1.5">1.5</button>
//     <button class="item bntChat4 bntChatDMG" data-dmgModi="2">2</button>
//     <button class="item bntChat5 bntChatDMG" data-dmgModi="-1">Heal</button>
//   </div>
//
// dmgModi semantics: positive = damage multiplier, -1 = heal full amount.
// armourCheck unchecked = ignore RS (pass ignoreRS:true to applyAndReport).
//
// bntChatDamage (on AT-roll messages) is also intercepted here. GDSA's own
// executeDMGRoll handler for that button reads from CONFIG.cache and fails after
// a page reload. More importantly, our capture-phase fallback listener was
// accidentally matching it (button text "Schaden") and applying damage directly
// instead of first posting the damage roll to chat. Fix: bind a per-message
// renderChatMessage listener that calls GDSA's Dice.DMGRoll directly, producing
// the full damage-Roll.hbs message (with dice breakdown and apply buttons).
// The dmgCtx is also persisted in message flags for reload resilience.

import { applyAndReport } from "./target-effects.js";

// GDSA system's damage roll function — posts the full damage-Roll.hbs to chat.
// Path: /systems/gdsa/module/dice.js (system id = "gdsa" per template references).
import { DMGRoll as _gdsaDMGRoll } from "/systems/gdsa/module/dice.js";

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Fallback: extract damage total from GDSA custom HTML for non-.bntChatDMG buttons.
function _parseDamageTotal(doc) {
    for (const sel of [".diceD6", ".dice-damage", ".tp-result", ".damage-result"]) {
        const el = doc.querySelector(sel);
        if (!el) continue;
        const v = parseInt(el.textContent.trim());
        if (Number.isFinite(v) && v > 0) return v;
    }
    const dicesEl = doc.querySelector(".dices2");
    if (dicesEl) {
        const v = parseInt(dicesEl.textContent.trim());
        if (Number.isFinite(v) && v > 0) return v;
    }
    const m = doc.body.textContent.match(/(?:Schaden|TP|Treffer(?:punkte)?)[:\s]+(\d+)/i);
    if (m) {
        const v = parseInt(m[1]);
        if (Number.isFinite(v) && v > 0) return v;
    }
    return null;
}

// Fallback filter for non-GDSA generic damage buttons.
// Explicitly excludes GDSA's own button classes to avoid false positives.
function _isDamageApplyBtn(el) {
    if (el.classList.contains("bntChatDMG"))    return false;
    if (el.classList.contains("bntChatDamage")) return false;
    if (el.classList.contains("bntChatParry"))  return false;
    if (el.classList.contains("bntChatDogde"))  return false;

    const text   = (el.textContent ?? "").toLowerCase().trim();
    const type   = (el.dataset.type   ?? "").toLowerCase();
    const action = (el.dataset.action ?? "").toLowerCase();
    const cls    = el.className ?? "";
    return (
        type.includes("damage") || type.includes("heal") || type.includes("half") ||
        action.includes("damage") || action.includes("heal") || action.includes("apply") ||
        /apply[-_]?(damage|half|full|heal)/i.test(cls) ||
        /apply(Damage|Half|Full|Heal)/.test(cls) ||
        /heal(Damage|damage)/i.test(cls) ||
        text.includes("schaden") || text.includes("anwend") ||
        text.includes("heil")    || text.includes("halb")
    );
}

function _btnIntent(el) {
    const text   = el.textContent.toLowerCase();
    const type   = (el.dataset.type   ?? "").toLowerCase();
    const action = (el.dataset.action ?? "").toLowerCase();
    if (type.includes("heal")  || action.includes("heal")  || text.includes("heil"))  return "heal";
    if (type.includes("half")  || action.includes("half")  || text.includes("halb"))  return "half";
    return "damage";
}

// ─── Target resolution ────────────────────────────────────────────────────────

// Prefer the target of the player who owns the attacking actor, so the GM
// doesn't have to manually switch their own target after every player attack.
// Falls back to the current user's target if no player target is found.
function _resolveTarget(actorId) {
    if (actorId) {
        const actor = game.actors?.get(actorId);
        if (actor) {
            const owner = game.users?.find(u =>
                !u.isGM && u.active && actor.testUserPermission(u, "OWNER")
            );
            const ownerTarget = [...(owner?.targets ?? [])][0];
            if (ownerTarget) return ownerTarget;
        }
    }
    return [...game.user.targets][0] ?? null;
}

// ─── Core apply ───────────────────────────────────────────────────────────────

async function _doApply(amount, isHeal, actorId, ignoreRS = false) {
    const target = _resolveTarget(actorId);
    if (!target) {
        ui.notifications.warn("Kein Ziel ausgewählt – bitte ein Token als Ziel markieren.");
        return;
    }

    const actor = actorId ? (game.actors?.get(actorId) ?? null) : null;

    if (isHeal) {
        const tActor = target.actor ?? target.document?.actor;
        if (!tActor) { ui.notifications.warn("Ziel-Charakter nicht gefunden."); return; }
        const cur = parseInt(tActor.system?.LeP?.value) || 0;
        const max = parseInt(tActor.system?.LeP?.max)   || (cur + amount);
        const nv  = Math.min(max, cur + amount);
        try {
            await tActor.update({ "system.LeP.value": nv });
            await ChatMessage.create({
                content: `<div class="gdsa-sf-notes"><div class="gdsa-sf-note">${target.name}: +${amount} LeP geheilt.</div></div>`,
                speaker: actor ? ChatMessage.getSpeaker({ actor }) : {},
            });
        } catch {
            ui.notifications.error(`Heilung für ${target.name} konnte nicht angewendet werden.`);
        }
    } else {
        const notes = await applyAndReport(actor, target, { lePDamage: amount, ignoreRS });
        if (notes.length) {
            await ChatMessage.create({
                content: `<div class="gdsa-sf-notes">${notes.map(n => `<div class="gdsa-sf-note">${n}</div>`).join("")}</div>`,
                speaker: actor ? ChatMessage.getSpeaker({ actor }) : {},
            });
        }
    }
}

// ─── GDSA .bntChatDMG handler ─────────────────────────────────────────────────

async function _onBntChatDMG(event) {
    event.preventDefault();

    const btn    = event.currentTarget;
    const iniBox = btn.closest(".iniBox");
    if (!iniBox) {
        ui.notifications.warn("Schadenswert nicht ermittelbar – bitte Schaden manuell anwenden.");
        return;
    }

    // dataset keys are always lowercase regardless of template casing
    const rawDmg = parseFloat(iniBox.dataset.dmgvalue ?? iniBox.dataset.dmgValue);
    if (!Number.isFinite(rawDmg)) {
        ui.notifications.warn("Schadenswert nicht ermittelbar – bitte Schaden manuell anwenden.");
        return;
    }

    const modi    = parseFloat(btn.dataset.dmgmodi ?? btn.dataset.dmgModi ?? "1");
    const isHeal  = modi < 0;
    const amount  = isHeal
        ? Math.max(1, Math.round(rawDmg))
        : Math.max(1, Math.round(rawDmg * modi));

    // Respect GDSA's armor checkbox: unchecked = bypass RS.
    const ignoreRS = !(iniBox.querySelector(".armourCheck")?.checked ?? true);

    const msgEl   = btn.closest("[data-message-id]");
    const msg     = msgEl ? (game.messages?.get(msgEl.dataset.messageId) ?? null) : null;
    const actorId = msg?.speaker?.actor ?? null;

    await _doApply(amount, isHeal, actorId, ignoreRS);
}

// ─── GDSA .bntChatDamage handler (AT-roll → damage roll) ──────────────────────
//
// Replaces GDSA's executeDMGRoll which requires CONFIG.cache (fails after reload).
// Calls Dice.DMGRoll directly so the full damage-Roll.hbs is posted to chat,
// giving the player the dice breakdown and the apply buttons (1/2, 1, 1.5, 2, Heal).

async function _onBntChatDamage(event, message) {
    event.preventDefault();
    event.stopPropagation(); // prevent GDSA's jQuery-delegated executeDMGRoll

    const btn    = event.currentTarget;
    const chatId = btn.dataset.chatid ?? "";

    // Try runtime cache first (works in normal session flow)
    let ctx = CONFIG.cache?.get?.(chatId);

    // Fall back to persisted message flags (works after page reload)
    if (!ctx?.dmgString) {
        const saved = message.getFlag?.("geanos-gdsa-qol", "dmgCtx");
        if (saved?.dmgString) ctx = saved;
    }

    if (!ctx?.dmgString) {
        ui.notifications.warn("Schadenswurf nicht möglich – bitte den AT-Wurf wiederholen.");
        return;
    }

    const actorId = ctx.actorId ?? ctx.actor ?? "";
    const actor   = actorId ? (game.actors?.get(actorId) ?? null) : null;
    await _gdsaDMGRoll(ctx.dmgString, actor, ctx.multi ?? 1, chatId);
}

// ─── Registration ──────────────────────────────────────────────────────────────

export function registerDamageApplyHook() {
    // Replace GDSA's bntChatDMG apply handler (fires after GDSA's own Hooks.once).
    Hooks.once("renderChatMessage", () => {
        $(document).off("click", ".bntChatDMG");
        $(document).on("click",  ".bntChatDMG", _onBntChatDMG);
    });

    // Persist dmgCtx to message flags when an AT roll is created so the damage
    // roll button still works after a page reload (CONFIG.cache is cleared on reload).
    Hooks.on("createChatMessage", async (message) => {
        const doc    = new DOMParser().parseFromString(message.content ?? "", "text/html");
        const dmgBtn = doc.querySelector(".bntChatDamage");
        if (!dmgBtn) return;
        const chatId = dmgBtn.dataset.chatid ?? "";
        if (!chatId) return;
        const ctx = CONFIG.cache?.get?.(chatId);
        if (!ctx?.dmgString) return;
        await message.setFlag("geanos-gdsa-qol", "dmgCtx", {
            dmgString: ctx.dmgString,
            multi:     ctx.multi   ?? 1,
            actorId:   ctx.actor   ?? "",
        });
    });

    // Bind per-message handler for bntChatDamage. Using renderChatMessage (not
    // jQuery delegation) gives us the message object needed for flag fallback.
    // stopPropagation() in the handler prevents GDSA's delegated executeDMGRoll.
    Hooks.on("renderChatMessage", (message, html) => {
        const dmgBtn = html[0].querySelector(".bntChatDamage");
        if (!dmgBtn) return;
        dmgBtn.addEventListener("click", (e) => _onBntChatDamage(e, message));
    });

    // Fallback: document-level capture for non-GDSA generic damage buttons.
    // _isDamageApplyBtn now explicitly excludes all GDSA button classes.
    document.addEventListener("click", async function(e) {
        const btn = e.target.closest("a, button");
        if (!btn) return;
        if (btn.classList.contains("bntChatDMG")) return; // handled via jQuery above
        if (!_isDamageApplyBtn(btn)) return;

        const msgEl = btn.closest("[data-message-id]");
        if (!msgEl) return;
        const message = game.messages?.get(msgEl.dataset.messageId);
        if (!message) return;

        e.stopImmediatePropagation();
        e.preventDefault();

        let dmgValue = null;
        if (message.rolls?.length > 0) dmgValue = message.rolls[0].total ?? null;
        if (dmgValue === null) {
            const doc = new DOMParser().parseFromString(message.content ?? "", "text/html");
            dmgValue  = _parseDamageTotal(doc);
        }
        if (dmgValue === null) {
            ui.notifications.warn("Schadenswert nicht ermittelbar – bitte Schaden manuell anwenden.");
            return;
        }

        const intent  = _btnIntent(btn);
        const isHeal  = intent === "heal";
        const amount  = intent === "half" ? Math.max(1, Math.ceil(dmgValue / 2)) : dmgValue;
        const actorId = message.speaker?.actor ?? null;

        await _doApply(amount, isHeal, actorId, false);
    }, true);
}
