# Geano's GDSA QoL

An immersive Quality-of-Life, automation, and combat mechanics extension for **Das Schwarze Auge 4.1 (The Dark Eye)** on Foundry Virtual Tabletop, specifically tailored to integrate with and enhance the **GDSA** system.

This module bridges the gap between raw sheet entry and active tactical automation. It introduces interactive sheet tooltips, a modular roll engine, automated status effect tracking, dynamic combat maneuvers, and seamless resource deduction - all while strictly adhering to the complex DSA 4.1 ruleset.

---

## 🌟 Key Features

### ⚔️ Combat Maneuver & Sheet Automation
* **Interactive Active SFs:** Makes Special Forces (Sonderfertigkeiten) and combat Flaws (Nachteile) interactive on character sheets. Clicking them opens context-aware prompt dialogs (handling *Ansagen*, modifiers, and choices) and rolls them with automated outcomes.
* **Unarmed Combat (Waffenlos):** Complete mechanical automation for maneuvers like *Gerade*, *Tritt*, *Knie*, *Fußfeger*, *Doppelschlag*, and *Sprungtritt*. It handles complex branches such as gender-based damage variations, fallback *Gewandtheit* checks, and automated *Initiative* penalties.
* **Armed Maneuvers:** Fully supports tactical automation for *Wuchtschlag*, *Finte*, *Hammerschlag*, *Gezielter Stich* (bypasses Armour Protection), *Todesstoß* (prompts for target RS and drops wound thresholds), *Niederwerfen*, and *Doppelangriff*.

### 🛠️ Rule Adaptations & System Patching
* **"Liegend" Status Override:** Replaces native Foundry `prone` functionality with the rule-accurate DSA 4.1 condition **"Liegend"**. Applying it automatically inserts standard **−3 AT / −3 PA** modifiers, tracks falling initiative loss, and grants attackers situational combat bonuses (**+3 AT / +5 PA** against lying targets).
* **Enforced Encumbrance Limits:** Corrects a native system defect by automatically disabling the **+4 Initiative** bonus of *Kampfreflexe* during combat initiation if a character's Total Encumbrance (`gBEArmour`) exceeds 4.
* **Trait-Based Logic Patches:** Integrates unique scripting for *Tollpatsch* (triggers an immediate d20 fumble confirmation roll on an initial 19) as well as *Feste Matrix* and *Wilde Magie* (re-evaluates 3W20 spell dice configurations to accurately trigger or downgrade fumbles).

### 🔮 Automated Resource Trackers (AsP / KaP / LeP)
* **Scraping-Based Magic Tracking:** Automatically captures spell, liturgy, or miracle chat rolls to accurately deduct spent energy points.
* **Algorithmic Failure Scaling:** Natively calculates resource scaling based on roll outcomes:
  * **Spells:** Full cost on success, **½ cost** (rounded up) on failure, or **⅓ cost** on failure for traditions featuring a *Hexe* template representation.
  * **Liturgies:** Full cost on success, **⅕ cost** (minimum 1 KaP) on failure, and handles permanent burnout deductions (`pKaP`) for high-tier miracles (Grad V+).
* **Fatigue & Overexertion Matrix:** Automates the *Erschöpfung* and *Überlastung* rules. Fatigue counters accumulate up to a character's *Konstitution* threshold. Crossing the barrier resets fatigue and inflicts 1 point of overexertion (*Überlastung*), which dynamically drops the character's effective attributes via temporary stat modifiers.

### 📊 Dynamic Dialog Pre-Filling (VNA & Effects)
* **Phase Capture Interception:** Catches character sheet clicks to aggregate active advantages (*Vorteile*), disadvantages (*Nachteile*), or active status effects before rolling. It automatically populates modifier fields (`advantage`, `disadvantage`) across attributes, skills, spells, and dodges.
* **Rest Phase Recalculations:** Automatically enhances character sheet regeneration routines based on traits like *Schnelle Heilung* or *Astrale Regeneration*.
* **Visual Context Coloration:** Injected numeric adjustments color input dialog fields subtle green (for module pre-fills) or soft blue (informing the player that the native system already accounts for the active trait).

### 💬 Chat Log & NPC Sheet Enhancements
* **Collapsible Passive SF Reminders:** Appends a clean `<details>` drawer onto combat, attribute, or skill roll messages, surfacing text notes for relevant passive masteries like *Aufmerksamkeit*, *Blindkampf*, *Eisenarm*, or *Geländekunde*.
* **NPC Feature Overhaul:** Embeds a compact adjustment panel (Advantage, Disadvantage, and an automated *Passierschlag* toggle) inside monster/NPC character sheets.
* **NPC Spell Support:** Forces monster spell actions away from basic 1W20 rolls and routes them into standard 3W20 casting processes (`spell-Cast-Roll.hbs`), making them fully compatible with the automated AsP and Target Magic Resistance (MR) filtering pipelines.
* **Reload-Resilient Damage Application:** Persists damage and weapon attack structural contexts in message flags. The "Apply Damage" and fractional context buttons (½, 1.5, 2, Heal) function seamlessly even after a full browser reload.

---

## ⚙️ Module Settings

Every automated sub-pipeline can be toggled via the World System Settings panel:
* **Armour Protection Mode (*Rüstungsschutz-Modus*):** Toggle between subtracting a character's total weighted average protection (*Gesamt-RS*) or rolling a **1W20** to extract random hit-zone armor protection values (*Zonen-RS*).
* **Tooltips Toggle:** Turn on/off descriptive pop-ups for combat skills, advantages, disadvantages, and rituals.
* **Resource Visualization:** Choose whether automated AsP/KaP cost deductions are output as clear notifications inside combat logs or computed entirely silently (ideal for hiding enemy energy levels from players).
* **Follow-up Interaction Buttons:** Toggle the inline action buttons embedded within chat cards.

---

## 🎨 Interactive Tooltip System

Hovering over advantages, flaws, or specialized techniques renders a stylized pop-up:
* **Color-Coded Badges:** Automatically tints headers based on category (**Active**, **Passive**, **Advantage**, **Disadvantage**).
* **Tooltip Locking & Scrolling:** Middle-clicking (mousewheel click) pins a tooltip card in place at its current position. This shifts pointer tracking away from mouse movement, enabling GMs and players to interact with scrollbars on exceptionally long trait descriptions. Pressing `Escape` or clicking anywhere on the screen unpins the element.

---

## 💻 Tech Stack & Architecture

* **Framework:** FoundryVTT v12 ESModules architecture.
* **Design Pattern:** Functional modular design utilizing capture-phase listeners, DOM parsing, and target resolution pipelines.
* **Style Engine:** Contextual theme classes designed to look like native GDSA CSS layouts (`flawBox`, `rollFlawSuccess`, `rollnegMod`).

---

## 📄 License

This module is published under the MIT license, exclusively as a community utility extension for the FoundryVTT GDSA system framework. Content and rule logic are property of Ulisses Spiele.
