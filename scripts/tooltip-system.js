// Tooltip overlay for SF/VNA names in the character sheet.
// Middle-click on any tooltipped element pins the tooltip in place so it can be scrolled.

import { getSFData } from "./sf-database.js";
import { getVNAData } from "./vna-database.js";

let _tooltip = null;
let _pinned  = false;

function getTooltip() {
    if (_tooltip) return _tooltip;
    _tooltip = document.createElement("div");
    _tooltip.id = "gdsa-sf-tooltip";
    _tooltip.style.display = "none";
    document.body.appendChild(_tooltip);
    return _tooltip;
}

function _badgeFor(type) {
    switch (type) {
        case "active":      return { cls: "gdsa-tt-active",      label: "Aktiv"     };
        case "passive":     return { cls: "gdsa-tt-passive",     label: "Passiv"    };
        case "advantage":   return { cls: "gdsa-tt-advantage",   label: "Vorteil"   };
        case "disadvantage":return { cls: "gdsa-tt-disadvantage",label: "Nachteil"  };
        default:            return { cls: "gdsa-tt-passive",     label: "Passiv"    };
    }
}

function buildTooltipHTML(data, rawName) {
    const name = data.displayName ?? rawName;
    const { cls: badgeClass, label: badgeLabel } = _badgeFor(data.type);

    const descHtml = data.description
        ? `<div class="gdsa-tt-desc">${data.description.replace(/\n/g, "<br>")}</div>`
        : "";

    const noteHtml = data.passiveNote
        ? `<div class="gdsa-tt-passive-note">${data.passiveNote}</div>`
        : "";

    const hintHtml = data.type === "active" && data.execute
        ? `<div class="gdsa-tt-hint">Klicken zum Ausführen</div>`
        : "";

    // Show scroll hint when the description is long enough to overflow the tooltip
    const pinHintHtml = (data.description?.length ?? 0) > 300
        ? `<div class="gdsa-tt-hint">Mausrad-Klick: Feststellen &amp; Scrollen</div>`
        : "";

    return `
    <div class="gdsa-tt-header">
        <span class="gdsa-tt-name">${name}</span>
        <span class="gdsa-tt-badge ${badgeClass}">${badgeLabel}</span>
    </div>
    ${descHtml}${noteHtml}${hintHtml}${pinHintHtml}`;
}

function positionTooltip(tt, x, y) {
    const margin = 12;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    tt.style.left = "0";
    tt.style.top = "0";
    tt.style.display = "block";

    const w = tt.offsetWidth;
    const h = tt.offsetHeight;

    let left = x + margin;
    let top  = y + margin;

    if (left + w > vw - margin) left = x - w - margin;
    if (top  + h > vh - margin) top  = y - h - margin;
    if (left < margin) left = margin;
    if (top  < margin) top  = margin;

    tt.style.left = `${left}px`;
    tt.style.top  = `${top}px`;
}

function _unpinAndHide() {
    _pinned = false;
    const tt = getTooltip();
    tt.style.pointerEvents = "none";
    tt.classList.remove("gdsa-tt-pinned");
    tt.style.display = "none";
}

/**
 * Attach a hover tooltip to el.
 * @param {HTMLElement} el
 * @param {string}      rawName
 * @param {object}      [opts]
 * @param {boolean}     [opts.vnaFallback=false] - also check VNA database if SF lookup fails
 */
export function attachTooltip(el, rawName, { vnaFallback = false } = {}) {
    let data = getSFData(rawName);
    if (!data && vnaFallback) data = getVNAData(rawName);
    if (!data) return;

    el.addEventListener("mouseenter", e => {
        if (_pinned) return;
        const tt = getTooltip();
        tt.innerHTML = buildTooltipHTML(data, rawName);
        positionTooltip(tt, e.clientX, e.clientY);
    });

    el.addEventListener("mousemove", e => {
        if (_pinned) return;
        const tt = getTooltip();
        if (tt.style.display === "none") return;
        positionTooltip(tt, e.clientX, e.clientY);
    });

    el.addEventListener("mouseleave", () => {
        if (_pinned) return;
        const tt = getTooltip();
        tt.style.display = "none";
    });

    // Middle-click: pin the tooltip at the current cursor position so it can be scrolled
    el.addEventListener("mousedown", e => {
        if (e.button !== 1) return;
        e.preventDefault(); // prevent browser auto-scroll mode
        const tt = getTooltip();
        // Always show this element's tooltip and pin it (replaces any prior pin)
        tt.classList.remove("gdsa-tt-pinned");
        tt.innerHTML = buildTooltipHTML(data, rawName);
        positionTooltip(tt, e.clientX, e.clientY);
        _pinned = true;
        tt.style.pointerEvents = "auto";
        tt.classList.add("gdsa-tt-pinned");
    });
}

export function initGlobalTooltipHide() {
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") _unpinAndHide();
    });
    document.addEventListener("click", e => {
        const tt = getTooltip();
        // Clicks inside a pinned tooltip (e.g. scrollbar) do not dismiss it
        if (_pinned && tt.contains(e.target)) return;
        _unpinAndHide();
    });
}
