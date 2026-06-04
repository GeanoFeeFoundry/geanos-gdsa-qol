// Active SF handler functions with automated target-effect management.

import { rollD20Attack, rollD20Defense, rollStat, rollDamage, rollDice } from "./roll-engine.js";
import { buildChatContent, postChatMessage } from "./chat-output.js";
import {
    showAnsageDialog, showFixedMalusDialog, showWeaponSelectDialog,
    showInfoDialog, showGenderDialog, showAnsageSplitDialog, showRSDialog,
} from "./sf-dialogs.js";
import { getFirstTarget, applyAndReport } from "./target-effects.js";
import { applyStatusEffect, applyStatusEffectRoll } from "./status-effects.js";

// ─── Actor value helpers ──────────────────────────────────────────────────────

// GDSA stores the final combat technique values in actor.system.skill[name]:
//   .atk = total AT (e.g. 14) — GDSA uses this directly as the roll target
//   .def = total PA (e.g. 11) — same
// Source: listenerFunctions.js line 2047: ATKValue = actor.system.skill[item.skill].atk
function getSkillAT(actor, skillName) {
    const skill = actor.system.skill?.[skillName];
    if (skill !== undefined) {
        const atk = parseInt(skill.atk);
        if (Number.isFinite(atk) && atk > 0) return atk;
    }
    return parseInt(actor.system.ATBasis?.value)
        || parseInt(actor.system.AT?.value)
        || 10;
}

function getSkillPA(actor, skillName) {
    const skill = actor.system.skill?.[skillName];
    if (skill !== undefined) {
        const def = parseInt(skill.def);
        if (Number.isFinite(def) && def > 0) return def;
    }
    return parseInt(actor.system.PABasis?.value)
        || parseInt(actor.system.PA?.value)
        || 8;
}

// Looks up the weapon's combat skill name via GDSA's talent config table.
// Weapons store a skill ID in system.weapon.skill; CONFIG.Templates.talents.all maps IDs to names.
function _getWeaponSkillName(weapon) {
    const skillId = weapon?.system?.weapon?.skill;
    if (!skillId) return null;
    return CONFIG.Templates?.talents?.all?.find(t => t._id === skillId)?.name ?? null;
}

// GDSA computes weapon AT as: actor.system.skill[skillName].atk + weapon WM-ATK.
// skill.atk already contains the total skill AT (not a delta above ATBasis).
function getWeaponAT(actor, weapon) {
    const skillName = _getWeaponSkillName(weapon);
    if (skillName) {
        const skill = actor.system.skill?.[skillName];
        if (skill !== undefined) {
            const atk = parseInt(skill.atk);
            if (Number.isFinite(atk) && atk > 0) {
                const wm = parseInt(weapon?.system?.weapon?.["WM-ATK"]) || 0;
                return atk + wm;
            }
        }
    }
    return parseInt(actor.system?.ATBasis?.value)
        || parseInt(actor.system?.AT?.value)
        || 10;
}

function getWeaponPA(actor, weapon) {
    const skillName = _getWeaponSkillName(weapon);
    if (skillName) {
        const skill = actor.system.skill?.[skillName];
        if (skill !== undefined) {
            const def = parseInt(skill.def);
            if (Number.isFinite(def) && def > 0) {
                const wm = parseInt(weapon?.system?.weapon?.["WM-DEF"]) || 0;
                return def + wm;
            }
        }
    }
    return parseInt(actor.system?.PABasis?.value)
        || parseInt(actor.system?.PA?.value)
        || 8;
}

function getWeaponDmg(weapon) {
    return weapon?.system?.dmg ?? weapon?.system?.tp ?? "1W6+2";
}

function getGS(actor) {
    return parseInt(actor.system.GS?.value ?? actor.system.GS) || 8;
}

function _noTarget() {
    return "⚠ Kein Ziel ausgewählt – Effekte nicht automatisch angewendet.";
}

// Applies self-INI loss directly (used when no target token is available).
async function _applySelfINI(actor, formula, notes) {
    const roll = await rollDice(formula);
    const loss = roll.total;
    const combatant = game.combat?.combatants.find(c => c.actor?.id === actor.id);
    if (!combatant) {
        notes.push(`${actor.name}: −${loss} eigene INI (nicht im Kampf – manuell anwenden).`);
        return;
    }
    const current = combatant.initiative ?? 0;
    const newINI = current - loss;
    try {
        await game.combat.updateEmbeddedDocuments("Combatant", [{ _id: combatant.id, initiative: newINI }]);
        notes.push(`${actor.name}: −${loss} eigene INI (${current} → ${newINI}).`);
    } catch {
        notes.push(`${actor.name}: −${loss} eigene INI (keine Berechtigung – manuell anwenden).`);
    }
}

// ─── Generic patterns ─────────────────────────────────────────────────────────

// Raufen/Ringen AT with Ansage → AuP damage on hit.
async function _ansageAT(sfName, actor, skillName, dmgFormula) {
    const atk = getSkillAT(actor, skillName);
    const dialog = await showAnsageDialog(sfName, skillName);
    if (!dialog) return;
    const { ansage } = dialog;

    const atkResult = await rollD20Attack(atk, -ansage, skillName, actor);
    const notes = [];
    let dmgResult = null;
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        dmgResult = await rollDamage(dmgFormula, ansage);
        if (target) {
            notes.push(...await applyAndReport(actor, target, { auDamage: dmgResult.total }));
        } else {
            notes.push(_noTarget());
        }
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: skillName, atkResult, dmgResult, notes }));
}

// PA with Ansage → bonus points for next action.
async function _ansagePA(sfName, actor, skillName, maxAnsage = 10) {
    const pa = getSkillPA(actor, skillName);
    const dialog = await showAnsageDialog(sfName, skillName, maxAnsage);
    if (!dialog) return;
    const { ansage } = dialog;

    const paResult = await rollD20Defense(pa, -ansage, skillName, actor);
    const notes = [];
    if (paResult.blocked || paResult.crit) {
        notes.push(`${ansage} Punkte für nächste Aktion (AT-Erleichterung oder PA-Erschwernis beim Gegner).`);
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: skillName, paResult, notes }));
}

// ─── Waffenlose Kampf-SFs ─────────────────────────────────────────────────────

async function executeGerade(actor)    { await _ansageAT("Gerade",    actor, "Raufen", "1W6+1"); }
async function executeBiss(actor)      { await _ansageAT("Biss",       actor, "Raufen", "1W6");   }
async function executeTritt(actor)     { await _ansageAT("Tritt",      actor, "Raufen", "1W6");   }
async function executeHandkante(actor) { await _ansageAT("Handkante",  actor, "Raufen", "1W6+2"); }

async function executeHoherTritt(actor) {
    const sfName = "Hoher Tritt";
    const skillName = "Raufen";
    const atk = getSkillAT(actor, skillName);
    const dialog = await showAnsageDialog(sfName, skillName);
    if (!dialog) return;
    const { ansage } = dialog;

    const atkResult = await rollD20Attack(atk, -ansage, skillName, actor);
    const notes = ["PA ohne Auspendeln/Kreuzblock um −4 erschwert."];
    let dmgResult = null;
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        dmgResult = await rollDamage("1W6", ansage);
        if (target) {
            notes.push(...await applyAndReport(actor, target, { auDamage: dmgResult.total }));
        } else {
            notes.push(_noTarget());
        }
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: skillName, atkResult, dmgResult, notes }));
}

