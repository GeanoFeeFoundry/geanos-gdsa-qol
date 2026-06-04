// RS (Rüstungsschutz) calculation helpers.
// Used by target-effects.js before applying LeP damage.

// DSA 4.1 hit zone table: 1d20 → body zone
const _ZONE_TABLE = [
    null,
    "head",      // 1
    "rightarm",  // 2
    "rightarm",  // 3
    "rightarm",  // 4
    "leftarm",   // 5
    "leftarm",   // 6
    "leftarm",   // 7
    "body",      // 8
    "body",      // 9
    "body",      // 10
    "body",      // 11
    "stomach",   // 12
    "stomach",   // 13
    "stomach",   // 14
    "stomach",   // 15
    "back",      // 16
    "rightleg",  // 17
    "rightleg",  // 18
    "leftleg",   // 19
    "leftleg",   // 20
];

const _ZONE_LABELS = {
    head:     "Kopf",
    body:     "Brust",
    back:     "Rücken",
    stomach:  "Bauch",
    rightarm: "rechter Arm",
    leftarm:  "linker Arm",
    rightleg: "rechtes Bein",
    leftleg:  "linkes Bein",
};

// Natural armor from the "Natürliche Rüstung" advantage item.
function _getNatArmour(actor) {
    const label = game.i18n?.localize("GDSA.advantage.natAmour") ?? "Natürliche Rüstung";
    const adv = actor.items.find(i => i.name?.includes(label));
    return adv ? (parseInt(adv.system?.trait?.value) || 0) : 0;
}

// GDSA items use type="Gegenstand" + system.type="armour", not type="armour".
function _wornArmor(actor) {
    return actor.items.filter(
        i => i.type === "Gegenstand" && i.system?.type === "armour" && i.system?.worn === true
    );
}

// Read zone RS from all worn armor pieces on an actor.
function _getZoneRS(actor, zone) {
    let rs = 0;
    for (const armor of _wornArmor(actor)) {
        rs += parseInt(armor.system.armour?.[zone]) || 0;
    }
    return rs + _getNatArmour(actor);
}

// Compute weighted average RS for PlayerCharakter (matches GDSA sheet gRSArmour).
const _ZONE_WEIGHTS = { head: 2, body: 4, back: 4, stomach: 4, rightarm: 1, leftarm: 1, rightleg: 2, leftleg: 2 };

function _computeGRSArmour(actor) {
    let n = 0;
    for (const armor of _wornArmor(actor)) {
        const a = armor.system.armour;
        if (!a) continue;
        for (const [zone, weight] of Object.entries(_ZONE_WEIGHTS)) {
            n += (parseInt(a[zone]) || 0) * weight;
        }
    }
    return Math.round(n / 20) + _getNatArmour(actor);
}

/**
 * Determine the RS to subtract from incoming damage.
 * @param {Actor}   actor     - the target actor
 * @param {boolean} ignoreRS  - true if this hit bypasses armor (e.g. Fulminictus)
 * @returns {{ rs: number, note: string }}
 */
export function getRSForDamage(actor, ignoreRS = false) {
    if (ignoreRS) {
        return { rs: 0, note: "RS umgangen" };
    }

    const mode = game.settings.get("geanos-gdsa-qol", "rsMode");
    const isPC = actor.type === "PlayerCharakter";

    if (mode === "zone" && isPC) {
        // PlayerCharakter: zone-specific RS from worn armor items.
        const roll  = Math.ceil(Math.random() * 20);
        const zone  = _ZONE_TABLE[roll] ?? "body";
        const label = _ZONE_LABELS[zone] ?? zone;
        const rs    = _getZoneRS(actor, zone);
        return { rs, note: `Trefferzone W20=${roll} (${label}): RS ${rs}` };
    }

    // Total mode for both types, OR zone mode for NonPlayer (no per-zone data).
    // PlayerCharakter: weighted average from items. NonPlayer: system.RS directly.
    const rs = isPC
        ? _computeGRSArmour(actor)
        : (parseInt(actor.system?.RS) || 0);
    return { rs, note: rs > 0 ? `RS ${rs} abgezogen` : null };
}
