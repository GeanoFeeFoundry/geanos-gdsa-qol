// Hooks into preCreateChatMessage to append a collapsible "Details" section
// to rolls made by the GDSA system when relevant passive SFs are present.

import { getSFData } from "./sf-database.js";
import { buildDetailsSection } from "./chat-output.js";

function isGDSARoll(content) {
    if (!content) return false;
    return (
        content.includes("attack-Roll") ||
        content.includes("parry-Roll")  ||
        content.includes("damage-Roll") ||
        content.includes("skill-Roll")  ||
        content.includes("stat-Roll")   ||
        content.includes("dogde-Roll")
    );
}

function getRollType(content) {
    if (content.includes("attack-Roll")) return "attack";
    if (content.includes("parry-Roll"))  return "parry";
    if (content.includes("damage-Roll")) return "damage";
    if (content.includes("dogde-Roll"))  return "dodge";
    if (content.includes("skill-Roll"))  return "skill";
    if (content.includes("stat-Roll"))   return "stat";
    return "unknown";
}

function getUnarmedSkill(content) {
    if (content.includes('"raufen"') || content.includes("Raufen") || content.includes("raufen")) return "Raufen";
    if (content.includes('"ringen"') || content.includes("Ringen") || content.includes("ringen")) return "Ringen";
    return null;
}

function getPassiveSFReminders(actor, rollType, unarmedSkill) {
    if (!actor) return [];

    const allTraits = actor.items?.filter(i =>
        i.type === "Template" &&
        i.system?.type === "trai"
    ) ?? [];

    const traitNames = allTraits.map(t => t.name);
    const reminders = [];

    for (const name of traitNames) {
        const sfData = getSFData(name);
        if (!sfData || sfData.type !== "passive" || !sfData.passiveNote) continue;

        let relevant = false;

        switch (rollType) {
            case "attack":
                if (
                    name.startsWith("Waffenspezialisierung") ||
                    name.startsWith("Waffenmeister") ||
                    name === "Blindkampf" ||
                    name === "Kampf im Wasser" ||
                    name === "Unterwasserkampf"
                ) relevant = true;
                if (unarmedSkill === "Raufen" && name === "Versteckte Klinge") relevant = true;
                break;

            case "parry":
                if (
                    name === "Blindkampf" ||
                    name === "Eisenarm" ||
                    name.startsWith("Parierwaffen") ||
                    name.startsWith("Schildkampf") ||
                    name === "Linkhand"
                ) relevant = true;
                if (unarmedSkill === "Raufen" && (
                    name === "Auspendeln" ||
                    name === "Beinarbeit" ||
                    name === "Eisenarm"
                )) relevant = true;
                break;

            case "damage":
                if (name.startsWith("Waffenspezialisierung") || name.startsWith("Waffenmeister")) relevant = true;
                break;

            case "dodge":
                if (name.startsWith("Ausweichen") || name === "Blindkampf") relevant = true;
                break;

            case "skill":
            case "stat":
                if (name === "Konzentrationsstärke" || name === "Gedankenschutz") relevant = true;
                break;
        }

        if (name === "Aufmerksamkeit") relevant = (rollType === "attack" || rollType === "parry");

        if (relevant) {
            reminders.push({ label: name, value: sfData.passiveNote });
        }
    }

    return reminders;
}

export function registerChatDetailsHook() {
    Hooks.on("preCreateChatMessage", (message, data, options, userId) => {
        const content = message.content ?? data.content;
        if (!content || !isGDSARoll(content)) return true;

        const speaker = message.speaker ?? data.speaker;
        const actor = speaker?.actor ? game.actors?.get(speaker.actor) : null;
        if (!actor) return true;

        const rollType    = getRollType(content);
        const unarmedSkill = getUnarmedSkill(content);
        const reminders   = getPassiveSFReminders(actor, rollType, unarmedSkill);

        if (reminders.length === 0) return true;

        const detailsHtml = buildDetailsSection(reminders);
        if (!detailsHtml) return true;

        message.updateSource({ content: content + detailsHtml });
        return true;
    });
}