async function executeKopfstoss(actor) {
    const sfName = "Kopfstoß";
    const skillName = "Raufen";
    const atk = getSkillAT(actor, skillName);
    const dialog = await showAnsageDialog(sfName, skillName);
    if (!dialog) return;
    const { ansage } = dialog;

    const atkResult = await rollD20Attack(atk, -ansage, skillName, actor);
    const notes = ["Gegen Bewaffnete: Angreifer erleidet bei erfolgreicher Parade volle TP."];
    const followUpButtons = [];
    let dmgResult = null;
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        dmgResult = await rollDamage("1W6", ansage);
        if (target) {
            notes.push(...await applyAndReport(actor, target, { auDamage: dmgResult.total }));
        } else {
            notes.push(_noTarget());
        }
        followUpButtons.push({
            label: "Gegner: Parade gegen Kopfstoß",
            action: "enemy-pa",
            params: {
                skill: "Raufen",
                modifier: 0,
                successNote: "Parade gelungen – Angreifer erleidet volle TP des Gegners (manuell anwenden).",
            },
        });
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: skillName, atkResult, dmgResult, notes, followUpButtons }));
}

async function executeKnie(actor) {
    const sfName = "Knie";
    const skillName = "Raufen";
    const atk = getSkillAT(actor, skillName);
    const dialog = await showAnsageDialog(sfName, skillName);
    if (!dialog) return;
    const { ansage } = dialog;

    const gender = await showGenderDialog();
    if (gender === null) return;

    const atkResult = await rollD20Attack(atk, -ansage, skillName, actor);
    const notes = ["Ohne Beinarbeit/Kreuzblock/Ausweichen: PA um −4 erschwert."];
    const followUpButtons = [];
    let dmgResult = null;
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        dmgResult = await rollDamage(gender === "male" ? "1W6+2" : "1W6", ansage);
        if (target) {
            notes.push(...await applyAndReport(actor, target, { auDamage: dmgResult.total }));
        } else {
            notes.push(_noTarget());
        }
        followUpButtons.push({
            label: "Gegner: KO-Probe (wenn SP(A) > Wundschwelle)",
            action: "enemy-stat",
            params: {
                stat: "KO", statName: "KO-Probe",
                onFail: { iniLossFormula: "2d6",
                    failNote: "KO-Probe misslungen – 1W3 Runden kampfunfähig + 2W6 INI-Verlust." },
                successNote: "KO-Probe gelungen.",
            },
        });
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: skillName, atkResult, dmgResult, notes, followUpButtons }));
}

async function executeFussfeger(actor) {
    const sfName = "Fußfeger";
    const skillName = "Raufen";
    const atk = getSkillAT(actor, skillName);

    const atkResult = await rollD20Attack(atk, 0, skillName, actor);
    const notes = [];
    const followUpButtons = [];
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        if (!target) notes.push(_noTarget());
        followUpButtons.push({
            label: "Gegner: GE-Probe (Sturz vermeiden)",
            action: "enemy-stat",
            params: {
                stat: "GE", statName: "GE-Probe",
                onFail: { iniLossFormula: "2d6", prone: true,
                    failNote: "GE-Probe misslungen – Gegner zu Boden + 2W6 INI-Verlust." },
                successNote: "GE-Probe gelungen – kein Sturz.",
            },
        });
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: skillName, atkResult, notes, followUpButtons }));
}

async function executeSchmetterschlag(actor) {
    const sfName = "Schmetterschlag";
    const skillName = "Raufen";
    const atk = getSkillAT(actor, skillName);
    const dialog = await showAnsageDialog(sfName, skillName);
    if (!dialog) return;
    const { ansage } = dialog;

    const atkResult = await rollD20Attack(atk, -ansage, skillName, actor);
    const notes = [];
    const followUpButtons = [];
    let dmgResult = null;
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        dmgResult = await rollDamage("1W6+1", ansage);
        if (target) {
            notes.push(...await applyAndReport(actor, target, { auDamage: dmgResult.total }));
        } else {
            notes.push(_noTarget());
        }
        notes.push("Überschreiten SP(A) die Wundschwelle: KO-Probe, sonst 1W6 SR bewusstlos.");
        followUpButtons.push({
            label: "Gegner: KO-Probe (wenn SP(A) > Wundschwelle)",
            action: "enemy-stat",
            params: { stat: "KO", statName: "KO-Probe" },
        });
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: skillName, atkResult, dmgResult, notes, followUpButtons }));
}

async function executeDoppelschlag(actor) {
    const sfName = "Doppelschlag";
    const skillName = "Raufen";
    const atk = getSkillAT(actor, skillName);
    const dialog = await showAnsageDialog(sfName, skillName);
    if (!dialog) return;
    const { ansage } = dialog;

    const atkResult = await rollD20Attack(atk, -4 - ansage, skillName, actor);
    const notes = ["AT automatisch +4 erschwert. Verteidiger benötigt zwei Paraden (oder Block +4 oder Ausweichen +6)."];
    let dmgResult = null;
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        const dmg1 = await rollDamage("1W6+1", ansage);
        const dmg2 = await rollDamage("1W6+1");
        dmgResult = dmg1;
        const total = dmg1.total + dmg2.total;
        notes.push(`Zwei Treffer: ${dmg1.total} + ${dmg2.total} = ${total} AuP.`);
        if (target) {
            notes.push(...await applyAndReport(actor, target, { auDamage: total }));
        } else {
            notes.push(_noTarget());
        }
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: skillName, atkResult, dmgResult, notes }));
}

async function executeSprungtritt(actor) {
    const sfName = "Sprungtritt";
    const skillName = "Raufen";
    const atk = getSkillAT(actor, skillName);
    const dialog = await showAnsageDialog(sfName, skillName);
    if (!dialog) return;
    const { ansage } = dialog;

    const atkResult = await rollD20Attack(atk, -4 - ansage, skillName, actor);
    const notes = ["AT automatisch +4 erschwert."];
    let dmgResult = null;
    const target = getFirstTarget();

    // 1W6 INI loss for target regardless of hit/miss
    if (target) {
        notes.push(...await applyAndReport(actor, target, { iniLossFormula: "1d6" }));
    } else {
        const iniRoll = await rollDice("1d6");
        notes.push(`Unabhängig vom Ergebnis: ${iniRoll.total} INI-Verlust für Verteidiger (kein Ziel gewählt – manuell anwenden).`);
    }

    const followUpButtons = [];

    if (atkResult.hit || atkResult.crit) {
        dmgResult = await rollDamage("1W6+3", ansage); // base 1W6+1 + 2 extra TP(A)
        if (target) {
            notes.push(...await applyAndReport(actor, target, { auDamage: dmgResult.total }));
        }
    } else {
        notes.push("Sprungtritt verfehlt: Angreifer muss GE-Probe ablegen, sonst Sturz.");
        followUpButtons.push({
            label: "Held: GE-Probe (Sprungtritt verfehlt)",
            action: "hero-stat",
            params: {
                stat: "GE", statName: "GE-Probe",
                successNote: "GE-Probe gelungen – kein Sturz.",
                failNote: "GE-Probe misslungen – Angreifer stürzt (Liegend, manuell anwenden).",
            },
        });
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: skillName, atkResult, dmgResult, notes, followUpButtons }));
}

