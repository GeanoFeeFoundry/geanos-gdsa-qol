// Geano's GDSA QoL – Main entry point

import { getSFData } from "./scripts/sf-database.js";
import { getVNAData } from "./scripts/vna-database.js";
import { attachTooltip, initGlobalTooltipHide } from "./scripts/tooltip-system.js";
import { SF_HANDLERS } from "./scripts/active-sf.js";
import { registerChatDetailsHook } from "./scripts/chat-details.js";
import { registerAspTrackerHook }  from "./scripts/asp-tracker.js";
import { registerMRTrackerHook }   from "./scripts/mr-tracker.js";
import { registerDamageApplyHook }     from "./scripts/damage-apply.js";
import { registerPassierschlagHook, registerNPCPassierschlagHook } from "./scripts/passierschlag-hook.js";
import { registerFollowUpHook }        from "./scripts/followup-hook.js";
import { registerPassiveSFHook }      from "./scripts/passive-sf.js";
import { registerNPCSpellRollHook }   from "./scripts/npc-spell-roll.js";
import { registerAdvantageEffectsHook } from "./scripts/advantage-effects.js";
import { registerEffectChangeHooks }    from "./scripts/effect-modifiers.js";

const MODULE_ID = "geanos-gdsa-qol";
const setting = key => game.settings.get(MODULE_ID, key);

// ─── Settings ─────────────────────────────────────────────────────────────

Hooks.once("init", () => {
    // Replace FoundryVTT's built-in "prone" status with DSA 4.1's "Liegend" condition.
    // This means the prone icon in the token HUD creates an ActiveEffect named "Liegend"
    // with the correct description, so effect-modifiers.js can pre-fill AT/PA dialogs
    // and advantage-effects.js can grant attackers the +3 AT / +5 PA bonus automatically.
    const prone = CONFIG.statusEffects.find(e => e.id === "prone");
    if (prone) {
        prone.name        = "Liegend";
        prone.description = "AT: -3, PA: -3";
    }

    game.settings.register(MODULE_ID, "rsMode", {
        name: "Rüstungsschutz-Modus",
        hint: "Bestimmt, ob bei Schadenstreffern der Gesamt-RS oder ein zufälliger Zonen-RS (1W20) des Ziels abgezogen wird.",
        scope: "world",
        config: true,
        type: String,
        choices: {
            "total": "Gesamt-RS (Standard)",
            "zone":  "Zonen-RS (1W20 Trefferzone)"
        },
        default: "total"
    });

    game.settings.register(MODULE_ID, "sfTooltips", {
        name: "SF & Liturgie Tooltips",
        hint: "Zeigt beim Hovern über Sonderfertigkeiten, Liturgien und Rituale im Charakterbogen einen Beschreibungs-Tooltip.",
        scope: "world",
        config: true,
        type: Boolean,
        default: true
    });

    game.settings.register(MODULE_ID, "vnaTooltips", {
        name: "Vor-/Nachteile Tooltips",
        hint: "Zeigt beim Hovern über Vorteile und Nachteile im Charakterbogen einen Beschreibungs-Tooltip.",
        scope: "world",
        config: true,
        type: Boolean,
        default: true
    });

    game.settings.register(MODULE_ID, "activeSF", {
        name: "Aktive SF Klick-Automatisierung",
        hint: "Macht aktive Sonderfertigkeiten im Charakterbogen anklickbar und führt deren Regelautomatisierung aus (Würfe, Effekte, Chat-Ausgabe).",
        scope: "world",
        config: true,
        type: Boolean,
        default: true
    });

    game.settings.register(MODULE_ID, "chatDetails", {
        name: "Chat Details",
        hint: "Fügt Würfelwurf-Nachrichten eine ausklappbare Details-Sektion mit Einzelwürfen und Modifikatoren hinzu.",
        scope: "world",
        config: true,
        type: Boolean,
        default: true
    });

    game.settings.register(MODULE_ID, "aspTracker", {
        name: "AsP / KaP Tracker",
        hint: "Zieht beim Ausspielen eines Zaubers oder einer Liturgie automatisch die AsP- bzw. KaP-Kosten vom Charakterbogen ab.",
        scope: "world",
        config: true,
        type: Boolean,
        default: true
    });

    game.settings.register(MODULE_ID, "aspTrackerVisible", {
        name: "AsP / KaP Abzug im Chat anzeigen",
        hint: "Wenn deaktiviert, werden die AsP- und KaP-Kosten trotzdem automatisch abgezogen, aber nicht als Zeile im Chat sichtbar. Nützlich um den AsP-Vorrat von Gegnern vor Spielern zu verbergen.",
        scope: "world",
        config: true,
        type: Boolean,
        default: true
    });

    game.settings.register(MODULE_ID, "mrTracker", {
        name: "MR-Tracker",
        hint: "Wendet bei Zauberwürfen automatisch die Magieresistenz des anvisierten Ziels auf das Ergebnis an.",
        scope: "world",
        config: true,
        type: Boolean,
        default: true
    });

    game.settings.register(MODULE_ID, "damageApply", {
        name: "Schaden Anwenden",
        hint: "Speichert den Schadenskontext in der Chat-Nachricht, sodass der 'Schaden anwenden'-Button auch nach einem Seiten-Reload zuverlässig funktioniert.",
        scope: "world",
        config: true,
        type: Boolean,
        default: true
    });

    game.settings.register(MODULE_ID, "passierschlag", {
        name: "Passierschlag-Automatisierung",
        hint: "Fügt im Angriffs-Dialog eine Passierschlag-Checkbox hinzu, die automatisch eine Erschwernis von −4 auf den Wurf anwendet.",
        scope: "world",
        config: true,
        type: Boolean,
        default: true
    });

    game.settings.register(MODULE_ID, "followupButtons", {
        name: "Folge-Aktions-Buttons im Chat",
        hint: "Zeigt in Kampf-Chat-Nachrichten Buttons für Folgereaktionen (Gegner-PA, Gegner-Werte, Held SE/Werte-Probe).",
        scope: "world",
        config: true,
        type: Boolean,
        default: true
    });

    game.settings.register(MODULE_ID, "passiveSF", {
        name: "Passive SF INI-Automatisierung",
        hint: "Korrigiert Kampfreflexe-INI beim Kampfbeginn: Das System rechnet +4 immer an; das Modul zieht 4 wieder ab wenn BE > 4 (regelkonformes Verhalten).",
        scope: "world",
        config: true,
        type: Boolean,
        default: true
    });
});

