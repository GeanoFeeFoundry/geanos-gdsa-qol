// DSA 4.1 dice mechanics.
// AT/PA: roll 1d20, success if die ≤ effectiveValue.
// Die = 1 → crit check (confirm with another roll ≤ effectiveValue).
// Die = 20 → fumble check (confirm with another roll > effectiveValue).
// Tollpatsch: die = 19 also triggers fumble check (same confirmation logic).

async function _d20() {
    const r = await new Roll("1d20").evaluate();
    return r.total;
}

// Returns true if the actor has the Tollpatsch disadvantage.
// Uses the GDSA localization key "GDSA.flaws.goofy" with "Tollpatsch" as fallback.
function _hasTollpatsch(actor) {
    if (!actor) return false;
    const localName = game.i18n?.localize("GDSA.flaws.goofy") ?? "Tollpatsch";
    return actor.items?.some(i =>
        i.type === "Template" && (i.name === localName || i.name === "Tollpatsch")
    ) ?? false;
}

// ─── Attack roll ─────────────────────────────────────────────────────────────
// Returns {hit, crit, fumble, overshoot, die, confirmDie, effectiveValue, modifier, atkValue}

export async function rollD20Attack(atkValue, modifier, label, actor) {
    const effectiveValue = atkValue + modifier;
    const die = await _d20();

    let hit = die <= effectiveValue;
    let crit = false;
    let fumble = false;
    let confirmDie = null;

    const isGoofy = _hasTollpatsch(actor);

    if (die === 1) {
        confirmDie = await _d20();
        crit = confirmDie <= effectiveValue;
        hit = true;
    } else if (die === 20 || (isGoofy && die === 19)) {
        confirmDie = await _d20();
        fumble = confirmDie > effectiveValue;
        if (fumble) hit = false;
    }

    const overshoot = hit ? Math.max(0, effectiveValue - die) : 0;
    return { hit, crit, fumble, overshoot, die, confirmDie, effectiveValue, modifier, atkValue };
}

// ─── Defense roll ─────────────────────────────────────────────────────────────
// Returns {blocked, crit, fumble, overshoot, die, confirmDie, effectiveValue, modifier, paValue}

export async function rollD20Defense(paValue, modifier, label, actor) {
    const effectiveValue = paValue + modifier;
    const die = await _d20();

    let blocked = die <= effectiveValue;
    let crit = false;
    let fumble = false;
    let confirmDie = null;

    const isGoofy = _hasTollpatsch(actor);

    if (die === 1) {
        confirmDie = await _d20();
        crit = confirmDie <= effectiveValue;
        blocked = true;
    } else if (die === 20 || (isGoofy && die === 19)) {
        confirmDie = await _d20();
        fumble = confirmDie > effectiveValue;
        if (fumble) blocked = false;
    }

    const overshoot = blocked ? Math.max(0, effectiveValue - die) : 0;
    return { blocked, crit, fumble, overshoot, die, confirmDie, effectiveValue, modifier, paValue };
}

// ─── Stat roll ────────────────────────────────────────────────────────────────
// Returns {success, overshoot, die, effectiveValue}

export async function rollStat(statValue, modifier, label, actor) {
    const effectiveValue = statValue + modifier;
    const die = await _d20();
    const success = die <= effectiveValue;
    const overshoot = success ? effectiveValue - die : 0;
    return { success, overshoot, die, effectiveValue };
}

// ─── Talent probe (3W20) ─────────────────────────────────────────────────────
// DSA 4.1: Roll 3d20, one against each attribute. Each die that exceeds its
// attribute contributes deficit = die − attribute to the total deficit.
// TaP* = taw + modifier − deficit.  Success if TaP* ≥ 0.
// modifier is negative for difficulty (e.g. −10 for SB+10 Erschwernis).
// Returns {success, tap, deficit, dice, attrs, taw, modifier}

export async function rollTalentProbe(taw, att1, att2, att3, modifier) {
    const dice  = await Promise.all([_d20(), _d20(), _d20()]);
    const attrs = [att1, att2, att3];
    let deficit = 0;
    for (let i = 0; i < 3; i++) {
        if (dice[i] > attrs[i]) deficit += dice[i] - attrs[i];
    }
    const tap     = taw + modifier - deficit;
    const success = tap >= 0;
    return { success, tap, deficit, dice, attrs, taw, modifier };
}

// Foundry's Roll parser requires "d" as the dice operator; GDSA uses German "W".
function _toFoundryFormula(f) { return f.replace(/[Ww]/g, "d"); }

// ─── Damage roll ─────────────────────────────────────────────────────────────
// Returns {total, formula}

export async function rollDamage(formula, bonus = 0) {
    const fullFormula = bonus > 0
        ? `${formula} + ${bonus}`
        : bonus < 0
        ? `${formula} - ${Math.abs(bonus)}`
        : formula;
    const r = await new Roll(_toFoundryFormula(fullFormula)).evaluate();
    return { total: Math.max(0, r.total), formula: fullFormula };
}

// ─── Generic dice roll ────────────────────────────────────────────────────────
// Returns {total, formula}

export async function rollDice(formula) {
    const r = await new Roll(_toFoundryFormula(formula)).evaluate();
    return { total: r.total, formula };
}