async function executeWuergegriff(actor) {
    const sfName = "Würgegriff";
    const skillName = "Ringen";
    const atk = getSkillAT(actor, skillName);

    const atkResult = await rollD20Attack(atk, 0, skillName, actor);
    const notes = [];
    let dmgResult = null;
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        dmgResult = await rollDamage("1W6+2");
        if (target) {
            notes.push(...await applyAndReport(actor, target, { auDamage: dmgResult.total }));
        } else {
            notes.push(_noTarget());
        }
        notes.push("Würgegriff aktiv: Folgerunden automatisch 1W6+2 AuP ohne weitere AT-Probe.");
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: skillName, atkResult, dmgResult, notes }));
}

async function executeWurf(actor) {
    const sfName = "Wurf";
    const skillName = "Ringen";
    const atk = getSkillAT(actor, skillName);

    const atkResult = await rollD20Attack(atk, -4, skillName, actor);
    const notes = ["AT automatisch +4 erschwert. Erfordert vorherigen Halten/Griff."];
    let dmgResult = null;
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        dmgResult = await rollDamage("1W6");
        if (target) {
            notes.push(...await applyAndReport(actor, target, { auDamage: dmgResult.total, iniLossFormula: "2d6", prone: true }));
        } else {
            notes.push(_noTarget());
            notes.push("Ziel geworfen: 1W6 AuP, 2W6 INI-Verlust, Status Liegend (manuell anwenden).");
        }
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: skillName, atkResult, dmgResult, notes }));
}

async function executeNiederringen(actor) {
    const sfName = "Niederringen";
    const skillName = "Ringen";
    const atk = getSkillAT(actor, skillName);
    const dialog = await showAnsageSplitDialog(sfName, skillName);
    if (!dialog) return;
    const { ansage } = dialog;

    const atkResult = await rollD20Attack(atk, -ansage, skillName, actor);
    const notes = [];
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        if (target) {
            notes.push(...await applyAndReport(actor, target, { iniLossFormula: "2d6", prone: true }));
            notes.push(...await applyAndReport(actor, target, { selfINILossFormula: "1d6" }));
        } else {
            notes.push(_noTarget());
            notes.push("Ziel: 2W6 INI-Verlust + Liegend (manuell anwenden).");
            await _applySelfINI(actor, "1d6", notes);
        }
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: skillName, atkResult, notes }));
}

async function executeGriff(actor) {
    const sfName = "Griff";
    const skillName = "Ringen";
    const atk = getSkillAT(actor, skillName);
    const dialog = await showAnsageDialog(sfName, skillName);
    if (!dialog) return;
    const { ansage } = dialog;

    const atkResult = await rollD20Attack(atk, -ansage, skillName, actor);
    const notes = [];
    if (atkResult.hit || atkResult.crit) {
        notes.push(`Gegner im Griff: alle seine Aktionen um −${Math.floor(ansage / 2)} erschwert, solange der Griff hält.`);
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: skillName, atkResult, notes }));
}

async function executeKlammer(actor) {
    const sfName = "Klammer";
    const skillName = "Ringen";
    const atk = getSkillAT(actor, skillName);
    const dialog = await showAnsageDialog(sfName, skillName);
    if (!dialog) return;
    const { ansage } = dialog;

    const atkResult = await rollD20Attack(atk, -ansage, skillName, actor);
    const notes = [];
    const followUpButtons = [];
    if (atkResult.hit || atkResult.crit) {
        notes.push(`Geklammerter Gegner: Befreiung per Ringen-PA (−${ansage}) oder KK-Probe. Nur Biss/Kopfstoß/Knie/Schwitzkasten/Würgegriff möglich.`);
        followUpButtons.push({
            label: `Gegner: Ringen-PA (−${ansage}) – Befreiung`,
            action: "enemy-pa",
            params: {
                skill: "Ringen", modifier: -ansage,
                successNote: "Ringen-PA gelungen – Gegner befreit.",
                failNote:    "Ringen-PA misslungen – Gegner bleibt in der Klammer.",
            },
        });
        followUpButtons.push({
            label: `Gegner: KK-Probe (−${ansage}) – Befreiung`,
            action: "enemy-stat",
            params: {
                stat: "KK", statName: "KK-Probe", modifier: -ansage,
                successNote: "KK-Probe gelungen – Gegner befreit.",
                failNote:    "KK-Probe misslungen – Gegner bleibt in der Klammer.",
            },
        });
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: skillName, atkResult, notes, followUpButtons }));
}

async function executeHalten(actor) {
    const sfName = "Halten";
    const skillName = "Ringen";
    const atk = getSkillAT(actor, skillName);
    const dialog = await showAnsageDialog(sfName, skillName, 10);
    if (!dialog) return;
    const { ansage } = dialog;

    const atkResult = await rollD20Attack(atk, -ansage, skillName, actor);
    const notes = [];
    if (atkResult.hit || atkResult.crit) {
        notes.push(`${ansage} Punkte als Erschwernis auf nächste gegnerische Aktion.`);
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: skillName, atkResult, notes }));
}

async function executeBlock(actor)     { await _ansagePA("Block",     actor, "Raufen"); }

async function executeKreuzblock(actor) {
    const sfName = "Kreuzblock";
    const skillName = "Raufen";
    const pa = getSkillPA(actor, skillName);
    const dialog = await showAnsageDialog(sfName, skillName, 10);
    if (!dialog) return;
    const { ansage } = dialog;

    const paResult = await rollD20Defense(pa, -ansage, skillName, actor);
    const notes = [];
    if (paResult.blocked || paResult.crit) {
        notes.push(`${ansage} Punkte frei aufteilen: PA-Erschwernis für Gegner und/oder AT-Erleichterung für nächsten eigenen Raufen-Angriff.`);
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: skillName, paResult, notes }));
}

async function executeSchwitzkasten(actor) {
    const sfName = "Schwitzkasten";
    const skillName = "Ringen";
    const atk = getSkillAT(actor, skillName);

    const atkResult = await rollD20Attack(atk, 0, skillName, actor);
    const notes = [];
    let dmgResult = null;
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        dmgResult = await rollDamage("1W6+1");
        if (target) {
            notes.push(...await applyAndReport(actor, target, { auDamage: dmgResult.total }));
        } else {
            notes.push(_noTarget());
        }
        notes.push("Schwitzkasten aktiv: Folge-AT je +1 erleichtert, Schaden steigt (1W6+2, 1W6+3, ...). Verteidiger: Paraden je −1.");
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: skillName, atkResult, dmgResult, notes }));
}

async function executeKnaufschlag(actor) {
    const sfName = "Knaufschlag";
    const skillName = "Raufen";
    const atk = getSkillAT(actor, skillName);
    const dialog = await showAnsageDialog(sfName, skillName);
    if (!dialog) return;
    const { ansage } = dialog;

    const atkResult = await rollD20Attack(atk, -ansage, skillName, actor);
    const notes = [];
    let dmgResult = null;
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        dmgResult = await rollDamage("1W6+2", ansage);
        if (target) {
            notes.push(...await applyAndReport(actor, target, { auDamage: dmgResult.total }));
        } else {
            notes.push(_noTarget());
        }
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: skillName, atkResult, dmgResult, notes }));
}

