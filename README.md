# Geano's GDSA QoL

> ⚔️ **Immersive Automation & Tactical Mechanics for Das Schwarze Auge 4.1.**  
> A comprehensive Quality-of-Life and mechanics extension explicitly tailored to integrate with and enhance Goody's **GDSA** core system framework on FoundryVTT.

| | |
| :--- | :--- |
| 📦 **Module ID:** | geanos-gdsa-qol |
| ⚙️ **Compatibility:** | FoundryVTT v12+ |
| 🧬 **System Req:** | **[Goody's DSA 4.1 System](https://github.com/Thegoodmen/Goodys-DSA-4.1-System)** |

---

## ⚡ Quick Start & Installation

Paste this manifest URL directly into the FoundryVTT module installer:

`https://github.com/GeanoFeeFoundry/geanos-gdsa-qol/releases/download/latest/module.json`

---

## 🌟 Key Features

### ⚔️ Combat Maneuver & Sheet Automation
*   **Interactive Active SFs:** Makes Special Forces (Sonderfertigkeiten) and combat Flaws (Nachteile) clickable directly on character sheets, spawning context-aware prompt dialogs for Ansagen, modifiers, and tactical choices.
*   **Unarmed Combat (Waffenlos):** Complete mechanical automation for specialized techniques (Gerade, Tritt, Knie, Fußfeger, Doppelschlag, Sprungtritt) including gender-based damage scaling, fallback Gewandtheit checks, and automated Initiative penalties.
*   **Armed Tactical Maneuvers:** Native math and mechanical routing for advanced combat options: Wuchtschlag, Finte, Hammerschlag, Gezielter Stich (bypasses RS), Todesstoß (drops wound thresholds), Niederwerfen, and Doppelangriff.

### 🛠️ Rule Adaptations & System Patching
*   **"Liegend" Status Override:** Replaces native Foundry "prone" behavior with rule-accurate DSA 4.1 physics. Automatically applies standard −3 AT / −3 PA modifiers, tracks falling initiative loss, and grants attackers situational combat bonuses (+3 AT / +5 PA against lying targets).
*   **Enforced Encumbrance Limits:** Corrects a native system defect by automatically disabling the +4 Initiative bonus of Kampfreflexe during combat initiation if a character's Total Encumbrance (gBEArmour) exceeds 4.
*   **Trait-Based Logic Patches:** Integrates custom scripts for Tollpatsch (immediate d20 fumble confirmation roll on an initial 19) as well as Feste Matrix and Wilde Magie (re-evaluates 3W20 spell dice configurations to accurately trigger or downgrade fumbles).

### 🔮 Automated Resource Trackers (AsP / KaP / LeP)
*   **Scraping-Based Magic Tracking:** Automatically captures spell, liturgy, or miracle chat rolls to accurately deduct spent energy points from the actor sheet.
*   **Algorithmic Failure Scaling:** Natively calculates resource scaling based on rule outcomes:
    *   *Spells:* Full cost on success, ½ cost (rounded up) on failure, or ⅓ cost on failure for traditions featuring a Hexe template representation.
    *   *Liturgies:* Full cost on success, ⅕ cost (minimum 1 KaP) on failure, including automatic permanent burnout deductions (pKaP) for high-tier miracles (Grad V+).
*   **Fatigue & Overexertion Matrix:** Automates the Erschöpfung and Überlastung rulesets. Fatigue counters accumulate up to the Konstitution threshold; crossing the barrier resets fatigue and inflicts overexertion (Überlastung), dynamically degrading effective attributes via temporary stat modifiers.

### 📊 Dynamic Dialog Pre-Filling (VNA & Effects)
*   **Phase Capture Interception:** Catches character sheet clicks to aggregate active advantages (Vorteile), flaws (Nachteile), or active status effects before the roll window opens, pre-populating modifiers across attributes, skills, and combat values.
*   **Rest Phase Recalculations:** Automatically enhances character sheet regeneration routines based on traits like Schnelle Heilung or Astrale Regeneration.
*   **Visual Context Coloration:** Injected numeric adjustments color input dialog fields subtle green (for module pre-fills) or soft blue (informing the player that the native core system already accounts for the active trait).

### 💬 Chat Log & NPC Sheet Enhancements
*   **Collapsible Passive SF Reminders:** Appends a clean HTML disclosure drawer onto chat messages, surfacing passive reminders for masteries like Aufmerksamkeit, Blindkampf, Eisenarm, or Geländekunde when relevant.
*   **NPC Feature Overhaul:** Embeds a compact adjustment panel (Advantage, Disadvantage, and an automated Passierschlag toggle) inside monster/NPC sheets.
*   **NPC Spell Support:** Forces monster spell actions away from basic 1W20 rolls and routes them into standard 3W20 casting processes, making them fully compatible with the automated AsP and Target Magic Resistance (MR) filtering pipelines.
*   **Reload-Resilient Flags:** Persists damage and weapon attack structural contexts in message flags, ensuring "Apply Damage" and fractional context buttons (½, 1.5, 2, Heal) function seamlessly even after a full browser reload.

---

## ⚙️ Module Settings

Every automated pipeline can be toggled via the World System Settings panel:
*   **Armour Protection Mode (Rüstungsschutz-Modus):** Toggle between subtracting a character's total weighted average protection (Gesamt-RS) or rolling a 1W20 to extract hit-zone armor protection values (Zonen-RS).
*   **Tooltips Toggle:** Global toggle for descriptive pop-ups for combat skills, advantages, disadvantages, and rituals.
*   **Resource Visualization:** Choose whether automated AsP/KaP cost deductions are output as clear notifications inside combat logs or computed entirely silently (ideal for hiding enemy energy levels from players).

---

## 🎨 Interactive Tooltip System

Hovering over advantages, flaws, or specialized techniques renders a stylized pop-up:
*   **Color-Coded Badges:** Automatically tints headers based on category (Active, Passive, Advantage, Disadvantage).
*   **Tooltip Locking:** Middle-clicking (mousewheel click) pins a tooltip card in place, shifting pointer tracking away from mouse movement. This enables GMs and players to interact with scrollbars on exceptionally long trait descriptions. Press Escape or click anywhere to unpin.

---

## 📄 License

This module is published under the MIT license, exclusively as a community utility extension for the FoundryVTT GDSA system framework. Content and rule logic are property of Ulisses Spiele.
