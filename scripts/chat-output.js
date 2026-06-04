// Builds and posts chat messages for active SF results.
// Uses GDSA system CSS classes so output matches native system chat messages.

// ─── Internal: render one AT/PA/stat roll block ───────────────────────────────

function _renderRollBlock(result, label) {
    const isDefense = label === "Parade";
    // Stat rolls use .success; AT uses .hit; PA uses .blocked
    const isStat = result.success !== undefined && result.hit === undefined;
    const hit    = isStat ? result.success : (isDefense ? result.blocked : result.hit);

    let resultHtml;
    if      (!isStat && result.crit)   resultHtml = `<div class="rollFlawSuccess">Kritischer ${isDefense ? "Parade" : "Treffer"}!</div>`;
    else if (!isStat && result.fumble) resultHtml = `<div class="rollFlawFail">Patzer!</div>`;
    else if (hit)                      resultHtml = `<div class="rollFlawSuccess">${isStat ? "Gelungen" : (isDefense ? "Parade gelungen" : "Treffer!")}</div>`;
    else                               resultHtml = `<div class="rollFlawFail">${isStat ? "Misslungen" : (isDefense ? "Parade misslungen" : "Verfehlt")}</div>`;

    const modStr        = result.modifier ? ` (${result.modifier > 0 ? "+" : ""}${result.modifier})` : "";
    const confirmHtml   = result.confirmDie != null ? `<div class="dice">${result.confirmDie}</div>` : "";
    const overshootHtml = (hit && result.overshoot > 0)
        ? `<div class="rollFlawInfo">Überschreitung: ${result.overshoot}</div>` : "";

    return ``
        + `<div class="diceCol"><div class="dices2"><div class="dice">${result.die}</div>${confirmHtml}</div></div>`
        + `<div class="rollStatMod">${label}: ${result.effectiveValue}${modStr}</div>`
        + `<div class="dicefiller"></div>`
        + `<div class="dice-formula">${resultHtml}</div>`
        + overshootHtml
        + `<div class="dicefiller"></div>`;
}

// ─── Internal: render damage block ───────────────────────────────────────────

function _renderDmgBlock(dmgResult) {
    if (!dmgResult) return "";
    return ``
        + `<div class="diceCol2"><div class="dices2"><div class="diceD6">${dmgResult.total}</div></div></div>`
        + `<div class="rollStatMod">Schaden: ${dmgResult.formula}</div>`
        + `<div class="dicefiller"></div>`;
}

// ─── Internal: render follow-up action buttons ────────────────────────────────

function _renderFollowUpButtons(buttons) {
    if (!buttons?.length) return "";
    const btnHtml = buttons.map(b => {
        const params = JSON.stringify(b.params ?? {}).replace(/'/g, "&#39;");
        return `<button class="gdsa-followup-btn" data-action="${b.action}" data-params='${params}'>${b.label}</button>`;
    }).join("");
    return `<div class="gdsa-followup-buttons">${btnHtml}</div>`;
}

// ─── Public: build full chat message HTML ─────────────────────────────────────

export function buildChatContent({ sfName, skill, atkResult, dmgResult, paResult, statResult, details, notes, followUpButtons }) {
    const titleStr = skill ? `${sfName} (${skill})` : sfName;

    const rollHtml = [
        atkResult  ? _renderRollBlock(atkResult,  "Angriff") : "",
        paResult   ? _renderRollBlock(paResult,   "Parade")  : "",
        statResult ? _renderRollBlock(statResult, statResult.statName ?? "Probe") : "",
    ].join("");

    const dmgHtml      = _renderDmgBlock(dmgResult);
    const followUpHtml = _renderFollowUpButtons(followUpButtons);

    const notesHtml = notes?.length
        ? `<div class="gdsa-sf-notes">${notes.map(n => `<div class="gdsa-sf-note">${n}</div>`).join("")}</div><div class="dicefiller"></div>`
        : "";

    const detailsHtml = buildDetailsSection(details ?? []);

    return `<div class="GDSA chat message"><div class="flawBox">`
         + `<div class="flawName">${titleStr}</div>`
         + `<div class="dicefiller"></div>`
         + rollHtml
         + dmgHtml
         + notesHtml
         + followUpHtml
         + detailsHtml
         + `</div></div>`;
}

// ─── Public: build collapsible Details section ───────────────────────────────

export function buildDetailsSection(details) {
    if (!details?.length) return "";
    const rows = details.map(d =>
        `<div class="gdsa-detail-entry"><span class="gdsa-detail-label">${d.label}:</span> ${d.value}</div>`
    ).join("");
    return `<details class="gdsa-details"><summary>Details</summary><div class="gdsa-details-body">${rows}</div></details>`;
}

// ─── Public: post to chat ─────────────────────────────────────────────────────

export async function postChatMessage(actor, content) {
    const rollMode = game.settings.get("core", "rollMode");
    const chatData = {
        content,
        speaker: ChatMessage.getSpeaker({ actor }),
        type: CONST.CHAT_MESSAGE_TYPES?.OTHER ?? 0
    };
    if (rollMode === "gmroll" || rollMode === "blindroll") {
        chatData.whisper = ChatMessage.getWhisperRecipients("GM");
    }
    if (rollMode === "selfroll") {
        chatData.whisper = [game.user.id];
    }
    return ChatMessage.create(chatData);
}