async function executeSchwinger(actor) {
    const sfName = "Schwinger";
    const skillName = "Raufen";
    const atk = getSkillAT(actor, skillName);
    const dialog = await showAnsageDialog(sfName, skillName);
    if (!dialog) return;
    const { ansage } = dialog;

    const atkResult = await rollD20Attack(atk, -ansage, skillName, actor);
    const notes = ["Ohne Auspendeln: Parade gegen Schwinger um −4 erschwert."];
    if (atkResult.hit || atkResult.crit) {
        notes.push(`Gegnerische Parade um −${ansage} erschwert (Schwinger).`);
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: skillName, atkResult, notes }));
}

async function executeSchwanzschlag(actor) {
    const sfName = "Schwanzschlag";
    const skillName = "Raufen";
    const atk = getSkillAT(actor, skillName);

    const atkResult = await rollD20Attack(atk, 0, skillName, actor);
    const notes = [];
    if (atkResult.hit || atkResult.crit) {
        const paReduction = Math.floor(atkResult.overshoot / 2);
        notes.push(`Gegnerische Parade um −${paReduction} erschwert (halbe Überschreitung).`);
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: skillName, atkResult, notes }));
}

async function executeSprung(actor) {
    const sfName = "Sprung";
    const skillName = "Raufen";
    const pa = getSkillPA(actor, skillName);
    const dialog = await showAnsageDialog(sfName, skillName, 10);
    if (!dialog) return;
    const { ansage } = dialog;

    // Penalties vary by attack type; user must track the correct modifier
    const paResult = await rollD20Defense(pa, -ansage, skillName, actor);
    const notes = ["Gegen Handgemenge −4, gegen Nahkampf −2, gegen Bewaffnete zusätzlich −2."];

    // Self always loses 1W6 INI regardless of outcome
    await _applySelfINI(actor, "1d6", notes);

    if (paResult.blocked || paResult.crit) {
        if (ansage > 0) notes.push(`${ansage} Punkte als Bonus auf nächsten Sprungtritt oder Schwanzschlag.`);
    } else {
        notes.push("Sprung-Parade misslungen: GE-Probe erforderlich (Standfest/Balance erleichtern).");
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: skillName, paResult, notes }));
}

async function executeSchmutzigeTricks(actor) {
    const sfName = "Schmutzige Tricks";
    const skillName = "Raufen";
    const atk = getSkillAT(actor, skillName);
    const dialog = await showAnsageDialog(sfName, skillName);
    if (!dialog) return;
    const { ansage } = dialog;

    const atkResult = await rollD20Attack(atk, -ansage, skillName, actor);
    const notes = [];
    let dmgResult = null;
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        dmgResult = await rollDamage("1W6", ansage);
        if (target) {
            notes.push(...await applyAndReport(actor, target, { auDamage: dmgResult.total }));
        } else {
            notes.push(_noTarget());
        }
        notes.push("Schaden als AU- oder INI-Verlust (Meisterentscheid). Rüstung schützt nicht.");
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: skillName, atkResult, dmgResult, notes }));
}

// ─── Generelle Kampf-SFs ──────────────────────────────────────────────────────

async function executeWuchtschlag(actor) {
    const sfName = "Wuchtschlag";
    const weapon = await showWeaponSelectDialog(actor);
    if (weapon === undefined) return;
    if (!weapon) { ui.notifications.warn("Keine Nahkampfwaffe ausgerüstet."); return; }

    const atk = getWeaponAT(actor, weapon);
    const dialog = await showAnsageDialog(sfName, weapon.name);
    if (!dialog) return;
    const { ansage } = dialog;

    const atkResult = await rollD20Attack(atk, -ansage, weapon.name, actor);
    const notes = [];
    let dmgResult = null;
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        dmgResult = await rollDamage(getWeaponDmg(weapon), ansage);
        if (target) {
            notes.push(...await applyAndReport(actor, target, { lePDamage: dmgResult.total }));
        } else {
            notes.push(_noTarget());
        }
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: weapon.name, atkResult, dmgResult, notes }));
}

async function executeHammerschlag(actor) {
    const sfName = "Hammerschlag";
    const weapon = await showWeaponSelectDialog(actor);
    if (weapon === undefined) return;
    if (!weapon) { ui.notifications.warn("Keine Nahkampfwaffe ausgerüstet."); return; }

    const atk = getWeaponAT(actor, weapon);
    const dialog = await showFixedMalusDialog(sfName, weapon.name, 8, "Alles-oder-Nichts: AT +8 erschwert, bei Treffer doppelte TP.");
    if (!dialog) return;
    const { malus, extra } = dialog;

    const atkResult = await rollD20Attack(atk, -(malus + extra), weapon.name, actor);
    const notes = [];
    let dmgResult = null;
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        const base = await rollDamage(getWeaponDmg(weapon));
        dmgResult = { total: base.total * 2, formula: `(${base.formula}) × 2` };
        if (target) {
            notes.push(...await applyAndReport(actor, target, { lePDamage: dmgResult.total }));
        } else {
            notes.push(_noTarget());
        }
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: weapon.name, atkResult, dmgResult, notes }));
}

async function executeSturmangriff(actor) {
    const sfName = "Sturmangriff";
    const weapon = await showWeaponSelectDialog(actor);
    if (weapon === undefined) return;
    if (!weapon) { ui.notifications.warn("Keine Nahkampfwaffe ausgerüstet."); return; }

    const atk = getWeaponAT(actor, weapon);
    const gs = getGS(actor);
    const gsBonus = Math.floor(gs / 2) + 4;
    const dialog = await showFixedMalusDialog(sfName, weapon.name, 4, `AT +4 erschwert. TP-Bonus: GS(${gs})/2 + 4 = +${gsBonus}.`);
    if (!dialog) return;
    const { malus, extra } = dialog;

    const atkResult = await rollD20Attack(atk, -(malus + extra), weapon.name, actor);
    const notes = [`GS-Bonus: +${gsBonus} TP.`];
    let dmgResult = null;
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        dmgResult = await rollDamage(getWeaponDmg(weapon), gsBonus);
        if (target) {
            notes.push(...await applyAndReport(actor, target, { lePDamage: dmgResult.total }));
        } else {
            notes.push(_noTarget());
        }
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: weapon.name, atkResult, dmgResult, notes }));
}

async function executeFinte(actor) {
    const sfName = "Finte";
    const weapon = await showWeaponSelectDialog(actor);
    if (weapon === undefined) return;
    if (!weapon) { ui.notifications.warn("Keine Nahkampfwaffe ausgerüstet."); return; }

    const atk = getWeaponAT(actor, weapon);
    const dialog = await showAnsageDialog(sfName, weapon.name);
    if (!dialog) return;
    const { ansage } = dialog;

    const atkResult = await rollD20Attack(atk, -ansage, weapon.name, actor);
    const notes = [];
    if (atkResult.hit || atkResult.crit) {
        notes.push(`Gegnerische Parade um −${ansage} Punkte erschwert (Finte).`);
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: weapon.name, atkResult, notes }));
}

