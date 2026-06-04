// Dialog helpers for active SF execution.

export async function showAnsageDialog(sfName, skillName, maxAnsage = 20, extraFields = []) {
    return new Promise(resolve => {
        let extraHtml = "";
        for (const field of extraFields) {
            extraHtml += `
            <div class="form-group">
                <label>${field.label}</label>
                <input type="number" name="${field.name}" value="${field.default ?? 0}" min="${field.min ?? 0}" max="${field.max ?? 99}">
            </div>`;
        }
        new Dialog({
            title: `${sfName} – Ansage`,
            content: `
            <form>
                <div class="form-group">
                    <label>Ansage (Erschwernis auf ${skillName}):</label>
                    <input type="number" name="ansage" value="0" min="0" max="${maxAnsage}" autofocus>
                </div>
                <p class="hint">Die Ansage erschwert den Wurf und erhöht bei Erfolg die TP(A).</p>
                ${extraHtml}
            </form>`,
            buttons: {
                roll: {
                    label: "Würfeln",
                    callback: html => {
                        const form = html[0].querySelector("form");
                        const data = { ansage: parseInt(form.ansage.value) || 0 };
                        for (const field of extraFields) {
                            data[field.name] = parseInt(form[field.name]?.value) || 0;
                        }
                        resolve(data);
                    }
                },
                cancel: { label: "Abbrechen", callback: () => resolve(null) }
            },
            default: "roll",
            close: () => resolve(null)
        }).render(true);
    });
}

export async function showFixedMalusDialog(sfName, skillName, malus, description = "") {
    return new Promise(resolve => {
        new Dialog({
            title: sfName,
            content: `
            <p><b>Manöver:</b> ${sfName}</p>
            <p><b>Erschwernis:</b> −${malus} auf ${skillName}</p>
            ${description ? `<p>${description}</p>` : ""}
            <form>
                <div class="form-group">
                    <label>Zusätzliche Modifikation:</label>
                    <input type="number" name="extra" value="0" min="-20" max="20">
                </div>
            </form>`,
            buttons: {
                roll: {
                    label: "Würfeln",
                    callback: html => {
                        const extra = parseInt(html[0].querySelector("[name=extra]")?.value) || 0;
                        resolve({ malus, extra });
                    }
                },
                cancel: { label: "Abbrechen", callback: () => resolve(null) }
            },
            default: "roll",
            close: () => resolve(null)
        }).render(true);
    });
}

export async function showWeaponSelectDialog(actor) {
    const weapons = actor.items.filter(i =>
        i.type === "Gegenstand" && i.system?.type === "melee" && i.system?.worn === true
    );
    if (weapons.length === 0) return null;
    if (weapons.length === 1) return weapons[0];

    const CANCELLED = Symbol("cancelled");
    const result = await new Promise(resolve => {
        const options = weapons.map(w => `<option value="${w.id}">${w.name}</option>`).join("");
        new Dialog({
            title: "Waffe wählen",
            content: `<form><div class="form-group"><label>Waffe:</label><select name="weapon">${options}</select></div></form>`,
            buttons: {
                ok: {
                    label: "OK",
                    callback: html => {
                        const id = html[0].querySelector("[name=weapon]").value;
                        resolve(actor.items.get(id));
                    }
                },
                cancel: { label: "Abbrechen", callback: () => resolve(CANCELLED) }
            },
            default: "ok",
            close: () => resolve(CANCELLED)
        }).render(true);
    });
    if (result === CANCELLED) return undefined;
    return result;
}

export async function showInfoDialog(sfName, description) {
    return new Promise(resolve => {
        new Dialog({
            title: sfName,
            content: `<div class="gdsa-sf-info-dialog"><p>${description.replace(/\n/g, "<br>")}</p></div>`,
            buttons: {
                ok: { label: "Schließen", callback: () => resolve() }
            },
            default: "ok"
        }).render(true);
    });
}

export async function showGenderDialog() {
    return new Promise(resolve => {
        new Dialog({
            title: "Knie – Geschlecht des Ziels",
            content: `<form>
                <div class="form-group">
                    <label>Geschlecht des Ziels:</label>
                    <select name="gender">
                        <option value="male">Männlich (1W6+2 TP(A))</option>
                        <option value="female">Weiblich / Achaz (1W6 TP(A))</option>
                    </select>
                </div>
            </form>`,
            buttons: {
                ok: {
                    label: "OK",
                    callback: html => resolve(html[0].querySelector("[name=gender]").value)
                },
                cancel: { label: "Abbrechen", callback: () => resolve(null) }
            },
            default: "ok",
            close: () => resolve(null)
        }).render(true);
    });
}

export async function showAnsageSplitDialog(sfName, skillName) {
    return new Promise(resolve => {
        new Dialog({
            title: `${sfName} – Ansage aufteilen`,
            content: `
            <form>
                <p>Die Ansage kann auf zwei Effekte aufgeteilt werden.</p>
                <div class="form-group">
                    <label>Gesamte Ansage (Erschwernis auf ${skillName}):</label>
                    <input type="number" name="ansage" value="0" min="0" max="20" autofocus>
                </div>
            </form>`,
            buttons: {
                roll: {
                    label: "Würfeln",
                    callback: html => {
                        const ansage = parseInt(html[0].querySelector("[name=ansage]").value) || 0;
                        resolve({ ansage });
                    }
                },
                cancel: { label: "Abbrechen", callback: () => resolve(null) }
            },
            default: "roll",
            close: () => resolve(null)
        }).render(true);
    });
}

export async function showRSDialog() {
    return new Promise(resolve => {
        new Dialog({
            title: "Todesstoß – RS des Gegners",
            content: `<form>
                <div class="form-group">
                    <label>RS des Gegners (halber Wert wird zur Erschwernis addiert):</label>
                    <input type="number" name="rs" value="0" min="0" max="20" autofocus>
                </div>
                <div class="form-group">
                    <label>Zusätzliche Erschwernis:</label>
                    <input type="number" name="extra" value="0" min="-20" max="20">
                </div>
            </form>`,
            buttons: {
                roll: {
                    label: "Würfeln",
                    callback: html => {
                        const form = html[0].querySelector("form");
                        resolve({
                            rs: parseInt(form.rs.value) || 0,
                            extra: parseInt(form.extra.value) || 0
                        });
                    }
                },
                cancel: { label: "Abbrechen", callback: () => resolve(null) }
            },
            default: "roll",
            close: () => resolve(null)
        }).render(true);
    });
}

export async function showYesNoDialog(title, question) {
    return new Promise(resolve => {
        new Dialog({
            title,
            content: `<p>${question}</p>`,
            buttons: {
                yes: { label: "Ja", callback: () => resolve(true) },
                no:  { label: "Nein", callback: () => resolve(false) }
            },
            default: "no",
            close: () => resolve(null)
        }).render(true);
    });
}