// ─── Hook: renderActorSheet ────────────────────────────────────────────────

Hooks.on("renderActorSheet", (sheet, html, sheetData) => {
    if (!sheetData?.actor) return;
    const actor = sheet.actor;

    const showSFTooltips = setting("sfTooltips");
    const showActiveSF   = setting("activeSF");

    if (showSFTooltips || showActiveSF) {
        html.find(".trait, .gmTableHelper3").each((i, el) => {
            const rawName = el.textContent
                .replace(/\(schläft\)/gi, "")
                .replace(/\(ruhend\)/gi, "")
                .trim();

            if (showSFTooltips) attachTooltip(el, rawName);

            if (showActiveSF) {
                const sfData = getSFData(rawName);
                if (!sfData || sfData.type !== "active") return;

                el.classList.add("gdsa-sf-clickable");
                el.style.cursor = "pointer";

                el.addEventListener("click", async e => {
                    if (e.target.closest("a")) return;
                    e.stopPropagation();
                    e.preventDefault();

                    const execKey = sfData.execute;
                    if (!execKey) {
                        ui.notifications.info(`${rawName}: Kein automatischer Prozess verfügbar.`);
                        return;
                    }
                    const handler = SF_HANDLERS[execKey];
                    if (typeof handler === "function") {
                        await handler(actor);
                    } else {
                        ui.notifications.info(`${rawName}: Prozess "${execKey}" nicht gefunden.`);
                    }
                });
            }
        });
    }

    if (setting("vnaTooltips") || setting("activeSF")) {
        html.find(".flaw").each((i, el) => {
            // GDSA wraps the name in <a data-type="advantage"> and may append the AP value
            // as trailing text. The exact item name is stored on the parent .item element as
            // data-flawName (HTML lowercases attribute names → dataset.flawname).
            const itemRow  = el.closest(".item");
            const itemName = itemRow?.dataset?.flawname ?? itemRow?.dataset?.flawName ?? "";
            const rawName  = itemName || el.textContent.trim();

            if (setting("vnaTooltips")) attachTooltip(el, rawName, { vnaFallback: true });

            if (setting("activeSF")) {
                const vnaData = getVNAData(rawName);
                if (!vnaData?.execute) return;

                el.classList.add("gdsa-sf-clickable");
                el.style.cursor = "pointer";
                el.addEventListener("click", async e => {
                    // Skip edit/delete icon clicks; DO NOT skip the name <a> tag —
                    // GDSA always wraps the flaw name in <a data-type="advantage">.
                    if (e.target.closest(".item-edit, .item-delete")) return;
                    e.stopPropagation();
                    e.preventDefault();
                    const handler = SF_HANDLERS[vnaData.execute];
                    if (typeof handler === "function") await handler(actor);
                    else ui.notifications.info(`${rawName}: Kein automatischer Prozess verfügbar.`);
                });
            }
        });
    }
});

// ─── Init ──────────────────────────────────────────────────────────────────

Hooks.once("ready", () => {
    initGlobalTooltipHide();

    registerMRTrackerHook();
    if (setting("chatDetails"))     registerChatDetailsHook();
    if (setting("aspTracker"))      registerAspTrackerHook();
    if (setting("damageApply"))     registerDamageApplyHook();
    if (setting("passierschlag"))   { registerPassierschlagHook(); registerNPCPassierschlagHook(); }
    if (setting("followupButtons")) registerFollowUpHook();
    if (setting("passiveSF"))       registerPassiveSFHook();
    registerNPCSpellRollHook();
    registerAdvantageEffectsHook();
    registerEffectChangeHooks();

    console.log("Geano's GDSA QoL | Modul geladen.");
});