async function executeTodesstos(actor) {
    const sfName = "Todesstoß";
    const weapon = await showWeaponSelectDialog(actor);
    if (weapon === undefined) return;
    if (!weapon) { ui.notifications.warn("Keine Stichwaffe ausgerüstet."); return; }

    const atk = getWeaponAT(actor, weapon);
    const dialog = await showRSDialog();
    if (!dialog) return;
    const { rs, extra } = dialog;

    const rsMalus = Math.floor(rs / 2);
    const totalMalus = 8 + rsMalus + extra;

    const atkResult = await rollD20Attack(atk, -totalMalus, weapon.name, actor);
    const notes = [`AT-Erschwernis: +8 (Basis) + ${rsMalus} (½ RS) + ${extra} (extra) = +${totalMalus}.`];
    let dmgResult = null;
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        dmgResult = await rollDamage(getWeaponDmg(weapon));
        if (target) {
            notes.push(...await applyAndReport(actor, target, { lePDamage: dmgResult.total }));
        } else {
            notes.push(_noTarget());
        }
        notes.push("Todesstoß: Wundschwelle um 4 gesenkt, Wunden zählen doppelt.");
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: weapon.name, atkResult, dmgResult, notes }));
}

async function executeMeisterparade(actor) {
    const sfName = "Meisterparade";
    const weapon = await showWeaponSelectDialog(actor);
    if (weapon === undefined) return;
    if (!weapon) { ui.notifications.warn("Keine Nahkampfwaffe ausgerüstet."); return; }

    const pa = getWeaponPA(actor, weapon);
    const dialog = await showAnsageDialog(sfName, weapon.name, 10);
    if (!dialog) return;
    const { ansage } = dialog;

    const paResult = await rollD20Defense(pa, -ansage, weapon.name, actor);
    const notes = [];
    if (paResult.blocked || paResult.crit) {
        notes.push(`${ansage} Punkte als Bonus auf nächste AT oder PA.`);
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: weapon.name, paResult, notes }));
}

async function executeNiederwerfen(actor) {
    const sfName = "Niederwerfen";
    const weapon = await showWeaponSelectDialog(actor);
    if (weapon === undefined) return;
    if (!weapon) { ui.notifications.warn("Keine Nahkampfwaffe ausgerüstet."); return; }

    const atk = getWeaponAT(actor, weapon);
    const dialog = await showAnsageDialog(sfName, weapon.name);
    if (!dialog) return;
    const { ansage } = dialog;

    const atkResult = await rollD20Attack(atk, -4 - ansage, weapon.name, actor);
    const notes = ["AT automatisch +4 erschwert."];
    const followUpButtons = [];
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        if (!target) notes.push(_noTarget());
        const modStr = ansage > 0 ? ` (−${ansage})` : "";
        followUpButtons.push({
            label: `Gegner: KK-Probe${modStr} (Sturz vermeiden)`,
            action: "enemy-stat",
            params: {
                stat: "KK", statName: "KK-Probe", modifier: -ansage,
                onFail: { prone: true, failNote: "KK-Probe misslungen – Gegner zu Boden." },
                successNote: "KK-Probe gelungen – kein Sturz.",
            },
        });
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: weapon.name, atkResult, notes, followUpButtons }));
}

async function executeAusfall(actor) {
    const sfName = "Ausfall";
    const weapon = await showWeaponSelectDialog(actor);
    if (weapon === undefined) return;
    if (!weapon) { ui.notifications.warn("Keine Nahkampfwaffe ausgerüstet."); return; }

    const atk = getWeaponAT(actor, weapon);
    const atkResult = await rollD20Attack(atk, 0, weapon.name, actor);
    const notes = ["Ausfall: Abwehraktion wird Angriff ohne Malus. Gegner muss zweimal parieren."];
    let dmgResult = null;
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        dmgResult = await rollDamage(getWeaponDmg(weapon));
        if (target) {
            notes.push(...await applyAndReport(actor, target, { lePDamage: dmgResult.total }));
        } else {
            notes.push(_noTarget());
        }
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: weapon.name, atkResult, dmgResult, notes }));
}

async function executeGegenhalten(actor) {
    const sfName = "Gegenhalten";
    const weapon = await showWeaponSelectDialog(actor);
    if (weapon === undefined) return;
    if (!weapon) { ui.notifications.warn("Keine Nahkampfwaffe ausgerüstet."); return; }

    const atk = getWeaponAT(actor, weapon);
    const atkResult = await rollD20Attack(atk, 0, weapon.name, actor);
    const notes = ["Gegenhalten gilt als Abwehraktion (erfordert gegnerischen Angriff in dieser Runde)."];
    let dmgResult = null;
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        dmgResult = await rollDamage(getWeaponDmg(weapon));
        if (target) {
            notes.push(...await applyAndReport(actor, target, { lePDamage: dmgResult.total }));
        } else {
            notes.push(_noTarget());
        }
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: weapon.name, atkResult, dmgResult, notes }));
}

async function executeEntwaffnen(actor) {
    const sfName = "Entwaffnen";
    const weapon = await showWeaponSelectDialog(actor);
    if (weapon === undefined) return;
    if (!weapon) { ui.notifications.warn("Keine Nahkampfwaffe ausgerüstet."); return; }

    const atk = getWeaponAT(actor, weapon);
    const dialog = await showFixedMalusDialog(sfName, weapon.name, 8, "AT +8 erschwert – kein Schaden, nur Entwaffnung.");
    if (!dialog) return;
    const { malus, extra } = dialog;

    const atkResult = await rollD20Attack(atk, -(malus + extra), weapon.name, actor);
    const notes = [];
    if (atkResult.hit || atkResult.crit) {
        notes.push("Entwaffnung gelungen – Gegner verliert seine Waffe.");
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: weapon.name, atkResult, notes }));
}

async function executeGezielterStich(actor) {
    const sfName = "Gezielter Stich";
    const weapon = await showWeaponSelectDialog(actor);
    if (weapon === undefined) return;
    if (!weapon) { ui.notifications.warn("Keine Stichwaffe ausgerüstet."); return; }

    const atk = getWeaponAT(actor, weapon);
    const dialog = await showFixedMalusDialog(sfName, weapon.name, 4, "AT +4 erschwert. Umgeht Rüstung, erzeugt automatisch eine Wunde.");
    if (!dialog) return;
    const { malus, extra } = dialog;

    const atkResult = await rollD20Attack(atk, -(malus + extra), weapon.name, actor);
    const notes = ["Umgeht Rüstung. Erzeugt automatisch eine Wunde."];
    let dmgResult = null;
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        dmgResult = await rollDamage(getWeaponDmg(weapon));
        if (target) {
            notes.push(...await applyAndReport(actor, target, { lePDamage: dmgResult.total, ignoreRS: true }));
        } else {
            notes.push(_noTarget());
        }
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: weapon.name, atkResult, dmgResult, notes }));
}

async function executeBetaeubungsschlag(actor) {
    const sfName = "Betäubungsschlag";
    const weapon = await showWeaponSelectDialog(actor);
    if (weapon === undefined) return;
    if (!weapon) { ui.notifications.warn("Keine Waffe ausgerüstet."); return; }

    const atk = getWeaponAT(actor, weapon);
    const dialog = await showFixedMalusDialog(sfName, weapon.name, 4, "Stumpfer Schlag. Ziel: KO-Probe, sonst bewusstlos.");
    if (!dialog) return;
    const { malus, extra } = dialog;

    const atkResult = await rollD20Attack(atk, -(malus + extra), weapon.name, actor);
    const notes = [];
    const followUpButtons = [];
    if (atkResult.hit || atkResult.crit) {
        notes.push("Betäubungsschlag gelungen: Ziel muss KO-Probe ablegen, sonst bewusstlos (Dauer per Regel).");
        followUpButtons.push({
            label: "Gegner: KO-Probe (Betäubungsschlag)",
            action: "enemy-stat",
            params: { stat: "KO", statName: "KO-Probe" },
        });
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: weapon.name, atkResult, notes, followUpButtons }));
}

async function executeBinden(actor) {
    const sfName = "Binden";
    const weapon = await showWeaponSelectDialog(actor);
    if (weapon === undefined) return;
    if (!weapon) { ui.notifications.warn("Keine Nahkampfwaffe ausgerüstet."); return; }

    const pa = getWeaponPA(actor, weapon);
    const dialog = await showAnsageDialog(sfName, weapon.name, 10);
    if (!dialog) return;
    const { ansage } = dialog;

    const paResult = await rollD20Defense(pa, -ansage, weapon.name, actor);
    const notes = [];
    if (paResult.blocked || paResult.crit) {
        notes.push(`${ansage} Punkte als Bonus auf nächste AT gegen die gebundene Waffe.`);
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: weapon.name, paResult, notes }));
}

async function executeKlingensturm(actor) {
    const sfName = "Klingensturm";
    const weapon = await showWeaponSelectDialog(actor);
    if (weapon === undefined) return;
    if (!weapon) { ui.notifications.warn("Keine Nahkampfwaffe ausgerüstet."); return; }

    const atk = getWeaponAT(actor, weapon);
    const splitAtk = Math.floor(atk / 2);
    const notes = [`AT ${atk} gleichmäßig aufgeteilt: zwei Angriffe mit je AT ${splitAtk}.`];

    const atk1 = await rollD20Attack(splitAtk, 0, weapon.name, actor);
    const atk2 = await rollD20Attack(splitAtk, 0, weapon.name, actor);
    const target = getFirstTarget();
    let totalDmg = 0;

    if (atk1.hit || atk1.crit) {
        const d = await rollDamage(getWeaponDmg(weapon));
        totalDmg += d.total;
        notes.push(`Angriff 1: ${d.total} TP.`);
    } else {
        notes.push("Angriff 1: verfehlt.");
    }
    if (atk2.hit || atk2.crit) {
        const d = await rollDamage(getWeaponDmg(weapon));
        totalDmg += d.total;
        notes.push(`Angriff 2: ${d.total} TP.`);
    } else {
        notes.push("Angriff 2: verfehlt.");
    }

    if (totalDmg > 0) {
        if (target) {
            notes.push(...await applyAndReport(actor, target, { lePDamage: totalDmg }));
        } else {
            notes.push(_noTarget());
        }
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: weapon.name, atkResult: atk1, notes }));
}

async function executeKlingenwand(actor) {
    const sfName = "Klingenwand";
    const weapon = await showWeaponSelectDialog(actor);
    if (weapon === undefined) return;
    if (!weapon) { ui.notifications.warn("Keine Nahkampfwaffe ausgerüstet."); return; }

    const pa = getWeaponPA(actor, weapon);
    const splitPa = Math.floor(pa / 2);

    const pa1 = await rollD20Defense(splitPa, 0, weapon.name, actor);
    const pa2 = await rollD20Defense(splitPa, 0, weapon.name, actor);

    const notes = [
        `PA ${pa} gleichmäßig aufgeteilt: zwei Paraden mit je PA ${splitPa}.`,
        `Parade 1: ${pa1.blocked ? "✓ Gelungen" : "✗ Misslungen"}. Parade 2: ${pa2.blocked ? "✓ Gelungen" : "✗ Misslungen"}.`
    ];

    await postChatMessage(actor, buildChatContent({ sfName, skill: weapon.name, paResult: pa1, notes }));
}

async function executeDoppelangriff(actor) {
    const sfName = "Doppelangriff";
    const weapons = actor.items.filter(i =>
        i.type === "Gegenstand" && i.system?.type === "melee" && i.system?.worn === true
    );
    if (weapons.length < 2) {
        ui.notifications.warn("Doppelangriff erfordert zwei ausgerüstete Nahkampfwaffen.");
        return;
    }

    const [w1, w2] = weapons;
    const atk1 = await rollD20Attack(getWeaponAT(actor, w1), 0, w1.name, actor);
    const atk2 = await rollD20Attack(getWeaponAT(actor, w2), 0, w2.name, actor);
    const notes = ["Verteidiger benötigt zwei Abwehraktionen."];
    const target = getFirstTarget();
    let totalDmg = 0;

    if (atk1.hit || atk1.crit) {
        const d = await rollDamage(getWeaponDmg(w1));
        totalDmg += d.total;
        notes.push(`${w1.name}: ${d.total} TP.`);
    }
    if (atk2.hit || atk2.crit) {
        const d = await rollDamage(getWeaponDmg(w2));
        totalDmg += d.total;
        notes.push(`${w2.name}: ${d.total} TP.`);
    }

    if (totalDmg > 0) {
        if (target) {
            notes.push(...await applyAndReport(actor, target, { lePDamage: totalDmg }));
        } else {
            notes.push(_noTarget());
        }
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: `${w1.name} + ${w2.name}`, atkResult: atk1, notes }));
}

async function executeBefreiungsschlag(actor) {
    const sfName = "Befreiungsschlag";
    const weapon = await showWeaponSelectDialog(actor);
    if (weapon === undefined) return;
    if (!weapon) { ui.notifications.warn("Keine Nahkampfwaffe ausgerüstet."); return; }

    const atk = getWeaponAT(actor, weapon);
    const dialog = await showFixedMalusDialog(sfName, weapon.name, 4, "Rundumschlag gegen bis zu 3 Gegner.");
    if (!dialog) return;
    const { malus, extra } = dialog;

    const atkResult = await rollD20Attack(atk, -(malus + extra), weapon.name, actor);
    const notes = [];
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        const dmgResult = await rollDamage(getWeaponDmg(weapon));
        notes.push(`Schaden: ${dmgResult.total} TP (gilt für jeden getroffenen Gegner separat).`);
        if (target) {
            notes.push(...await applyAndReport(actor, target, { lePDamage: dmgResult.total }));
        } else {
            notes.push(_noTarget());
        }
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: weapon.name, atkResult, notes }));
}

async function executeFestnageln(actor) {
    const sfName = "Festnageln";
    const weapon = await showWeaponSelectDialog(actor);
    if (weapon === undefined) return;
    if (!weapon) { ui.notifications.warn("Keine geeignete Waffe ausgerüstet."); return; }

    const atk = getWeaponAT(actor, weapon);
    const dialog = await showFixedMalusDialog(sfName, weapon.name, 4, "Gegner am Boden fixieren.");
    if (!dialog) return;
    const { malus, extra } = dialog;

    const atkResult = await rollD20Attack(atk, -(malus + extra), weapon.name, actor);
    const notes = [];
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        if (target) {
            notes.push(...await applyAndReport(actor, target, { prone: true }));
        } else {
            notes.push(_noTarget());
        }
        notes.push("Gegner ist am Boden fixiert.");
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: weapon.name, atkResult, notes }));
}

async function executeSchildspalter(actor) {
    const sfName = "Schildspalter";
    const weapon = await showWeaponSelectDialog(actor);
    if (weapon === undefined) return;
    if (!weapon) { ui.notifications.warn("Keine Nahkampfwaffe ausgerüstet."); return; }

    const atk = getWeaponAT(actor, weapon);
    const dialog = await showFixedMalusDialog(sfName, weapon.name, 4, "Gezielter Angriff auf den gegnerischen Schild.");
    if (!dialog) return;
    const { malus, extra } = dialog;

    const atkResult = await rollD20Attack(atk, -(malus + extra), weapon.name, actor);
    const notes = [];
    if (atkResult.hit || atkResult.crit) {
        notes.push("Schildangriff gelungen – Schild ggf. beschädigt oder unbrauchbar (Meisterentscheid).");
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: weapon.name, atkResult, notes }));
}

async function executeUmreissen(actor) {
    const sfName = "Umreißen";
    const weapon = await showWeaponSelectDialog(actor);
    if (weapon === undefined) return;
    if (!weapon) { ui.notifications.warn("Keine geeignete Waffe ausgerüstet."); return; }

    const atk = getWeaponAT(actor, weapon);
    const dialog = await showFixedMalusDialog(sfName, weapon.name, 4, "Kein Schaden – Gegner zu Boden holen.");
    if (!dialog) return;
    const { malus, extra } = dialog;

    const atkResult = await rollD20Attack(atk, -(malus + extra), weapon.name, actor);
    const notes = [];
    const followUpButtons = [];
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        if (!target) notes.push(_noTarget());
        followUpButtons.push({
            label: "Gegner: KK-Probe (Sturz vermeiden)",
            action: "enemy-stat",
            params: {
                stat: "KK", statName: "KK-Probe",
                onFail: { prone: true, failNote: "KK-Probe misslungen – Gegner zu Boden." },
                successNote: "KK-Probe gelungen – kein Sturz.",
            },
        });
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: weapon.name, atkResult, notes, followUpButtons }));
}

async function executeWaffeZerbrechen(actor) {
    const sfName = "Waffe zerbrechen";
    const weapon = await showWeaponSelectDialog(actor);
    if (weapon === undefined) return;
    if (!weapon) { ui.notifications.warn("Keine Parierwaffe ausgerüstet."); return; }

    const pa = getWeaponPA(actor, weapon);
    const dialog = await showFixedMalusDialog(sfName, weapon.name, 4, "Parade: Klinge des Gegners zerbrechen.");
    if (!dialog) return;
    const { malus, extra } = dialog;

    const paResult = await rollD20Defense(pa, -(malus + extra), weapon.name, actor);
    const notes = [];
    if (paResult.blocked || paResult.crit) {
        notes.push("Parade gelungen – gegnerische Waffe ggf. zerbrochen (Meisterentscheid).");
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: weapon.name, paResult, notes }));
}

async function executeWindmuehle(actor) {
    const sfName = "Windmühle";
    const weapon = await showWeaponSelectDialog(actor);
    if (weapon === undefined) return;
    if (!weapon) { ui.notifications.warn("Keine Nahkampfwaffe ausgerüstet."); return; }

    const atk = getWeaponAT(actor, weapon);
    const atkResult = await rollD20Attack(atk, 0, weapon.name, actor);
    const notes = ["Windmühle: Gegnerischen Wuchtschlag in eigenen Angriff umgewandelt."];
    let dmgResult = null;
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        dmgResult = await rollDamage(getWeaponDmg(weapon));
        if (target) {
            notes.push(...await applyAndReport(actor, target, { lePDamage: dmgResult.total }));
        } else {
            notes.push(_noTarget());
        }
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: weapon.name, atkResult, dmgResult, notes }));
}

async function executeDefensiverKampfstil(actor) {
    await showInfoDialog("Defensiver Kampfstil",
        "Aktiviert: Angriffsaktion in zweite Abwehraktion umwandeln ohne den üblichen Malus von −4.\nAchtung: Absicht muss zu Beginn der Kampfrunde verkündet werden.");
}

// ─── Fernkampf-SFs ────────────────────────────────────────────────────────────

async function executeEisenhagel(actor) {
    const sfName = "Eisenhagel";
    const dialog = await showAnsageDialog(sfName, "Fernkampf", 20, [
        { label: "Anzahl Wurfgeschosse (2–5)", name: "count", default: 2, min: 2, max: 5 }
    ]);
    if (!dialog) return;
    const { ansage, count } = dialog;

    const baseMalus = count * 2;
    const notes = [`${count} Wurfgeschosse: −${baseMalus} AT. Alle treffen dasselbe Ziel.`];
    const fernkampfAT = actor.system.ATBasis?.value ?? 10;

    const atkResult = await rollD20Attack(fernkampfAT, -(baseMalus + ansage), "Fernkampf", actor);
    const target = getFirstTarget();

    if (atkResult.hit || atkResult.crit) {
        const dmgs = [];
        for (let i = 0; i < count; i++) {
            const d = await rollDamage("1W6+1");
            dmgs.push(d.total);
        }
        const totalDmg = dmgs.reduce((a, b) => a + b, 0);
        notes.push(`Einzelschäden: ${dmgs.join(", ")} = ${totalDmg} gesamt.`);
        if (target) {
            notes.push(...await applyAndReport(actor, target, { lePDamage: totalDmg }));
        } else {
            notes.push(_noTarget());
        }
    }

    await postChatMessage(actor, buildChatContent({ sfName, skill: "Fernkampf", atkResult, notes }));
}

// ─── Magische SFs ─────────────────────────────────────────────────────────────

async function executeAuraVerhuellen(actor) {
    const sfName = "Aura verhüllen";
    const dialog = await showAnsageDialog(sfName, "MU", 10);
    if (!dialog) return;
    const { ansage } = dialog;

    const muValue = actor.system.MU?.value ?? actor.system.eigenschaften?.mu?.value ?? 12;
    const statResult = await rollStat(muValue, -ansage, "MU", actor);

    const notes = statResult.success
        ? [`MU-Probe gelungen (${statResult.die} ≤ ${statResult.effectiveValue}): Aura verhüllt – Erkenntniszauber laufen ins Leere.`]
        : [`MU-Probe misslungen (${statResult.die} > ${statResult.effectiveValue}): Aura verhüllen fehlgeschlagen.`];

    await postChatMessage(actor, buildChatContent({ sfName, skill: "MU", notes }));
    // Aura verhüllen kostet 1W3 Erschöpfung (Regelwerk)
    await applyStatusEffectRoll(actor, "Erschöpfung", "1W3");
}

async function executeEisernerWille(actor) {
    await showInfoDialog("Eiserner Wille",
        "Aktiviert (2 Aktionen, 1 Erschöpfung): Für MU/2 Runden +3 MR (Stufe II: +7 MR) gegen Einfluss, Hellsicht, Herrschaft und Verständigung.\nWährend der Wirkungsdauer: alle Proben um −3 (Zaubern) bzw. −1 (Kampf/Eigenschaften) erschwert.");
    // Aktivierung kostet 1 Erschöpfung
    await applyStatusEffect(actor, "Erschöpfung", 1);
}

async function executeKraftkontrolle(actor) {
    await showInfoDialog("Kraftkontrolle",
        "Aktiviert: 1 AsP Einsparung beim nächsten Zauber oder Ritual.\nKosten: +1 Erschöpfung und +1 Aktion Zauberdauer.");
    // Jeder Einsatz kostet 1 Erschöpfung
    await applyStatusEffect(actor, "Erschöpfung", 1);
}

async function executeZauberkontrolleInfo(actor) {
    await showInfoDialog("Meisterliche Zauberkontrolle",
        "Stufe I: Erlaubt freiwilligen Abbruch in der letzten Spruchaktion. Kostet wie misslungener Spruch, gilt aber nicht als misslungen.\nStufe II: Spruch kann auch während der Wirkungsdauer unterdrückt und wieder aktiviert werden.");
}

async function executeZauberBereithaltenInfo(actor) {
    await showInfoDialog("Zauber bereithalten",
        "Erlaubt es, einen gewirkten Zauber bis zu MU Aktionen zurückzuhalten, bevor er losgeschickt wird.");
}

async function executeZauberUnterbrechenInfo(actor) {
    await postChatMessage(actor, buildChatContent({
        sfName: "Zauber unterbrechen",
        skill: "Selbstbeherrschung",
        notes: ["Zauberdauer unterbrochen für eine Aktion. SE-Probe zum Weiterzaubern erforderlich."],
        followUpButtons: [{
            label: "SE-Probe ablegen (Weiterzaubern)",
            action: "hero-se",
            params: {
                modifier: 0,
                successNote: "SE-Probe gelungen – Zauber kann fortgesetzt werden.",
                failNote:    "SE-Probe misslungen – Zauber abgebrochen, volle AsP-Kosten.",
            },
        }],
    }));
}

async function executeVerbotenePforten(actor) {
    await postChatMessage(actor, buildChatContent({
        sfName: "Verbotene Pforten",
        skill: "Selbstbeherrschung",
        notes: [
            "1 Aktion konzentrieren, dann SB-Probe+10 ablegen.",
            "Bei Erfolg: nächster Zauber kann AsP durch LeP (1:1) ersetzen.",
            "Zauberprobe −2. Kosten: 1W3 LeP extra + 1 Erschöpfung.",
        ],
        followUpButtons: [{
            label: "SB-Probe+10 ablegen",
            action: "hero-talent-probe",
            params: {
                talentName:   "Selbstbeherrschung",
                disadvantage: 10,
                erschoepfung: 1,   // 1 Erschöpfung bei Erfolg (Regelwerk)
                successNote: "SB-Probe gelungen – Verbotene Pforten aktiv: nächster Zauber kann LeP statt AsP kosten (1:1), Zauberprobe −2, +1W3 LeP + 1 Erschöpfung.",
                failNote:    "SB-Probe misslungen – Verbotene Pforten fehlgeschlagen.",
            },
        }],
    }));
}

async function executeAuraHeiligkeit(actor) {
    await postChatMessage(actor, buildChatContent({
        sfName: "Aura der Heiligkeit",
        skill: null,
        notes: [
            "Probe auf Liturgiekenntnis zum Aktivieren oder Deaktivieren.",
            "Aktive Aura kostet 1 KaP pro Spielrunde.",
            "Manifestation (Aureole, Licht, Stille u.ä.) liegt im Meisterentscheid.",
        ],
    }));
}

async function executeKarmalqueste(actor) {
    await postChatMessage(actor, buildChatContent({
        sfName: "Karmalqueste",
        skill: null,
        notes: [
            "2-wöchige Versenkungsübung + Mirakelprobe.",
            "Erfolg: +IN/4 + LkP*/10 KaP permanent (nicht-alveranisch: IN/5 + LkP*/10).",
            "Verbunden mit Entrückung in Höhe des Zehnfachen der gewonnenen KaP.",
            "Nur 1× pro Jahr durchführbar.",
        ],
    }));

    // Entrückung (Karmalqueste) ist noch nicht implementiert.
}

// ─── Mondsüchtig ─────────────────────────────────────────────────────────────

async function executeMondsüchtig(actor) {
    await postChatMessage(actor, buildChatContent({
        sfName: "Mondsüchtig",
        skill: "Selbstbeherrschung",
        notes: [
            "Selbstbeherrschungsprobe bei Mondaufgang.",
            "Bei Misserfolg: Verzückung je nach aktueller Mondphase.",
            "Jeder Punkt Verzückung gibt −1 auf alle Proben.",
        ],
        followUpButtons: [{
            label: "SE-Probe ablegen",
            action: "mondsuechtig-probe",
            params: {},
        }],
    }));
}

// ─── Dispatch table ───────────────────────────────────────────────────────────

export const SF_HANDLERS = {
    // Waffenlose Kampf
    gerade:            executeGerade,
    biss:              executeBiss,
    tritt:             executeTritt,
    hoher_tritt:       executeHoherTritt,
    handkante:         executeHandkante,
    kopfstoss:         executeKopfstoss,
    knie:              executeKnie,
    fussfeger:         executeFussfeger,
    schmetterschlag:   executeSchmetterschlag,
    doppelschlag:      executeDoppelschlag,
    sprungtritt:       executeSprungtritt,
    wuergegriff:       executeWuergegriff,
    wurf:              executeWurf,
    niederringen:      executeNiederringen,
    griff:             executeGriff,
    klammer:           executeKlammer,
    halten:            executeHalten,
    block:             executeBlock,
    kreuzblock:        executeKreuzblock,
    schwitzkasten:     executeSchwitzkasten,
    knaufschlag:       executeKnaufschlag,
    schwinger:         executeSchwinger,
    schwanzschlag:     executeSchwanzschlag,
    sprung:            executeSprung,
    schmutzige_tricks: executeSchmutzigeTricks,

    // Generelle Kampf
    wuchtschlag:          executeWuchtschlag,
    hammerschlag:         executeHammerschlag,
    sturmangriff:         executeSturmangriff,
    finte:                executeFinte,
    todesstos:            executeTodesstos,
    meisterparade:        executeMeisterparade,
    niederwerfen:         executeNiederwerfen,
    ausfall:              executeAusfall,
    gegenhalten:          executeGegenhalten,
    entwaffnen:           executeEntwaffnen,
    gezielter_stich:      executeGezielterStich,
    betaeubungsschlag:    executeBetaeubungsschlag,
    binden:               executeBinden,
    klingensturm:         executeKlingensturm,
    klingenwand:          executeKlingenwand,
    doppelangriff:        executeDoppelangriff,
    befreiungsschlag:     executeBefreiungsschlag,
    festnageln:           executeFestnageln,
    schildspalter:        executeSchildspalter,
    umreissen:            executeUmreissen,
    waffe_zerbrechen:     executeWaffeZerbrechen,
    windmuehle:           executeWindmuehle,
    defensiver_kampfstil: executeDefensiverKampfstil,

    // Fernkampf
    eisenhagel: executeEisenhagel,

    // Magie
    "aura_verhüllen":           executeAuraVerhuellen,
    eiserner_wille:             executeEisernerWille,
    kraftkontrolle:             executeKraftkontrolle,
    zauberkontrolle_info:       executeZauberkontrolleInfo,
    zauber_bereithalten_info:   executeZauberBereithaltenInfo,
    zauber_unterbrechen_info:   executeZauberUnterbrechenInfo,
    verbotene_pforten_info:     executeVerbotenePforten,

    // Karmal
    aura_heiligkeit_info:       executeAuraHeiligkeit,
    karmalqueste_info:          executeKarmalqueste,

    // VNA
    "mondsüchtig": executeMondsüchtig,
};
