// SF database. type: "passive"|"active". passiveNote shown in Details on relevant rolls.
// execute: key matching SF_HANDLERS dispatch table.

export const SF_DATABASE = {

    // ===========================
    // GENERELLE KAMPF-SFs
    // ===========================

    "Aufmerksamkeit": {
        type: "passive", category: "combat",
        description: "Ein Held mit dieser Fähigkeit benötigt nur eine Aktion (anstatt zweier), um sich im Kampf Orientierung zu verschaffen und seinen INI-Wert auf das mögliche Maximum anzuheben; er muss hierzu auch keine IN-Probe ablegen.\nDie IN-Probe, um Überraschung zu verhindern oder bei einem Hinterhalt schnell zu reagieren, ist von vornherein um 4 Punkte erleichtert. Ein Held mit Aufmerksamkeit hat genügend Übersicht, um sich nicht in Reichweite eines Passierschlags zu bringen oder diesen vorauszuahnen: Gegen ihn ist ein Passierschlag um zusätzliche 4 Punkte erschwert.\nAußerdem muss er nicht zu Beginn einer Kampfrunde ankündigen, ob er eine Angriffsaktion in eine Abwehraktion umwandeln will.",
        passiveNote: "IN-Probe gegen Überraschung um 4 erleichtert. Passierschlag gegen diesen Kämpfer +4 erschwert."
    },

    "Ausfall": {
        type: "active", category: "combat", skill: "weapon",
        description: "Ermöglicht dem Kämpfer, das gleichnamige Manöver durchzuführen: Er wandelt seine Abwehraktion ohne Malus in eine Angriffsaktion um und zwingt den Gegner zum umgekehrten Verhalten (dieser muss also zweimal parieren); dabei treibt er ihn langsam zurück.",
        execute: "ausfall"
    },

    "Ausweichen I": {
        type: "passive", category: "combat",
        description: "Ein Held mit dieser Sonderfertigkeit hat sich auf seine Beweglichkeit im Kampf konzentriert und ist in der Lage, seine Ausweichen-Proben mit 3 Punkten Bonus abzulegen; dies gilt auch für das Ausweichen vor Fernkampf- oder Sturmangriffen.",
        passiveNote: "+3 auf Ausweichen-Proben (bereits im System eingerechnet)."
    },

    "Ausweichen II": {
        type: "passive", category: "combat",
        description: "Wie Ausweichen I, jedoch mit 6 Punkten Bonus auf Ausweichen-Proben.",
        passiveNote: "+6 auf Ausweichen-Proben (bereits im System eingerechnet)."
    },

    "Ausweichen III": {
        type: "passive", category: "combat",
        description: "Wie Ausweichen I, jedoch mit 9 Punkten Bonus auf Ausweichen-Proben.",
        passiveNote: "+9 auf Ausweichen-Proben (bereits im System eingerechnet)."
    },

    "Befreiungsschlag": {
        type: "active", category: "combat", skill: "weapon",
        description: "Ermöglicht das gleichnamige Manöver: einen Rundumschlag gegen bis zu drei Gegner, um diese zurückzudrängen und sich Raum zu verschaffen.",
        execute: "befreiungsschlag"
    },

    "Beidhändiger Kampf I": {
        type: "passive", category: "combat",
        description: "Diese Fertigkeit gibt einem Kämpfer bessere Kontrolle über sämtliche Kampf-Handlungen mit der 'falschen' Hand. Sie vermindert die Abzüge im Kampf mit links (bzw. rechts für Linkshänder) auf –3/–3 und erlaubt zusätzliche Manöver sowie die Nutzung des KK-Bonus auf die TP für die linke Hand.",
        passiveNote: "Abzüge im Kampf mit der falschen Hand: nur –3/–3 (statt –6/–6)."
    },

    "Beidhändiger Kampf II": {
        type: "passive", category: "combat",
        description: "Der Erwerb dieser Sonderfertigkeit bedeutet, dass der Held die Perfektion im Linkshändigen Kampf erreicht hat und keinerlei Abzüge auf AT und PA bei der Verwendung der falschen Hand hinnehmen muss. Diese SF erlaubt einige zusätzliche Manöver und stellt eine zusätzliche Angriffs- oder Abwehr-Aktion pro Kampfrunde mit der Zweitwaffe zur Verfügung.",
        passiveNote: "Keine Abzüge auf AT/PA mit der falschen Hand. Zusätzliche AT oder PA mit Zweitwaffe pro Runde. (System: zweite Angriffsaktion im Kampf automatisch freigeschaltet.)"
    },

    "Betäubungsschlag": {
        type: "active", category: "combat", skill: "weapon",
        description: "Diese Sonderfertigkeit ermöglicht es einem Kämpfer, einen sehr gezielten Schlag mit der stumpfen Seite seiner Waffe – das Manöver Betäubungsschlag – auszuführen und den Gegner damit möglicherweise sofort ins Reich der Träume zu schicken. Außerdem kann er die Erschwernisse bei einem Stumpfen Schlag halbieren.",
        execute: "betaeubungsschlag"
    },

    "Binden": {
        type: "active", category: "combat", skill: "weapon",
        description: "Mit dieser Sonderfertigkeit kann ein Kämpfer mittels des gleichnamigen Manövers bei seiner Parade die gegnerische Waffe behindern und somit die nächste gegnerische PA erschweren und die eigene AT erleichtern.",
        execute: "binden"
    },

    "Blindkampf": {
        type: "passive", category: "combat",
        description: "Ein Nahkämpfer mit dieser seltenen Sonderfertigkeit ist in der Lage, auch mit verbundenen Augen, in völliger Dunkelheit, gegen Unsichtbare oder gar bei Verlust des Augenlichts mit nur geringen Einbußen zu kämpfen: Seine Abzüge auf AT/PA durch schlechte Sicht betragen maximal –2/–2.",
        passiveNote: "AT/PA-Abzüge durch schlechte Sicht maximal –2/–2. IN-Probe bei Überraschung um 2 erleichtert."
    },

    "Defensiver Kampfstil": {
        type: "active", category: "combat", skill: "weapon",
        description: "Diese Sonderfertigkeit ermöglicht das Umwandeln einer Angriffs- in eine Abwehraktion ohne den beim Umwandeln üblichen Malus von 4 Punkten, so dass dem Kämpfer damit zwei Abwehraktionen pro Kampfrunde zur Verfügung stehen.",
        execute: "defensiver_kampfstil"
    },

    "Doppelangriff": {
        type: "active", category: "combat", skill: "weapon",
        description: "Diese Sonderfertigkeit erlaubt das gleichzeitige Zuschlagen mit zwei (möglichst ähnlichen) Nahkampfwaffen gegen einen einzigen Gegner in einem einzigen Manöver. Der Verteidiger muss zwei Abwehraktionen aufwenden, um beide Angriffe abzuwehren.",
        execute: "doppelangriff"
    },

    "Eisenarm": {
        type: "passive", category: "combat",
        description: "Der Held hat gelernt, so in eine gegnerische Attacke hineinzugehen, dass er auch ohne Waffe einen bewaffneten Angriff parieren kann, ohne sich zu verletzen. Er erleidet durch die Parade nur TP(A) anstelle von TP. Er ist zudem in der Lage, gegen Bewaffnete die Manöver Binden und Entwaffnen einzusetzen. Ein Kämpfer mit Eisenarm erleidet keine Abzüge auf seinen INI-Modifikator beim Kampf gegen Bewaffnete.",
        passiveNote: "Parade gegen bewaffnete Angriffe erlaubt (nur TP(A) statt TP). Kein INI-Malus gegen Bewaffnete."
    },

    "Entwaffnen": {
        type: "active", category: "combat", skill: "weapon",
        description: "Ermöglicht einen Entwaffnungsangriff gegen die Waffe eines Gegners: entweder mit einer um 8 Punkte erschwerten Angriffsaktion oder mit einer entsprechend erschwerten Abwehraktion (was die zusätzliche Sonderfertigkeit Meisterparade oder eine Parierwaffe und die Sonderfertigkeit Parierwaffen I verlangt).",
        execute: "entwaffnen"
    },

    "Festnageln": {
        type: "active", category: "combat", skill: "weapon",
        description: "Ein Kämpfer mit dieser Sonderfertigkeit kann mit einer entsprechend geeigneten Waffe das gleichnamige Manöver ausführen und damit einen Gegner am Boden halten.",
        execute: "festnageln"
    },

    "Finte": {
        type: "active", category: "combat", skill: "weapon",
        description: "Diese Sonderfertigkeit ermöglicht es dem Kämpfer, Finten zu schlagen, also sich selbst den AT-Wurf zu erschweren, um dadurch die gegnerische PA um den gleichen Betrag zu senken. Finten sind auch ohne die Kenntnis dieser SF möglich, dann jedoch weniger effektiv.",
        execute: "finte"
    },

    "Formation": {
        type: "passive", category: "combat",
        description: "Kämpfer, die diese Sonderfertigkeit erlernt haben, sind in der Lage, in einer Formation von mindestens drei Personen ihre Angriffs- und Abwehrfähigkeiten mit ihren Kameraden zu koordinieren.",
        passiveNote: "Formationskampf möglich: AT/PA-Boni mit mind. 3 Mitkämpfern mit Formation."
    },

    "Gegenhalten": {
        type: "active", category: "combat", skill: "weapon",
        description: "Kenntnis dieser Sonderfertigkeit ermöglicht einen Gegenangriff in einen feindlichen Angriff hinein. Dieses Manöver gilt als Abwehraktion, erfordert also einen gegnerischen Angriff.",
        execute: "gegenhalten"
    },

    "Gezielter Stich": {
        type: "active", category: "combat", skill: "weapon",
        description: "Erlaubt einen gezielten Angriff auf einen wenig geschützten Bereich des Gegners, der die Rüstung umgeht, leichter Wunden erzeugt als normale Schläge und automatisch eine Wunde anrichtet.",
        execute: "gezielter_stich"
    },

    "Hammerschlag": {
        type: "active", category: "combat", skill: "weapon",
        description: "Erlaubt ein Alles-oder-Nichts-Manöver, um einen Kampf mit einem Schlag zu beenden: Bei gelungener, um 8 Punkte erschwerter Attacke und misslungener gegnerischer Abwehr werden die TP deutlich erhöht.",
        execute: "hammerschlag"
    },

    "Halbschwert": {
        type: "passive", category: "combat",
        description: "Diese Technik erlaubt es einem Kämpfer, mit bestimmten Waffen in einer kürzeren Distanzklasse zu kämpfen als für die Waffe üblich, und dabei nur geringere Abzüge auf AT- und PA-Werte hinnehmen zu müssen. Außerdem kann er in der kürzeren Distanzklasse auch bestimmte Manöver wie den Defensiven Kampf anwenden.",
        passiveNote: "Kämpfen in kürzerer DK als üblich mit reduzierten AT/PA-Abzügen. Defensiver Kampf und weitere Manöver in kürzerer DK möglich."
    },

    "Improvisierte Waffe": {
        type: "passive", category: "combat",
        description: "Mit dieser Sonderfertigkeit kann der Kämpfer alltägliche Gegenstände (Stühle, Fackeln, Flaschen u.ä.) ohne die üblichen Abzüge von –3 auf AT und –3 auf PA als Waffen einsetzen. Die Trefferpunkte des Gegenstands werden anhand seiner Beschaffenheit festgelegt.",
        passiveNote: "Keine AT/PA-Abzüge (–3/–3) bei improvisierten Waffen."
    },

    "Kampf im Wasser": {
        type: "passive", category: "combat",
        description: "Einige Kämpfer sind in der Lage, den unsicheren Grund, die Einschränkungen der Bewegungen und den Wellengang beim Kampf im Wasser teilweise auszugleichen. Sie erleiden nur die Hälfte der Abzüge.",
        passiveNote: "Kampf im Wasser: nur halbe AT/PA-Abzüge."
    },

    "Kampfgespür": {
        type: "passive", category: "combat",
        description: "Ein Kämpfer mit Kampfgespür bewegt sich mit schier traumwandlerischer Sicherheit über das Kampffeld: Sein Initiative-Basiswert steigt um 2 Punkte, und ein Passierschlag gegen ihn ist um 2 Punkte erschwert. Er kann jederzeit Angriffs- in Abwehraktionen umwandeln und umgekehrt.",
        passiveNote: "INI-Basis +2. Passierschlag gegen ihn zusätzlich +2 erschwert. (System: INI-Basiswert automatisch eingerechnet.)"
    },

    "Kampfreflexe": {
        type: "passive", category: "combat",
        description: "Ein Kämpfer mit dieser Fähigkeit hat einen um 4 Punkte erhöhten Initiative-Wert und ist daher im Kampf häufig als erster an der Reihe.",
        passiveNote: "INI-Basis +4 (nur bei BE ≤ 4). (System: +4 eingerechnet; Modul korrigiert auf 0 bei BE > 4.)"
    },

    "Klingensturm": {
        type: "active", category: "combat", skill: "weapon",
        description: "Ein Kämpfer mit dieser Sonderfertigkeit ist in der Lage, seinen AT-Wert gleichmäßig aufzuspalten und so zwei Angriffe mit niedrigeren AT-Werten durchzuführen.",
        execute: "klingensturm"
    },

    "Klingenwand": {
        type: "active", category: "combat", skill: "weapon",
        description: "Ein Kämpfer mit dieser Fähigkeit ist in der Lage, seinen PA-Wert gleichmäßig aufzuspalten und so gegen zwei Angriffe einzusetzen.",
        execute: "klingenwand"
    },

    "Klingentänzer": {
        type: "passive", category: "combat",
        description: "Diese Sonderfertigkeit repräsentiert den typischen Kampfstil des Klingentänzers: dynamisch, schnell und unberechenbar. Der Klingentänzer würfelt seine Initiative nicht mit 1W6, sondern mit 2W6, was ihm einen deutlich höheren und weniger vorhersehbaren INI-Startwert verleiht. Voraussetzungen: GE 16, Kampfreflexe, AT 12 mit einer Einhandwaffe.",
        passiveNote: "INI-Würfel: 2W6 statt 1W6. (System: INI-Würfelgröße automatisch eingestellt.)"
    },

    "Linkhand": {
        type: "passive", category: "combat",
        description: "Dies repräsentiert die grundsätzliche Erfahrung, die ein Held haben muss, um Schilde, Parierwaffen und Zweitwaffen effektiv zu führen. Gibt einem Schildkämpfer einen Bonuspunkt auf den PA-Wert. Vermindert die Abzüge im Kampf mit der falschen Hand auf AT –6 / PA –6.",
        passiveNote: "Schild-PA: +1 Bonus. Falsche-Hand-Abzüge: –6/–6 (statt –9/–9)."
    },

    "Meisterliches Entwaffnen": {
        type: "passive", category: "combat",
        description: "Mit dieser Sonderfertigkeit ist es möglich, auch Kämpfer mit Zweihandwaffen zu entwaffnen. Außerdem ist die KK-Probe des Verteidigers erschwert.",
        passiveNote: "Entwaffnen auch gegen Zweihandwaffen möglich. Gegnerische KK-Probe erschwert."
    },

    "Meisterparade": {
        type: "active", category: "combat", skill: "weapon",
        description: "Dies ist die grundsätzliche Fertigkeit, ein komplizierteres Parade-Manöver auszuführen und damit einen Gegenangriff vorzubereiten. Der Verteidiger erschwert sich seine Parade um einen bestimmten Punktbetrag; gelingt die Parade, so hat er für seine nächste Angriffs- oder Abwehraktion einen um diesen Punktbetrag erhöhten AT- oder PA-Wert.",
        execute: "meisterparade"
    },

    "Niederwerfen": {
        type: "active", category: "combat", skill: "weapon",
        description: "Dies ist eine besondere Form des Wuchtschlags. Mit einem Angriff zum Niederwerfen, einer um 4 Punkte erschwerten Attacke, kann man einen Gegner von den Beinen holen. Mit den Punkten einer zusätzlichen Ansage kann man die KK-Probe zum Stehen bleiben des Gegners erschweren.",
        execute: "niederwerfen"
    },

    "Parierwaffen I": {
        type: "passive", category: "combat",
        description: "Kenner dieser Sonderfertigkeit sind in der Lage, Parierwaffen effektiver einzusetzen; sie verwenden mit einer solchen Waffe den PA-Wert der Hauptwaffe –1 plus den PA-WM der Parierwaffe.",
        passiveNote: "Parierwaffe: PA = Hauptwaffe –1 + PA-WM der Parierwaffe."
    },

    "Parierwaffen II": {
        type: "passive", category: "combat",
        description: "Diese weiterführende Fertigkeit im Umgang mit Parierwaffen bedeutet, dass der Kämpfer mit einer Parierwaffe den PA-Wert der Hauptwaffe +2 plus dem PA-WM der Parierwaffe verwendet. Die SF ermöglicht das Erlernen von Tod von Links und erlaubt eine zusätzliche Parade mit der Parierwaffe.",
        passiveNote: "Parierwaffe: PA = Hauptwaffe +2 + PA-WM. Zusätzliche Parade pro Runde. (System: zweite PA-Aktion im Kampf automatisch freigeschaltet.)"
    },

    "Rüstungsgewöhnung I": {
        type: "passive", category: "combat",
        description: "Die Rüstungsgewöhnung I bezieht sich nur auf einen bestimmten Typ Rüstung: Wenn der Held diese Rüstung trägt, behindert sie ihn um einem Punkt weniger als angegeben.",
        passiveNote: "BE der gewohnten Rüstung: –1. (System: BE-Reduzierung automatisch eingerechnet.)"
    },

    "Rüstungsgewöhnung II": {
        type: "passive", category: "combat",
        description: "Jegliche Rüstung behindert den Träger um 1 Punkt weniger als in der Tabelle angegeben.",
        passiveNote: "Alle Rüstungen: BE –1. (System: BE-Reduzierung automatisch eingerechnet.)"
    },

    "Rüstungsgewöhnung III": {
        type: "passive", category: "combat",
        description: "Jegliche Form von Rüstung behindert um 2 Punkte weniger und nur die Hälfte der INI-Abzüge der Rüstung müssen hingenommen werden.",
        passiveNote: "Alle Rüstungen: BE –2, INI-Abzug nur (BE–2)/2. (System: BE-Reduzierung und INI-Abzug automatisch eingerechnet.)"
    },

    "Reiterkampf": {
        type: "passive", category: "combat",
        description: "Ermöglicht den Kampf zu Pferd. Alle Kampf-Talentproben, die zu Pferd durchgeführt werden, sind für diesen Kämpfer nach den Reiterkampf-Regeln erleichtert. Kann auch spezialisiert als Reiterkampf (Streitwagen) erlernt werden — in diesem Fall werden alle Talentproben Reiten durch Fahrzeug lenken ersetzt.",
        passiveNote: "Kampf zu Pferd ohne die üblichen Abzüge. Streitwagen-Variante: Reiten → Fahrzeug lenken."
    },

    "Reiterkampf (Streitwagen)": {
        type: "passive", category: "combat",
        description: "Ermöglicht den Kampf vom Streitwagen aus. Alle Kampf-Talentproben, die vom Streitwagen aus durchgeführt werden, sind für diesen Kämpfer nach den Reiterkampf-Regeln erleichtert. Alle Talentproben Reiten werden dabei durch Fahrzeug lenken ersetzt.",
        passiveNote: "Kampf vom Streitwagen ohne die üblichen Abzüge. Reiten-Proben → Fahrzeug lenken."
    },

    "Schildkampf I": {
        type: "passive", category: "combat",
        description: "Diese Fertigkeit gibt einem Schildkämpfer 2 weitere zusätzliche Punkte auf seinen Parade-Basiswert (PA-Basis + PA-Mod des Schildes +3). Ein Kämpfer mit dieser SF ist zudem in der Lage, seinen Schild mit dem Talent Raufen für eine Angriffsaktion zu nutzen.",
        passiveNote: "Schild-PA: +3 Bonus insgesamt. Schildangriff mit Raufen möglich."
    },

    "Schildkampf II": {
        type: "passive", category: "combat",
        description: "Diese nochmals weiterführende Fertigkeit gibt einem Schildkämpfer insgesamt +5 auf den PA-Wert mit Schild. Kämpfer, die Schildkampf II beherrschen, dürfen in einer Kampfrunde zwei Schildparaden zusätzlich zu ihrer Angriffsaktion durchführen.",
        passiveNote: "Schild-PA: +5 Bonus insgesamt. Zwei Schildparaden pro Runde möglich. (System: zweite PA-Aktion im Kampf automatisch freigeschaltet.)"
    },

    "Schildspalter": {
        type: "active", category: "combat", skill: "weapon",
        description: "Der Kämpfer ist in der Lage, einen gezielten Angriff auf einen gegnerischen Schild durchzuführen und diesen eventuell mit einem Schlag unbrauchbar zu machen.",
        execute: "schildspalter"
    },

    "Schnellziehen": {
        type: "passive", category: "combat",
        description: "Ein Kämpfer mit Schnellziehen beherrscht den Griff zur Waffe so perfekt, dass das Ziehen oder Zurückstecken einer Waffe zur Nebenhandlung wird und dabei keine Initiative-Punkte kostet. Ebenso kostet das Wechseln einer Waffe (von einer Hand in die andere) keine Aktion.",
        passiveNote: "Waffe ziehen/zurückstecken kostet keine Initiative und gilt als Nebenhandlung."
    },

    "Spießgespann": {
        type: "passive", category: "combat",
        description: "Mit dieser Sonderfertigkeit kann ein überlanger Spieß (Pike, Drachentöter) gleichzeitig von zwei Personen geführt werden. Wenn beiden eine AT oder PA gelingt, gelingt die gesamte Angriffs- oder Abwehraktion. Gelingt die Attacke, richtet das Spießgespann doppelt so viele TP an wie bei der Waffe angegeben; zudem können die Kämpfer ihre KK addieren, um den Schadensbonus (TP/KK) zu nutzen. Die INI des Gespanns entspricht der niedrigsten INI beider Kämpfer (modifiziert um den Waffenwert). Zusätzliche Manöver und SFs können nur eingesetzt werden, wenn beiden Kämpfern die entsprechenden Proben gelingen und beide die Voraussetzungen erfüllen.",
        passiveNote: "Zwei Kämpfer führen einen überlangen Spieß: doppelte TP, KK addiert. Beide AT/PA müssen gelingen."
    },

    "Sturmangriff": {
        type: "active", category: "combat", skill: "weapon",
        description: "Diese Sonderfertigkeit ermöglicht das gleichnamige Manöver, das eine TP-Erhöhung um (GS/2)+4 Punkte bei einem um 4 Punkte erschwerten Angriff aus vollem Lauf mit sich bringt.",
        execute: "sturmangriff"
    },

    "Tod von Links": {
        type: "passive", category: "combat",
        description: "Der Held beherrscht den Kampf mit einer Parierwaffe oder einem Schild so perfekt, dass er damit eigenständige Angriffe führen kann. Diese SF stellt eine zusätzliche Angriffsaktion pro Kampfrunde mit der Zweitwaffe/dem Schild zur Verfügung. Voraussetzungen: Parierwaffen II oder Schildkampf II, GE 15.",
        passiveNote: "Zusätzliche Angriffsaktion mit Parierwaffe/Schild pro Runde. (System: zweite Angriffsaktion im Kampf automatisch freigeschaltet.)"
    },

    "Todesstoß": {
        type: "active", category: "combat", skill: "weapon",
        description: "Erlaubt ein Alles-oder-Nichts-Manöver mit einer zum Stich geeigneten Waffe, um einen Kampf mit einem Schlag zu beenden: Bei gelungener erschwerter Attacke (+8 + halber gegnerischer RS) und misslungener gegnerischer Abwehr werden deutlich leichter und mehr Wunden angerichtet.",
        execute: "todesstos"
    },

    "Umreißen": {
        type: "active", category: "combat", skill: "weapon",
        description: "Erlaubt mit bestimmten Waffen ein Angriffsmanöver, das keinen Schaden anrichtet, sondern den Gegner durch geschickte Technik von den Beinen holen soll.",
        execute: "umreissen"
    },

    "Unterwasserkampf": {
        type: "passive", category: "combat",
        description: "Ein Held mit dieser ungewöhnlichen Sonderfertigkeit ist in der Lage, seine Bewegungen dem Widerstand des Wassers anzupassen – er erleidet nicht die üblichen Einbußen von AT/PA –6/–6 beim Kampf unter Wasser.",
        passiveNote: "Unterwasserkampf: keine AT/PA-Abzüge (–6/–6 entfallen)."
    },

    "Waffe zerbrechen": {
        type: "active", category: "combat", skill: "weapon",
        description: "Mit dieser Sonderfertigkeit kann ein Kämpfer bei seiner Parade durch ein spezielles Manöver die gegnerische Klinge mit der dafür ausgestatteten Parierwaffe auffangen und mit einer schnellen Bewegung zerbrechen.",
        execute: "waffe_zerbrechen"
    },

    "Waffenmeister": {
        type: "passive", category: "combat",
        description: "Ein Held mit dieser Sonderfertigkeit gehört zu den unangefochtenen Meistern seiner Waffengattung. Die möglichen Vorteile ergeben sich aus einem 'Auswahlkatalog' und kommen automatisch zum Tragen, wenn er bei einem Kampf eine Waffe der entsprechenden Waffenart einsetzt.",
        passiveNote: "Waffenmeister-Boni aktiv (Auswahlkatalog prüfen)."
    },

    "Waffenspezialisierung": {
        type: "passive", category: "combat",
        description: "Eine Spezialisierung auf eine bestimmte Waffe gibt +1 auf AT und PA mit dieser Waffe (beim Talent Peitsche +2 auf die Attacke).",
        passiveNote: "+1 AT und +1 PA mit der spezialisierten Waffe."
    },

    "Waffenloser Kampfstil": {
        type: "passive", category: "combat",
        description: "Ein waffenloser Kampfstil ist eine Variante der Waffenspezialisierung für die Talente Ringen und Raufen. Ein Held erlernt einen speziellen Kampfstil und erhält dadurch bestimmte waffenlose Manöver automatisch sowie einen Bonus auf Raufen bzw. Ringen. Bekannte Stile: Bornländisch, Gladiatorenstil, Hammerfaust, Hruruzat, Mercenario, Unauer Schule.",
        passiveNote: "Spezieller waffenloser Kampfstil: Raufen/Ringen-Boni + automatische Manöver."
    },

    "Waffenloser Kampfstil: Bornländisch": {
        type: "passive", category: "combat",
        description: "Bornländischer Stil (auch Gossen-Stil): Einsatz aller körperlichen Mittel, um eine Rauferei zu gewinnen. Voraussetzungen: TaW Raufen 5, TaW Ringen 5. Verbreitung: 6. Kosten: 100 AP (50 AP für Schlangenmenschen). Boni: Ringen-AT und -PA je +1. Automatische Manöver: Auspendeln, Biss, Block, Fußfeger, Griff, Halten, Klammer, Knie, Kopfstoß, Niederringen, Schmutzige Tricks, Schwitzkasten, Tritt, Wurf, Würgegriff.",
        passiveNote: "Ringen-AT/PA je +1. Bornländisch/Gossen: Raufen 5 + Ringen 5 Voraus. 100 AP."
    },

    "Waffenloser Kampfstil: Hruruzat": {
        type: "passive", category: "combat",
        description: "Hruruzat: tänzerisch wirkende Kampftechnik der Waldmenschen (und ähnlich auf Maraskan). Voraussetzungen: TaW Raufen 10, TaW Ringen 7. Verbreitung: 3 (Waldmenschen-Kulturen, Maraskan, Südl. Stadtstaaten). Kosten: 200 AP (100 AP für Schlangenmenschen). Boni: Raufen-AT und -PA je +1. Besonderheit: Alle Tritte des Hruruzat-Kämpfers richten 2W6 TP(A) an; fällt ein Pasch (ein sog. 'Zat'), darf der Schaden nochmals gewürfelt und addiert werden; für je 4 Punkte einer Ansage kann ein W6 um 1 Punkt verändert werden, um einen Zat zu erzwingen. Automatische Manöver: Auspendeln, Beinarbeit, Block, Doppelschlag, Eisenarm, Fußfeger, Gerade, Griff, Handkante, Hoher Tritt, Knie, Kopfstoß, Kreuzblock, Schwinger, Sprung, Sprungtritt, Tritt, Wurf.",
        passiveNote: "Raufen-AT/PA je +1. Tritte: 2W6 TP(A), Pasch (Zat) = Schaden nochmals addieren. Raufen 10 + Ringen 7 Voraus."
    },

    "Windmühle": {
        type: "active", category: "combat", skill: "weapon",
        description: "Unter Einsatz dieser Sonderfertigkeit kann ein Kämpfer mit dem gewagten gleichnamigen Manöver besonderen Gewinn aus einem kraftvollen Angriff seines Gegners ziehen und einen gegnerischen Wuchtschlag in einen eigenen Angriff umwandeln.",
        execute: "windmuehle"
    },

    "Wuchtschlag": {
        type: "active", category: "combat", skill: "weapon",
        description: "Dies ist eine besondere Form der Attacke, die mit all jenen Waffen ausgeführt werden kann, deren Wirkung auf Wucht beruht. Bei einem Wuchtschlag erschwert sich der Angreifer seinen AT-Wurf um eine bestimmte Anzahl von Punkten, um dieselbe Zahl zu seinen Trefferpunkten zu addieren.",
        execute: "wuchtschlag"
    },

    // ===========================
    // WAFFENLOSE KAMPF-SFs
    // ===========================

    "Auspendeln": {
        type: "passive", category: "combat",
        description: "Bei dieser allgemeinen Parade-Variante (Raufen oder Ringen) ist der Verteidiger in der Lage, seinen Oberkörper und seinen Kopf scheinbar unabhängig von seinen Beinen bewegen zu können. Ohne Auspendeln sind alle (waffenlosen) Paraden gegen Gerade, Hoher Tritt, Schmetterschlag und Schwinger um 4 Punkte erschwert.",
        passiveNote: "Parade gegen Gerade, Hoher Tritt, Schmetterschlag und Schwinger ohne Erschwernis."
    },

    "Beinarbeit": {
        type: "passive", category: "combat",
        description: "Eine Parade-Variante für Raufen und Ringen, bei welcher der Verteidiger sowohl auf sicheren als auch auf beweglichen Stand achtet. Ohne Beinarbeit sind (waffenlose) Paraden gegen Fußfeger, Knie, Tritt und Schwanzfeger um 4 Punkte erschwert.",
        passiveNote: "Parade gegen Fußfeger, Knie, Tritt und Schwanzfeger ohne Erschwernis."
    },

    "Biss": {
        type: "active", category: "combat", skill: "Raufen",
        description: "Raufen-AT mit Ansage; der Angreifer ist in der Lage, so etwas wie einen 'Wuchtschlag' mit seinen Zähnen durchzuführen, also sich die AT zu erschweren, um bei Gelingen die Ansage zu seinen TP(A) zu addieren. Bisse gegen bewaffnete Gegner tragen ein besonderes Risiko.",
        execute: "biss"
    },

    "Block": {
        type: "active", category: "combat", skill: "Raufen",
        description: "Raufen-PA, eine waffenlose Variante des bewaffneten 'Bindens'; der Kämpfer kann eine erschwerte Parade ansagen und bei Gelingen mit den so gewonnenen Punkten die nächstfolgende gegnerische PA erschweren.",
        execute: "block"
    },

    "Doppelschlag": {
        type: "active", category: "combat", skill: "Raufen",
        description: "Raufen-AT; mit diesem Manöver ist der Kämpfer in der Lage, gleichzeitig (in einer einzigen Angriffsaktion) mit beiden Fäusten oder Handkanten zuzuschlagen, wozu ihm eine einzige Raufen-AT +4 gelingen muss. Der Verteidiger muss zwei Paraden aufwenden.",
        execute: "doppelschlag"
    },

    "Fußfeger": {
        type: "active", category: "combat", skill: "Raufen",
        description: "Raufen-AT; ein Tritt nach den Beinen des Gegners. Bei gelingendem Angriff muss der Verteidiger eine GE-Probe ablegen, um auf den Beinen zu bleiben. Geht er zu Boden, verliert er 2W6 Punkte INI. Ohne Beinarbeit ist die Parade um 4 Punkte erschwert.",
        execute: "fussfeger"
    },

    "Gerade": {
        type: "active", category: "combat", skill: "Raufen",
        description: "Raufen-AT; bei dieser Art von Schlag kann eine AT mit einer Ansage versehen werden, um bei Gelingen die eigenen TP zu erhöhen. Ohne Auspendeln ist die Parade gegen eine Gerade um 4 Punkte erschwert.",
        execute: "gerade"
    },

    "Griff": {
        type: "active", category: "combat", skill: "Ringen",
        description: "Ringen-AT; kann und sollte als AT mit Ansage ausgeführt werden. Ein gegriffener Gegner erleidet Erschwernisse auf alle Manöver, Angriffs- und Abwehraktionen in Höhe der halben Ansage, so lange der Griff anhält.",
        execute: "griff"
    },

    "Halten": {
        type: "active", category: "combat", skill: "Ringen",
        description: "Ringen-AT oder -PA; der Kämpfer kann eine Erschwernis auf sein Manöver ansagen (AT bzw. PA mit Ansage) und bei Gelingen mit den so gewonnenen Punkten die nächstfolgende gegnerische Aktion erschweren.",
        execute: "halten"
    },

    "Handkante": {
        type: "active", category: "combat", skill: "Raufen",
        description: "Raufen-AT; bei dieser Art von Schlag kann eine AT mit einer Ansage versehen werden, um bei Gelingen die eigenen TP zu erhöhen. Richtet der Schlag mehr 'echte' Schadenspunkte an, als die halbe KO des Opfers beträgt, so erleidet es eine Wunde (Wundschwelle nicht erhöht).",
        execute: "handkante"
    },

    "Hoher Tritt": {
        type: "active", category: "combat", skill: "Raufen",
        description: "Raufen-AT; dieser Angriff kann nur mittels Auspendeln oder Kreuzblock (oder Ausweichen oder Waffenparade) vernünftig abgewehrt werden (ansonsten ist die PA um 4 Punkte erschwert). Es kann eine AT mit Ansage zur TP-Erhöhung sein.",
        execute: "hoher_tritt"
    },

    "Klammer": {
        type: "active", category: "combat", skill: "Ringen",
        description: "Ringen-AT; dieser Angriff kann mit einer Ansage versehen werden. Ein geklammerter Gegner kann sich nur mit einer Ringen-PA (erschwert um die Ansage) oder einer KK-Probe befreien. Sowohl Klammernder als auch Geklammerter können nur Biss, Kopfstoß, Knie, Schwitzkasten und Würgegriff einsetzen.",
        execute: "klammer"
    },

    "Knaufschlag": {
        type: "active", category: "combat", skill: "Raufen",
        description: "Raufen-AT; der Kämpfer ist in der Lage, mit dem Knauf einer Waffe zuzuschlagen und 1W6+2 TP(A) anzurichten; dies funktioniert auch in der Distanzklasse Handgemenge.",
        execute: "knaufschlag"
    },

    "Knie": {
        type: "active", category: "combat", skill: "Raufen",
        description: "Raufen-AT; ohne Beinarbeit, Kreuzblock oder Ausweichen ist die PA um 4 Punkte erschwert. Ein Knie-Angriff richtet bei Männern 1W6+2 TP(A) an (bei Frauen und Achaz nur 1W6 TP(A)), und wenn die SP(A) die Wundschwelle überschreiten, verliert der Gegner alle verbleibenden Aktionen, ist 1W3 Kampfrunden kampfunfähig und erleidet 2W6 INI-Verlust.",
        execute: "knie"
    },

    "Kopfstoß": {
        type: "active", category: "combat", skill: "Raufen",
        description: "Raufen-AT; der Angreifer ist in der Lage, einem Gegner seinen Kopf an eine verwundbare Stelle zu rammen. Eine Ansage erhöht die TP. Gegen bewaffnete Gegner besteht das Risiko, dass der Angreifer bei erfolgreicher Parade volle TP erleidet.",
        execute: "kopfstoss"
    },

    "Kreuzblock": {
        type: "active", category: "combat", skill: "Raufen",
        description: "Raufen-PA; eine waffenlose 'Meisterparade', die es bei Gelingen erlaubt, die Punkte aus der PA-Ansage so zu verteilen, dass gleichzeitig die PA des Gegners erschwert wie auch die eigene Raufen-AT erleichtert wird. Kreuzblock funktioniert als reguläre Parade auch gegen Knie, Tritt und Sprungtritt.",
        execute: "kreuzblock"
    },

    "Niederringen": {
        type: "active", category: "combat", skill: "Ringen",
        description: "Ringen-AT; bei einem gelungenen Angriff zum Niederringen geht der Angreifer selbst mit zu Boden: Der Angreifer verliert 1W6 Punkte INI, der Verteidiger 2W6 Punkte. Der Angreifer kann den Angriff als AT mit Ansage ausführen und durch Aufteilen der Ansage sowohl die PA des Gegners erschweren als auch seine nachfolgende AT erleichtern.",
        execute: "niederringen"
    },

    "Schmetterschlag": {
        type: "active", category: "combat", skill: "Raufen",
        description: "Raufen-AT; eine verstärkte Variante des Manövers Gerade. Richtet der Schlag mehr SP(A) an, als die Wundschwelle des Opfers beträgt, so muss dem Opfer eine einfache KO-Probe gelingen, um nicht für 1W6 SR das Bewusstsein zu verlieren. Wundschwelle ist nicht erhöht.",
        execute: "schmetterschlag"
    },

    "Schmutzige Tricks": {
        type: "active", category: "combat", skill: "Raufen",
        description: "Ringen- und Raufen-AT; der Kämpfer kann diverse Möglichkeiten, die die Umgebung ihm bietet, im Kampf zu seinem Vorteil einsetzen (Sand in die Augen, weggezogener Teppich, ...). Richtet üblicherweise nur 1W6 AU- oder Initiative-Verlust an; Rüstung hilft nicht.",
        execute: "schmutzige_tricks"
    },

    "Schwanzfeger": {
        type: "active", category: "combat", skill: "Raufen",
        description: "Raufen-AT; ein Hieb mit dem Schwanz nach den Beinen des Gegners (Achaz-Variante des Fußfegers). Bei gelingendem Angriff muss der Verteidiger eine GE-Probe ablegen, um auf den Beinen zu bleiben. Ohne Beinarbeit ist die Parade um 4 Punkte erschwert.",
        execute: "fussfeger"
    },

    "Schwanzschlag": {
        type: "active", category: "combat", skill: "Raufen",
        description: "Raufen-AT; dieses Manöver ist für die meisten Gegner unerwartet und schwer zu parieren: Der Angreifer stellt fest, um wie viele Punkte er seinen AT-Wert unterboten hat, und die Hälfte dieser Punkte erschweren die Parade des Gegners.",
        execute: "schwanzschlag"
    },

    "Schwinger": {
        type: "active", category: "combat", skill: "Raufen",
        description: "Raufen-AT; bei dieser Art von Schlag (einer Form der Finte) kann eine Ansage angekündigt werden, um bei Gelingen die gegnerische PA um die Punkte aus der Ansage zu erschweren. Ohne Auspendeln ist die Parade gegen einen Schwinger um 4 Punkte erschwert.",
        execute: "schwinger"
    },

    "Schwitzkasten": {
        type: "active", category: "combat", skill: "Ringen",
        description: "Ringen-AT; die folgenden Ringen-AT des Angreifers sind um 1, 2, 3 usf. Punkte erleichtert und richten 1W6+1, 1W6+2, 1W6+3 etc. Punkte AU-Verlust an. Die Paraden des Verteidigers sind um 1, 2, 3 usf. Punkte erschwert. Der Verteidiger kann nur Biss, Knie oder Schwanzschlag einsetzen (jeweils −4).",
        execute: "schwitzkasten"
    },

    "Sprung": {
        type: "active", category: "combat", skill: "Raufen",
        description: "Raufen-PA; funktioniert sowohl gegen Waffen wie auch gegen Waffenlose Angriffe. Unabhängig vom Ausgang des Manövers verliert der Verteidiger 1W6 Punkte INI. Die Sprung-Parade kann eine Ansage erhalten.",
        execute: "sprung"
    },

    "Sprungtritt": {
        type: "active", category: "combat", skill: "Raufen",
        description: "Raufen-AT, die automatisch um 4 Punkte erschwert ist. Ein solcher Angriff kann nur schwer abgewehrt werden. Ein Sprungtritt richtet 2 TP(A) zusätzlich an, kann eine Ansage zur Schadenserhöhung erhalten. Unabhängig vom Ausgang des Manövers verliert der Verteidiger 1W6 Punkte INI.",
        execute: "sprungtritt"
    },

    "Tritt": {
        type: "active", category: "combat", skill: "Raufen",
        description: "Raufen-AT; bei dieser Art von Angriff kann eine Ansage gemacht werden, um bei Gelingen die eigenen TP zu erhöhen; ohne Beinarbeit ist die Parade gegen einen Tritt um 4 Punkte erschwert.",
        execute: "tritt"
    },

    "Versteckte Klinge": {
        type: "passive", category: "combat",
        description: "Raufen-AT; der Kämpfer ist in der Lage, in der Distanzklasse Handgemenge eine Waffe mit der Distanzklasse Handgemenge mit seinen Raufen-Kampfwerten einzusetzen, aber TP entsprechend der Waffe anzurichten.",
        passiveNote: "Raufen-AT mit Handgemenge-Waffe möglich (TP der Waffe)."
    },

    "Würgegriff": {
        type: "active", category: "combat", skill: "Ringen",
        description: "Ringen-AT; mit einem Würgegriff ist der Kämpfer in der Lage, einen Gegner zu erdrosseln (ihm schnell AuP zu rauben). Dazu muss ihm eine Ringen-AT gelingen. Befindet sich der Gegner einmal im Würgegriff, richtet der Angreifer in den folgenden Kampfrunden automatisch 1W6+2 TP(A) an.",
        execute: "wuergegriff"
    },

    "Wurf": {
        type: "active", category: "combat", skill: "Ringen",
        description: "Ringen-AT, die automatisch um 4 Punkte erschwert ist; der Gegner wird bei Gelingen zu Boden geworfen und muss 1W6 TP(A) hinnehmen. Geht er zu Boden, verliert er 2W6 Punkte INI. Einem Wurf muss immer ein Halten vorausgehen.",
        execute: "wurf"
    },

    // ===========================
    // FERNKAMPF-SFs
    // ===========================

    "Berittener Schütze": {
        type: "passive", category: "combat",
        description: "Berittene Schützen erleiden nur die Hälfte der Aufschläge, mit denen ein Schuss oder Wurf vom sich bewegenden Reittier aus belegt ist. Außerdem können sie ihre Waffen auf dem Pferderücken genauso schnell spannen wie auf festem Boden — die erhöhte Ladezeit beim Reiten entfällt. Voraussetzungen: TaW Reiten 7; kann nur bei Fernkampf-Fertigkeiten eingesetzt werden, deren TaW ebenfalls 7 oder mehr beträgt. Verbreitung: 4 (Reiterkulturen, entsprechende Militäreinheiten).",
        passiveNote: "Halbe Aufschläge beim Schießen vom Pferd. Keine erhöhte Ladezeit zu Pferd."
    },

    "Eisenhagel": {
        type: "active", category: "combat", skill: null,
        description: "Ein Spezialist im Umgang mit Wurfscheiben, Wurfsternen oder ähnlichen Wurfgeschossen ist in der Lage, mehrere dieser Waffen gleichzeitig zu werfen, wobei die Fernkampf-Probe um die doppelte Zahl der verwendeten Wurfgeschosse (max. 5) erschwert ist.",
        execute: "eisenhagel"
    },

    "Meisterschütze": {
        type: "passive", category: "combat",
        description: "Ein Meisterschütze erleidet keinen Aufschlag bei Schnellschüssen. Er kann bei einem Fernkampfangriff mit Ansage eine maximale Ansage in Höhe seines Fernkampfwerts (anstelle nur seines Talentwerts) machen.",
        passiveNote: "Schnellschuss ohne Aufschlag. Maximale Ansage = Fernkampfwert (statt Talentwert)."
    },

    "Scharfschütze": {
        type: "passive", category: "combat",
        description: "Ein Scharfschütze erleidet nur einen Aufschlag von 1 Punkt (anstatt 2) bei Schnellschüssen.",
        passiveNote: "Schnellschuss: nur +1 Aufschlag (statt +2)."
    },

    "Schnellladen": {
        type: "passive", category: "combat",
        description: "Der Held ist durch Drill oder langjährige Praxis in der Lage, schneller nachzuladen. Für Bögen: Ladezeit –1 Aktion (mindestens 1 Aktion). Für Armbrüste (Variante Schnellladen (Armbrust)): nur ¾ der angegebenen Ladezeit. Kann für Bögen und Armbrüste getrennt erlernt werden. Nur einsetzbar bei Rüstungs-BE maximal 4 (Rüstungsgewöhnung gilt).",
        passiveNote: "Bogen: Ladezeit –1 Aktion. Armbrust: nur ¾ der Ladezeit. Nur bis BE 4."
    },


    // ===========================
    // MAGISCHE SFs
    // ===========================

    "Astrale Meditation": {
        type: "passive", category: "magic",
        description: "Wer diese SF beherrscht, kann durch Konzentration (1 SR pro Punkt; Probe auf IN/CH/KO, erleichtert um halben RkW bzw. halben TaW Musizieren bei Elfen) eigene Lebensenergie im Verhältnis 1:1 in Astralenergie umwandeln. Der Meditierende verliert dabei W3–1 LeP.",
        passiveNote: "LeP → AsP (1:1) per Meditation möglich (Probe IN/CH/KO, 1 SR/Pkt)."
    },

    "Aura verhüllen": {
        type: "active", category: "magic", skill: null,
        description: "Der Zauberkundige unterdrückt durch eine MU-Probe mit selbst gewähltem Aufschlag seine magische Ausstrahlung (kostet 1W3 Erschöpfung). Gezielte Erkenntniszauber und -liturgien sind um den dreifachen Aufschlagswert erschwert, ungezielte Erkenntniszauberei wird vollständig getäuscht. Während der Wirkung (max. 1 Stunde) kann der Held nicht selbst zaubern.",
        execute: "aura_verhüllen"
    },

    "Aurapanzer": {
        type: "passive", category: "magic",
        description: "Rigorose Fasten- und Konzentrationstechniken haben Körper und Geist so gereinigt, dass die Aura 'magieabweisend' wirkt: Der Charakter erhält RS in Höhe seiner natürlichen MR (aus Eigenschaften, Vorteilen und zugekaufter MR) gegen magischen Schaden aus Zaubern mit dem Merkmal Schaden sowie mTP magischer Waffen. Nicht wirksam gegen elementare Sekundärschäden und körperliche Angriffe von Dämonen.",
        passiveNote: "RS gegen magischen Schaden: +natürliche MR Punkte (nicht erkennbar per ODEM ARCANUM)."
    },

    "Bann- und Schutzkreise": {
        type: "passive", category: "magic",
        description: "Bekannt sind Bann- und Schutzkreise gegen Geisterwesen, Niedere Dämonen, Elementare, Gehörnte Dämonen sowie Schutzkreise gegen Ungeziefer, Reptilien und Traumgänger. Bannkreise halten Wesen im Inneren gefangen, Schutzkreise schließen sie aus.",
        passiveNote: "Ermöglicht Errichten von Bann- und Schutzkreisen gegen verschiedene Wesentypen."
    },

    "Bannschwert": {
        type: "passive", category: "magic",
        description: "Objektritual (OR): Mit diesem Ritual wird ein magisches Objekt erschaffen, dessen Zweck es ist, die Verbindung jenseitiger Wesen ins Diesseits zu zerstören und dadurch deren Austreibung zu erleichtern.",
        passiveNote: "Erlaubt Erschaffung eines Bannschwertes (magisches Traditionsartefakt)."
    },

    "Blutmagie": {
        type: "passive", category: "magic",
        description: "Um die Techniken der Blutmagie anwenden zu können, benötigt ein Zauberkundiger diese Sonderfertigkeit als Voraussetzung für verwandte Rituale und Techniken.",
        passiveNote: "Voraussetzung für blutmagische Techniken und zugehörige Rituale."
    },

    "Chimärenmeister": {
        type: "passive", category: "magic",
        description: "Kenner dieser SF haben Erleichterungen bei der Konstruktion von Chimären; ihre Chimären sind zudem loyaler als üblich.",
        passiveNote: "Erleichterungen beim Erschaffen von Chimären; höhere Loyalität."
    },

    "Dämonenbindung I": {
        type: "passive", category: "magic",
        description: "Der Beschwörer kann einen Niederen Dämon dauerhaft in der dritten Sphäre binden oder manifestieren, was ihn täglich AsP und LeP kostet, die in einem kurzen Ritual um Mitternacht geopfert werden müssen.",
        passiveNote: "Ermöglicht dauerhafte Bindung/Manifestation Niederer Dämonen (tägliche AsP+LeP-Kosten)."
    },

    "Dämonenbindung II": {
        type: "passive", category: "magic",
        description: "Wie Dämonenbindung I, jedoch für Gehörnte Dämonen. Der Beschwörer kann einen Gehörnten Dämon dauerhaft binden oder manifestieren, was täglich AsP und LeP kostet.",
        passiveNote: "Ermöglicht dauerhafte Bindung/Manifestation Gehörnter Dämonen (tägliche AsP+LeP-Kosten)."
    },

    "Druidenrache": {
        type: "passive", category: "magic",
        description: "Durch dieses Ritual ist der Zauberer in der Lage, all seine Reserven (LE, Eigenschaften und Fertigkeitspunkte) in einen finalen, spektakulären Zauberspruch zu legen – und mit diesem zu vergehen.",
        passiveNote: "Finaler Opferzauber: alle Reserven (LE, Eigenschaften, FP) in einen letzten Spruch."
    },

    "Druidische Dolchrituale": {
        type: "passive", category: "magic",
        description: "Objektritual (OR): Mit diesen Ritualen können dem Vulkanglasdolch der Druiden oder der Goldsichel der Geoden besondere Fähigkeiten verliehen werden (Weihe, Gespür, Licht, Bann, Leib, Schutz, Weg, Ernte, Lebenskraft, Opferdolch, Schneide, Weisung). Einige Rituale erfordern bei Anwendung eine Ritualprobe und AsP.",
        passiveNote: "Ermöglicht Verzauberung des Traditionsdolchs/der Sichel mit verschiedenen Ritualen."
    },

    "Eiserner Wille I": {
        type: "active", category: "magic", skill: null,
        description: "Der Held konzentriert sich (zwei Aktionen, 1 Erschöpfung) und erhält für MU/2 Spielrunden MR +3 gegen Zauber mit Einfluss, Hellsicht, Herrschaft und Verständigung sowie gegen andere, den Geist beeinflussende Zauberei und übersinnliche Wirkungen. Während der Wirkungsdauer sind Talent- und Zauberproben um 3, Eigenschaftsproben und Kampfwürfe um je 1 Punkt erschwert.",
        passiveNote: "(System: MR-Bonus bei relevanten Widerstandswürfen über Dialog-Option anwendbar, solange aktiviert.)",
        execute: "eiserner_wille"
    },

    "Eiserner Wille II": {
        type: "active", category: "magic", skill: null,
        description: "Wie Eiserner Wille I, jedoch mit MR +7 (statt +3) gegen die genannten Zaubermerkmale. Der MR-Bonus ist kumulativ mit Boni aus Vorteilen, Zaubern, Artefakten und zugekaufter MR.",
        passiveNote: "(System: MR-Bonus bei relevanten Widerstandswürfen über Dialog-Option anwendbar.)",
        execute: "eiserner_wille"
    },

    "Elementarharmonisierte Aura": {
        type: "passive", category: "magic",
        description: "Der Zauberer kann die Merkmalskenntnis des Gegenelements seines bevorzugten Elements erlernen und Zauber des Gegenelements ohne Einschränkungen sprechen. Muss für die drei Elementpaare jeweils neu erworben werden. Voraussetzungen: KL 15, IN 15, Magiekunde 12, Merkmalskenntnis oder Begabung in mindestens einem Element; 6 Monate Kontemplation. Nicht für Paktierer oder Zauberer mit bestimmten Nachteilen (Astraler Block, Unstet u.a.).",
        passiveNote: "Gegenelement ohne Einschränkungen zaubern. Je Elementpaar einzeln erwerben."
    },

    "Harmonisierte Eis-Humus-Aura": {
        type: "passive", category: "magic",
        description: "Spezifische Variante der Elementarharmonisierten Aura für das Elementpaar Eis/Humus (Wasser/Erz). Ermöglicht dem Zauberer, Zauber des jeweils gegensätzlichen Elements (Eis ↔ Humus) ohne die sonst geltenden Einschränkungen zu sprechen. Voraussetzungen: KL 15, IN 15, Magiekunde 12, Merkmalskenntnis oder Begabung in Eis oder Humus.",
        passiveNote: "Eis- und Humus-Zauber ohne Gegenelement-Einschränkungen zaubern."
    },

    "Elfenlieder": {
        type: "passive", category: "magic",
        description: "Die traditionellen Melodien der Elfen stellen machtvolle Zauberrituale dar. Bekannte Elfenlieder: Sorgenlied, Zaubermelodie, Friedenslied, Windgeflüster, Lied der Lieder, Freundschaftslied, Erinnerungsmelodie, Melodie der Kunstfertigkeit, Lied des Trostes, Lied der Reinheit. Erfordert Beherrschung der Talente Singen und Musizieren.",
        passiveNote: "Elfisches Rituallied-Repertoire. Jedes Lied einzeln erlernbar."
    },

    "Exorzist": {
        type: "passive", category: "magic",
        description: "Zauberer oder Geweihter: Bei der Austreibung von Dämonen/Geistern oder beim Errichten von Bann-/Schutzkreisen darf eine Magiekunde-Probe abgelegt werden; die Hälfte der TaP* erleichtern die passende Beschwörungs-/Mirakel-/Ritualkenntneis-Probe. Zudem Bonus von TaP*/4 auf Beherrschungs-/Vertreibungsproben.",
        passiveNote: "Magiekunde-TaP*/2 als Erleichterung bei Austreibungen; TaP*/4 auf Vertreibungsproben."
    },

    "Fernzauberei": {
        type: "passive", category: "magic",
        description: "Für Kenner dieser SF sind die Zuschläge auf die Zauberprobe beim Zaubern auf die Distanz Horizont halbiert.",
        passiveNote: "Zuschläge beim Zaubern auf Horizont-Distanz halbiert."
    },

    "Form der Formlosigkeit": {
        type: "passive", category: "magic",
        description: "Mit dieser SF ist der Beschwörer in der Lage, dem Dämon bei oder nach der Beschwörung zusätzliche Eigenschaften mitzugeben. Auch das nachträgliche Verbessern der (Kampf-)Werte des Dämons ist erleichtert möglich.",
        passiveNote: "Dämon nachträglich mit Eigenschaften ausstatten/verbessern (erleichtert)."
    },

    "Former der Leiber": {
        type: "passive", category: "magic",
        description: "Nekromantische Sonderfertigkeit (aus: Von Toten und Untoten). Ermöglicht dem Nekromanten, den Zauber TOTES HANDLE zur Erweckung spezieller zusammengefügter Körper zu verwenden – anstelle der üblichen Thargunitoth-Variante von STEIN WANDLE. Die Körper bestehen aus Knochen, totem Fleisch oder Leichenteilen und gelten als Untote. Erschaffung und Regeln folgen den Golem-Erschaffungsregeln. Bei zusätzlicher Kenntnis von Golembauer gelten die Vergünstigungen dieser SF auch für TOTES HANDLE. Voraussetzung: SF Golembauer.",
        passiveNote: "TOTES HANDLE statt STEIN WANDLE (Thargunitoth) zur Erweckung zusammengesetzter Untoten/Goleme. Erschaffung nach Golem-Regeln. Voraus.: Golembauer."
    },

    "Geber der Gestalt": {
        type: "passive", category: "magic",
        description: "Ein Beschwörer mit dieser SF kann beim nachträglichen Formen eines Dämons diesem erleichtert zusätzliche Eigenschaften mitgeben.",
        passiveNote: "Erleichtert zusätzliche Eigenschaften beim Formen von Dämonen."
    },

    "Geber des Funkens": {
        type: "passive", category: "magic",
        description: "Nekromantische Sonderfertigkeit (aus: Von Toten und Untoten). Schnelle Berührungs-Erweckung via SKELETTARIUS: Zauberdauer sinkt auf 2 Aktionen, Untote nach weiteren 2 Aktionen einsatzbereit. Die Untoten akzeptieren nur Befehle, die zum Erweckungszeitpunkt geäußert wurden – nachträgliche Befehle sind nicht möglich. Untote fallen nach ZfW×2 Kampfrunden zusammen; keine Verlängerung, keine laufenden Kosten. ZfP*-Vergabe vor der Erweckung ist nicht möglich, nachträgliche Vergabe erlaubt. Kosten: Pro erhobenem Untoten oder Rotte werden 1W3 LeP statt AsP abgezogen (keine Einsparungsmöglichkeit).",
        passiveNote: "SKELETTARIUS: Dauer 2 Aktionen, bereit nach 2 weiteren. Nur Befehle bei Erweckung, hält ZfW×2 KR. Kosten: 1W3 LeP/Untotem statt AsP (nicht einsparbar)."
    },

    "Gebieter der Rotte": {
        type: "passive", category: "magic",
        description: "Nekromantische Sonderfertigkeit (aus: Von Toten und Untoten). Der Nekromant kann SKELETTARIUS auf mehrere Kadaver desselben Typs anwenden (Variante Rotte): große Kreaturen paarweise, mittlere zu dritt, kleine zu viert, sehr kleine zu fünft. Sehr große oder größere Kreaturen können nicht erweckt werden. Einzelbefehle und Gruppenbefehle möglich. Kompatibel mit der Variante Mehrere Untote. Außerdem: Die Variante Kadaver des SKELETTARIUS ist nicht mehr erschwert (+3), und die AsP-Kosten der Kadaver-Variante sinken um 1.",
        passiveNote: "SKELETTARIUS: Rotten (groß: 2, mittel: 3, klein: 4, sehr klein: 5). Kadaver-Variante: +3 (nicht mehr erschwert), AsP −1. (Modul: Erleichterung beim Zauber vorausgefüllt.)"
    },

    "Gedankenschutz": {
        type: "passive", category: "magic",
        description: "Diese Technik gibt dem Helden dauerhaft und automatisch MR +3 gegen Herrschafts-, Einfluss-, Hellsicht- und Verständigungs-Zauberei sowie gegen andere, den Geist beeinflussende Magie und übersinnliche Wirkungen. Kumulativ mit anderen Boni. Mit Eiserner Wille II auf +7 anhebbar.",
        passiveNote: "Permanente MR +3 gegen Herrschaft, Einfluss, Hellsicht, Verständigung. Mit Eiserner Wille II auf +7 steigerbar. (System: MR-Bonus bei Widerstandswürfen automatisch angewendet.)"
    },

    "Gefäß der Sterne": {
        type: "passive", category: "magic",
        description: "Der Zauberer kann mehr permanente AE speichern: In die Berechnung der AE-Basis geht CH doppelt ein, d.h. (MU+IN+CH+CH)/2. Kann die Große Meditation unabhängig vom Ort durchführen und dabei optional CH als Leiteigenschaft wählen.",
        passiveNote: "AE-Basis: (MU+IN+CH+CH)/2. Große Meditation ortsunabhängig, CH als Leiteigenschaft wählbar. (System: AsP-Bonus automatisch in AE-Basis eingerechnet.)"
    },

    "Geodenrituale": {
        type: "passive", category: "magic",
        description: "Objektritual (OR): Neben den Schlangenring-Zaubern und druidischen Ritualen kennen die Geoden noch zwei weitere Rituale: die Gestalt aus Rauch und den Trank des ungehinderten Weges (wird gemeinsam auf Geodentreffen gebraut, nicht als Einzelritual erlernbar).",
        passiveNote: "Zugang zu Geodenritualen: Gestalt aus Rauch, Trank des ungehinderten Weges."
    },

    "Golembauer": {
        type: "passive", category: "magic",
        description: "Kenner dieser SF haben Erleichterungen bei der Erschaffung von Golems (dämonischer wie auch elementarer Art); ihre Golems sind zudem loyaler als üblich.",
        passiveNote: "Erleichterungen beim Erschaffen von Golems; höhere Loyalität."
    },

    "Große Meditation": {
        type: "passive", category: "magic",
        description: "Ritual: Erlaubt Vollzauberern, ihre AE-Basis zu verbessern. Durch langen Meditationsprozess gewinnt der Zauberer je nach Tradition KL/3 oder IN/3 AsP zum Grundvorrat hinzu, bei Gelingen der Ritualprobe zusätzlich RkP*/10 bzw. TaP*/10. Nur einmal pro Jahr möglich.",
        passiveNote: "1×/Jahr: +KL/3 oder IN/3 AsP (plus RkP*/10 bei Erfolg). Nur Vollzauberer."
    },

    "Herr über die Gebeine": {
        type: "passive", category: "magic",
        description: "Nekromantische Sonderfertigkeit (aus: Von Toten und Untoten). Erhöht die Anzahl der ZfP*, mit denen der Nekromant erhobene Untote mit zusätzlichen Eigenschaften ausstatten kann. Maximal die Hälfte der benötigten ZfP* (bei ungeraden Zahlen nur der kleinere Teil) kann jederzeit im Verlauf der Erhebung in zusätzliche AsP-Kosten im Verhältnis 1:1 umgewandelt werden.",
        passiveNote: "Mehr ZfP* für Untoten-Eigenschaften. Bis zur Hälfte (kleinerer Teil bei ungerade) 1:1 in AsP wandeln. Voraussetzung für Bewahrer der Ahnenmacht."
    },

    "Hexenflüche": {
        type: "passive", category: "magic",
        description: "Diese den Hexen vorbehaltene Zauberei umgeht die Magieresistenz und ist schwer aufzuheben. Bekannte Flüche: Ängste mehren, Beiß auf Granit, Beute, Hagelschlag, Hexenschuss, Kornfäule, Krötenkuss, Mit Blindheit schlagen, Pech an den Hals, Pestilenz, Schlaf rauben, Todesfluch, Unfruchtbarkeit, Viehverstümmelung, Warzen sprießen, Zunge lähmen.",
        passiveNote: "Hexenexklusiv. Umgeht MR. Jeder Fluch einzeln erlernbar."
    },

    "Höhere Dämonenbindung": {
        type: "passive", category: "magic",
        description: "Ein Beschwörer mit dieser SF muss bei Bindung oder Manifestation eines Dämons nur geringere AsP-Kosten aufwenden.",
        passiveNote: "Reduzierte AsP-Kosten bei Dämonenbindung/-manifestation."
    },

    "Hypervehemenz": {
        type: "passive", category: "magic",
        description: "Ermöglicht bei der Artefaktherstellung mittels ARCANOVI den Stapeleffekt mit beliebig vielen Proben auf Wirkende Sprüche.",
        passiveNote: "Stapeleffekt-Proben bei ARCANOVI auf beliebig viele Sprüche ausdehnbar."
    },

    "Invocatio Integra": {
        type: "passive", category: "magic",
        description: "Ermöglicht das gleichnamige Ritual zur Beschwörung Gehörnter Dämonen mit erhöhter Sicherheit durch Paraphernalia, Donaria, Beschwörungszeitpunkt, Wahre Namen und längere Vorbereitung.",
        passiveNote: "Sichere Beschwörung Gehörnter Dämonen per Invocatio-Integra-Ritual."
    },

    "Keulenrituale": {
        type: "passive", category: "magic",
        description: "Objektritual (OR): Schamane kann seine Knochenkeule verzaubern. Rituale: Weihe, Härte, Opferkeule, Gespür, Kraft, Hilfe, Nähe zur Natur, Zauber, Bann, Geist, Apport der Keule.",
        passiveNote: "Verzauberung der Knochenkeule mit verschiedenen Ritualen (je Ritual einzeln erlernbar)."
    },

    "Konzentrationsstärke": {
        type: "passive", category: "magic",
        description: "Für Zauberer mit dieser SF ist die Selbstbeherrschungs-Probe beim Stören des Zauberwirkens um 7 Punkte erleichtert. Gilt auch für Rituale. Die Probe für Astrale Meditation und die AsP-Steigerungsprobe bei der Großen Meditation sind um 2 Punkte erleichtert.",
        passiveNote: "SB-Probe beim Zauberstören um 7 erleichtert. Astrale Meditation und Große Meditation um 2 erleichtert."
    },

    "Kraftkontrolle": {
        type: "active", category: "magic", skill: null,
        description: "Der Zauberkundige spart durch Konzentration bei jedem Zauberspruch oder Ritual einen AsP ein. Einsatz bringt 1 Erschöpfung und kostet eine zusätzliche Aktion Zauberdauer. Jeder Zauber kostet weiterhin mindestens 1 AsP; permanente AsP-Kosten sind nicht betroffen. Wirkt nicht bei elfischer, kristallomantischer oder schelmischer Repräsentation.",
        execute: "kraftkontrolle"
    },

    "Kraftlinienmagie I": {
        type: "passive", category: "magic",
        description: "Ermöglicht alle Nutzungsmöglichkeiten der Kraftlinien (siehe Wege der Zauberei). Proben zum Erkennen von Kraftlinien sind um 5 Punkte erleichtert.",
        passiveNote: "Voller Kraftlinien-Zugang. Erkennungsproben um 5 erleichtert."
    },

    "Kraftlinienmagie II": {
        type: "passive", category: "magic",
        description: "Mit dieser SF kann der Zauberer verschiedene Zauber und Rituale auf und mit Kraftlinien erleichtert durchführen.",
        passiveNote: "Zauber und Rituale auf Kraftlinien erleichtert ausführen."
    },

    "Kraftspeicher": {
        type: "passive", category: "magic",
        description: "Der Zaubernde kann geeignete Objekte mittels ARCANOVI unter Aufwand permanenter AsP in aktive Kraftspeicher verwandeln, die je nach Natur Astralenergie aufnehmen, speichern und abgeben können.",
        passiveNote: "Erschaffen aktiver Kraftspeicher per ARCANOVI (permanente AsP-Kosten)."
    },

    "Kristallomantische Rituale": {
        type: "passive", category: "magic",
        description: "Objektritual (OR): Achaz-Kristallomanten können Edelsteinen besondere Wirkungen geben. Rituale: Kristallbindung, Kristallformung, Thesiskristall, Madakristall, Matrixkristall, Kristallkraft Bündeln.",
        passiveNote: "Verzauberung von Edelsteinen (Achaz-Tradition). Rituale je einzeln erlernbar."
    },

    "Kugelzauber": {
        type: "passive", category: "magic",
        description: "Objektritual (OR): Rituale zur Verzauberung der Kristallkugel, verbreitet in gildenmagischer und Achaz-Zauberei. Bekannte Rituale: Bindung, Brennglas und Prisma, Schutz gegen Untote, Warnendes Leuchten, Kugel des Hellsehers, Kugel des Illusionisten, Orbitarium, Bilderspiel, Fernbild, Bildergalerie, H'Szints Auge, Farben des Geistes, Wachendes Auge.",
        passiveNote: "Verzauberung der Kristallkugel. Rituale je einzeln erlernbar."
    },

    "Lockeres Zaubern": {
        type: "passive", category: "magic",
        description: "Der Schelm kann bei Zaubern in schelmischer Repräsentation eine MR von bis zu 12 ignorieren; eine MR von 13 oder mehr kommt dagegen voll zum Tragen. Nur von koboldischen Lehrmeistern erlernbar, daher exklusiv für Schelmen.",
        passiveNote: "Schelmisch: MR bis 12 wird ignoriert. Nur Schelmen zugänglich."
    },

    "Matrixgeber": {
        type: "passive", category: "magic",
        description: "Der Charakter kann Matrixgeber (besondere magische Artefakte) erschaffen. Der ARCANOVI (Matrixgeber) startet auf einem ZfW von 1/3 des ZfW der höchsten ARCANOVI-Version.",
        passiveNote: "Erschaffen von Matrixgebern. ARCANOVI-Start: 1/3 des höchsten ARCANOVI-ZfW."
    },

    "Matrixkontrolle": {
        type: "passive", category: "magic",
        description: "Durch intensive Beschäftigung mit Metamagie können Kenner dieser SF bestehende Zauber viel einfacher dauerhaft modifizieren. Nach Zusammenrechnung aller Erschwernisse und Erleichterungen bei Proben im Rahmen der Zauberwerkstatt darf der Gesamtzuschlag halbiert werden.",
        passiveNote: "Zauberwerkstatt-Gesamtzuschlag halbieren."
    },

    "Matrixregeneration I": {
        type: "passive", category: "magic",
        description: "Besonders effektiver Weg, Kraft in dauerhafte astrale Muster zu leiten. Der Rückkauf permanenter AsP kostet nur 40 AP; es werden nur 20 ZE für die Übungen benötigt.",
        passiveNote: "Permanente AsP-Rückkauf: nur 40 AP / 20 ZE statt üblicher Kosten."
    },

    "Matrixregeneration II": {
        type: "passive", category: "magic",
        description: "Verstärkte Matrixregeneration. Die Kosten für die Wiedergewinnung permanent investierter AsP sinken auf 30 AP / 15 ZE.",
        passiveNote: "Permanente AsP-Rückkauf: nur 30 AP / 15 ZE."
    },

    "Matrixverständnis": {
        type: "passive", category: "magic",
        description: "Besonderer intuitiver Zugang zu den Grundstrukturen der Spruchzauberei. Spontane Modifikationen kosten keine zusätzliche Zeit (außer verlängerte Zauberdauer), auch bei Fremdrepräsentationen anwendbar. Eine Spontane Modifikation mehr als die Leiteigenschaft ergibt. Kristallomanten erhalten einen besonderen Vorteil.",
        passiveNote: "Spontane Modifikationen ohne Zeitaufwand; eine extra Modifikation; auch in Fremdrepräsentation."
    },

    "Meisterliche Regeneration": {
        type: "passive", category: "magic",
        description: "Der Zauberer regeneriert ohne Würfelwurf pro Ruhephase KL/3+3 (oder IN/3+3, je nach Tradition) AsP (plus eventuelle Vor-/Nachteile). Bei gelingender IN-Probe zusätzlich einen Punkt. Muss sich vor dem Einschlafen kurz konzentrieren.",
        passiveNote: "Feste AsP-Regen pro Nacht: KL/3+3 oder IN/3+3 (je Tradition) ohne Würfeln."
    },

    "Meisterliche Zauberkontrolle I": {
        type: "active", category: "magic", skill: null,
        description: "Der Zaubernde kann jeden Spruch in der letzten Aktion der Spruchdauer freiwillig abbrechen (kostet wie misslungener Spruch, aber kein Wiederholungsmalus). ZfP* können vor Einrechnen der gegnerischen MR zurückgehalten und ungenutzt verfallen gelassen werden, um gezieltere Effekte zu erzielen.",
        execute: "zauberkontrolle_info"
    },

    "Meisterliche Zauberkontrolle II": {
        type: "active", category: "magic", skill: null,
        description: "Der Zaubernde kann während der Wirkungsdauer eines Spruchs diesen unterdrücken und wieder zur Wirkung kommen lassen (quasi ab- und anschalten). Für beide Vorgänge ist je eine erfolgreiche Zauberprobe und eine Aktion erforderlich.",
        execute: "zauberkontrolle_info"
    },

    "Merkmalskenntnis": {
        type: "passive", category: "magic",
        description: "Besondere Einblicke in ein Merkmal von Zaubern: Alle Zauber mit diesem Merkmal können eine Spalte leichter erlernt werden. Stufe I: Dämonisch (Domäne), Elementar (Element), Geisterwesen, Heilung, Herbeirufung, Illusion, Schaden, Telekinese, Verständigung. Stufe II: Antimagie, Beschwörung, Eigenschaften, Einfluss, Form, Hellsicht, Herrschaft, Kraft, Objekt, Umwelt. Stufe III: Dämonisch (gesamt), Elementar (gesamt), Limbus, Metamagie, Temporal.",
        passiveNote: "Alle Zauber des gewählten Merkmals eine Spalte leichter erlernen."
    },

    "Nekromant": {
        type: "passive", category: "magic",
        description: "Kenner dieser SF müssen weniger AsP für die Erhebung von Untoten oder die Dienste eines Nephazz-Dämons aufbringen. Ihre Untoten sind zudem loyaler als üblich.",
        passiveNote: "Reduzierte AsP-Kosten für Untote/Nephazz-Dienste; höhere Loyalität der Untoten."
    },

    "Odûn-Gaben": {
        type: "passive", category: "magic",
        description: "Einweihungsstufen der Gjalskerländer Tierkrieger (Durro-Dûn) in das Wesen ihres tierischen Leit-Geists: Hauch des Odûn, Haut des Odûn, Blut des Odûn, Ruf des Odûn, Seele des Odûn. Jede Stufe einzeln erlernbar.",
        passiveNote: "Fünfstufige Einweihung in den Leit-Geist (Durro-Dûn-Tradition). Jede Stufe einzeln."
    },

    "Ottagaldr": {
        type: "passive", category: "magic",
        description: "Das Bund-Lied einer thorwalschen Otta stellt eine blutmagische, erweiterte Variante eines UNITATIO dar und erlaubt es einem Schiffsmagier, mit der Lebenskraft der Schiffsbesatzung zu zaubern. Nur an der Runajasko zu Olport erlernbar.",
        passiveNote: "Thorwalscher Schiffsmagier: zaubern mit Lebenskraft der Besatzung (UNITATIO-Variante)."
    },

    "Regeneration I": {
        type: "passive", category: "magic",
        description: "Der Zauberer führt vor einer Ruhephase Meditationstechniken aus (ca. 15 Min.) und regeneriert in der folgenden Ruhephase 1W6+1 AsP (statt üblicher 1W6). Wird mit Umweltbedingungen, Vorteilen/Nachteilen verrechnet.",
        passiveNote: "Astralregen. in Ruhephase: 1W6+1 AsP (statt 1W6)."
    },

    "Regeneration II": {
        type: "passive", category: "magic",
        description: "Verstärkte Variante der SF Regeneration I. Die Meditation dauert nicht länger, aber die regenerierten AsP betragen 1W6+2.",
        passiveNote: "Astralregen. in Ruhephase: 1W6+2 AsP (statt 1W6). Stärker als Regeneration I."
    },

    "Repräsentation": {
        type: "passive", category: "magic",
        description: "Kenntnis einer Zaubertradition (Repräsentation): Ermöglicht das Erlernen von Zaubern in der entsprechenden Repräsentation gemäß Grundschwierigkeit. Zauber in fremder Repräsentation werden um zwei Spalten schwieriger erlernt. Bekannte Repräsentationen: Achaz-Kristallomantisch, Borbaradianisch, Druidisch, Elfisch, Geodisch, Gildenmagisch, Hexisch, Scharlatanisch, Schelmisch.",
        passiveNote: "Zauber der eigenen Tradition ohne Aufschlag erlernen. Fremdrepräsentation: +2 Spalten."
    },

    "Ritualkenntnis": {
        type: "passive", category: "magic",
        description: "Talent-artige Fertigkeit: Ermöglicht Erkennen, Erlernen und Durchführen von Ritualen einer magischen Tradition. RkW (Ritualkenntniswert) bestimmt die erlernbaren Rituale (üblicherweise RkW ≥ 2×Grad). Steigerung nach Spalte E (eigene Tradition), Spalte D (Alchimie/Scharlatan), oder teurer bei unbekannter Repräsentation. Startwert: 3.",
        passiveNote: "Talent für Rituale der eigenen Tradition. RkW muss je Ritual-Grad-Anforderung erfüllen."
    },

    "Runenkunde": {
        type: "passive", category: "magic",
        description: "Ermöglicht das Anbringen einzeln erlernbarer Zauberrunen an Objekten oder auf Lebewesen (z.B. Schiffskiele, thorwalsche Piraten) per Handwerkstalent (Holzbearbeitung, Tätowieren). Aktiviert Ritualkenntnis (Runenzauberei) auf Startwert 3, steigerbar nach Spalte E.",
        passiveNote: "Anbringen von Zauberrunen per Handwerk. Aktiviert Ritualkenntnis Runenzauberei (Start 3, Spalte E)."
    },

    "Spontanzeichen": {
        type: "passive", category: "magic",
        description: "Ermöglicht das Erstellen von Arkanoglyphen (Variante: Spontanzeichen (Arkanoglyphen)) oder Runen (Variante: Spontanzeichen (Runenkunde)) als Schnellversion: Die Erstellung dauert nur so viele Spielrunden wie die Komplexität des Zeichens beträgt. Einschränkungen: RkP* werden bei der Berechnung der Wirkung halbiert, das Zeichen hält nur bis zum nächsten Sonnenaufgang und ist nicht reaktivierbar. Erstellung nur per schnell ausführbarem Handwerkstalent (üblicherweise Malen/Zeichnen). Bann- und Schutzkreise können so als Feldversion erstellt werden. Kosten: 200 AP; Verbreitung: 4.",
        passiveNote: "Arkanoglyphen/Runen in Komplexität-SR erstellen. RkP* halbiert, hält bis Sonnenaufgang. Nicht reaktivierbar."
    },

    "Bewahrer der Ahnenmacht": {
        type: "passive", category: "magic",
        description: "Nekromantische Sonderfertigkeit (aus: Von Toten und Untoten). Voraussetzungen: MU 15, SF Herr über die Gebeine. Verbreitung: 1 (Schwarzes Buch Thargun und einzelne Lehrmeister). Kosten: 150 AP. Ermöglicht dem Nekromanten, Untote aus Knochen, totem Fleisch oder Leichenteilen zu konstruieren und zu erwecken sowie Goleme nach nekromantischen Regeln zu erschaffen.",
        passiveNote: "Nekromant. Untote/Goleme aus Leichenteilen. Voraus.: MU 15, Herr über die Gebeine. V:1."
    },

    "Salasandra": {
        type: "passive", category: "magic",
        description: "Fähigkeit eines Elfen, mit seiner Sippe in geistiger Harmonie zu verschmelzen. Im Salasandra können viele Erfahrungen, Eindrücke und Fertigkeiten ausgetauscht und dadurch leichter erlernt werden.",
        passiveNote: "Elfisch: Geistige Harmonie mit der Sippe; Erfahrungsaustausch und erleichtertes Lernen."
    },

    "Schalenzauber": {
        type: "passive", category: "magic",
        description: "Objektritual (OR): Rituale, die die Schale zu einem Werkzeug der Alchimisten machen. Rituale: Weihe der Schale, Allegorische Analyse, Chymische Hochzeit, Mandricons Bindung, Feuer und Eis, Transmutation der Elemente.",
        passiveNote: "Verzauberung der alchimistischen Schale. Rituale einzeln erlernbar."
    },

    "Schamanistische Rituale": {
        type: "passive", category: "magic",
        description: "Basis des animistischen Zauberwirkens. Erfordern eine Probe auf eine Ritualfertigkeit des Schamanen und AsP. Den einzelnen Traditionen zugeordnet, in sechs Grade aufgeteilt. RkW ≥ 2×Grad zum Erlernen erforderlich. Rituale fremder Traditionen gelten als einen Grad höher.",
        passiveNote: "Schamanische Rituale (Probe auf Ritualfertigkeit + AsP). Grad 1–6, je Tradition."
    },

    "Schlangenring-Zauber": {
        type: "passive", category: "magic",
        description: "Objektritual (OR): Geodische Rituale, die den geweihten Halsring mit Fähigkeiten versehen. Rituale: Weihe der Schlange, Magnetismus, Wasserbann, Macht über den Regen, Seelenfeuer, Herr der Flammen, Macht des Lebens, Kräfte der Natur, Wirbelnder Luftschild, Launen des Windes, Weg durch Sumus Leib. RkW-Voraussetzungen: 3–15.",
        passiveNote: "Geodische Halsring-Verzauberung. Rituale einzeln erlernbar (RkW-Anforderungen)."
    },

    "Schuppenbeutel": {
        type: "passive", category: "magic",
        description: "Objektritual (OR): Bindung des Schuppenbeutels, Suchende Finger, Ewige Wegzehrung. Rituale des Kristallomanten für seinen Schuppenbeutel.",
        passiveNote: "Kristallomantische Schuppenbeutel-Rituale (Bindung, Suchende Finger, Ewige Wegzehrung)."
    },

    "Semipermanenz I": {
        type: "passive", category: "magic",
        description: "Der Charakter kann semipermanente Artefakte erschaffen. Der ARCANOVI (Semipermanenz) startet auf einem ZfW von 1/3 des ZfW der höchsten ARCANOVI-Variante.",
        passiveNote: "Erschaffen semipermanenter Artefakte. ARCANOVI-Start: 1/3 höchster ARCANOVI-ZfW."
    },

    "Semipermanenz II": {
        type: "passive", category: "magic",
        description: "Kennt eine Technik, um semipermanente Spruchspeicher mit kurzen Anwendungsintervallen weniger aufwendig zu erschaffen. Sehr seltenes Geheimnis einer Handvoll Großmeister der Artefaktmagie.",
        passiveNote: "Semipermanente Spruchspeicher mit kurzen Intervallen effizienter erschaffen."
    },

    "Signaturkenntnis": {
        type: "passive", category: "magic",
        description: "Ermöglicht das Erkennen bestimmter Zauberkundiger anhand charakteristischer Merkmale ihrer Zauberwirkungen oder Artefakte ('magischer Fingerabdruck'). Spezialisierung auf Variante 'Signatur erkennen' bei ODEM, ANALYS, OCULUS. Probe um 2 erleichtert; ohne diese SF keine entsprechende Variante möglich.",
        passiveNote: "Magischen Fingerabdruck erkennen (ODEM/ANALYS/OCULUS). Probe +2 erleichtert."
    },

    "Simultanzaubern": {
        type: "passive", category: "magic",
        description: "Üblich sind –3 Punkte auf die Zauberprobe pro noch wirkendem (A)-Zauber, den der Zaubernde aufrechterhalten muss. Mit dieser SF sinkt der Malus auf –1 pro noch wirkendem (A)-Zauber.",
        passiveNote: "Malus für gleichzeitige (A)-Zauber nur –1/Zauber statt –3/Zauber."
    },

    "Stabzauber": {
        type: "passive", category: "magic",
        description: "Objektritual (OR): Die Objektrituale der Gildenmagier. Rituale: Bindung, Ewige Flamme, Seil des Adepten, Stabverlängerung, Hammerschlag, Kraftfokus, Modifikationsfokus, Zauberspeicher, Merkmalsfokus, Flammenschwert, Schuppenhaut. Jedes einzeln erlernbar.",
        passiveNote: "Gildenmagischer Stab: Objektrituale zur Verzauberung (11 Rituale). Je einzeln erlernbar."
    },

    "Stapeleffekt": {
        type: "passive", category: "magic",
        description: "Der Zaubernde kann bei der Artefaktherstellung mittels ARCANOVI die ZfP* einzelner Wirkender Sprüche aufsummieren, um einen stärkeren Gesamteffekt zu erzielen.",
        passiveNote: "ARCANOVI: ZfP* mehrerer Sprüche für stärkeren Artefakteffekt stapeln."
    },

    "Tanz der Mada": {
        type: "passive", category: "magic",
        description: "Dieser Meditationstanz erlaubt Gildenmagiern, ihre körperlichen Eigenschaften zu verbessern. Regelmäßige Übungen (1/2 Std./Tag, 2 ZE/Woche) über ein halbes Jahr erlauben eine Spezielle Erfahrung in Akrobatik, Athletik, Körperbeherrschung, Schleichen, Selbstbeherrschung, Sinnenschärfe, Stäbe oder Tanzen (bis TaW 10).",
        passiveNote: "Halbjährliche Übung: Spezielle Erfahrung in körperlichem Talent (bis TaW 10)."
    },

    "Tierischer Begleiter": {
        type: "passive", category: "magic",
        description: "Der Elf geht eine gedankliche Verbindung mit einem dauerhaften Begleiter (Reittier, Seelentier) ein und kann dadurch bestimmte Zauber als Spontane Modifikation auch auf dieses Tier ausweiten.",
        passiveNote: "Elfisch: Zauberausweitung auf dauerhaften Tier-Begleiter als Spontane Modifikation."
    },

    "Traumgänger": {
        type: "passive", category: "magic",
        description: "Der Zauberkundige kennt sich sehr gut in den Träumen anderer aus. Alle Proben auf Zauber/Rituale zum Eindringen in Traumwelten, Ändern von Traumbedingungen sowie Heilkunde Seele sind um 3 Punkte erleichtert, wenn er an den Träumen des Patienten teilhaben konnte.",
        passiveNote: "Traumzauber/-rituale und Heilkunde Seele um 3 erleichtert (nach Traumteilhabe)."
    },

    "Trommelzauber": {
        type: "passive", category: "magic",
        description: "Die Derwische (Rastullahs Rufer der Macht) erzeugen mit ihren Dablas hypnotische Klänge, die kämpferische Fähigkeiten stärken können. Rituale: Ruf des Krieges, Sturm der Wüste, Schutz Rastullahs, Rastullahs Güte, Zorn des Gottgefälligen. Je einzeln erlernbar.",
        passiveNote: "Derwisch-Trommelrituale (5 Rituale). Je einzeln erlernbar."
    },

    "Verbotene Pforten": {
        type: "active", category: "magic", skill: null,
        description: "Der Zaubernde kann LeP statt AsP einsetzen. Vorbedingung: 1 Aktion Konzentration + gelungene SB-Probe+10. Können die AsP-Kosten nicht vollständig bezahlt werden, ist LeP-Bezahlung im Verhältnis 1:1 möglich. Zauberprobe ist um 2 Punkte erschwert. Jeder so gewirkte Zauber verbraucht zudem 1W3 LeP und bringt 1 Erschöpfung.",
        execute: "verbotene_pforten_info"
    },

    "Vertrautenbindung": {
        type: "passive", category: "magic",
        description: "Ritual: Die Hexe oder der Geode bindet ein Tier als Vertrauten.",
        passiveNote: "Tier als Vertrauten binden (Hexe/Geode/Zibilja/Goblin-Schamanin)."
    },

    "Vielfache Ladungen": {
        type: "passive", category: "magic",
        description: "Verzauberungstechnik: Artefakte mit vielen Anwendungen und Wirkenden Sprüchen einfacher erschaffen. Bei ARCANOVI-Proben ändert sich die benötigte Anzahl ZfP* im Punkt 'Anzahl der Wirkenden Sprüche'. Nur bei ladungsbasierten Spruchspeichern anwendbar.",
        passiveNote: "Ladungsbasierte Spruchspeicher mit mehr Anwendungen effizienter erschaffen."
    },

    "Zauber bereithalten": {
        type: "active", category: "magic", skill: null,
        description: "Kann einen Zauberspruch wirken, aber bis zu MU Aktionen damit warten, ihn loszuschicken. Bei reiner Schritt-Aktion ist keine Probe nötig; jede andere Aktion erfordert eine SB-Probe (erschwert um halbe AsP des gespeicherten Spruchs). Misslingt die Probe, geht der Spruch sofort los und trifft das nächststehende gültige Ziel.",
        execute: "zauber_bereithalten_info"
    },

    "Zauber unterbrechen": {
        type: "active", category: "magic", skill: null,
        description: "Kann während der Zauberdauer einen Spruch unterbrechen, eine einzelne Aktion ausführen, dann eine Selbstbeherrschungs-Probe ablegen und anschließend den Spruch fortsetzen und beenden.",
        execute: "zauber_unterbrechen_info"
    },

    "Zauber vereinigen": {
        type: "passive", category: "magic",
        description: "Kenner dieser SF können in einem UNITATIO-Zirkel deutlich mehr ZfP* zur Gesamtwirkung beisteuern.",
        passiveNote: "Im UNITATIO-Zirkel: erhöhter ZfP*-Beitrag möglich."
    },

    "Zauberzeichen": {
        type: "passive", category: "magic",
        description: "Ermöglicht das Anbringen von Arkanoglyphen an Orten oder Objekten per Handwerkstalent (Malen/Zeichnen, Webkunst) und löst damit unter AsP-Einsatz zauberspruchähnliche Wirkungen an Truhen oder Tordurchgängen aus. Erfordert eine zugehörige Ritualkenntnis.",
        passiveNote: "Arkanoglyphen anbringen (Malen/Webkunst) für magische Fallen/Schutz. Ritualkenntnis erforderlich."
    },

    "Zauberkontrolle": {
        type: "passive", category: "magic",
        description: "Der Zaubernde kann jeden von ihm gesprochenen Spruch nach Belieben noch während seiner Wirkungsdauer aufheben (auch bei nicht-(A)-Zaubern). Kann das Ergebnis seiner Zauberprobe einschätzen und bemerkt bereits nach einer Aktion, ob sein Zauber gelingen wird oder nicht.",
        passiveNote: "Wirkende Sprüche jederzeit aufheben. Kann Zauberergebnis nach 1 Aktion vorhersehen."
    },

    "Zauberroutine": {
        type: "passive", category: "magic",
        description: "Misslungene Sprüche können ohne Zuschlag auf die Probe wiederholt werden (statt je +3 pro Wiederholung); außerdem dauern wiederholte Proben nicht länger. Bei Elfen verlängert sich die Zauberdauer bei Wiederholungen nur um 3 Aktionen.",
        passiveNote: "Wiederholung misslungener Zauber ohne Steigerungsmalus und ohne Zeitverlängerung."
    },

    "Zauberspezialisierung": {
        type: "passive", category: "magic",
        description: "Spezialisierung auf einen bestimmten Aspekt eines Zaubers: +2 auf den effektiven ZfW im spezialisierten Aspekt. Als Spezialisierung kann eine Modifikation oder Variante gewählt werden. Ein Zauber kann nur von einer Spezialisierung profitieren.",
        passiveNote: "Gewählter Zauberaspekt: +2 ZfW. Voraussetzung ZfW 7/14/21/28 je nach Anzahl."
    },

    "Zibilja-Rituale": {
        type: "passive", category: "magic",
        description: "Objekt-Verzauberungen und Sippen-Stärkungs-Zauber der Zibiljas. Rituale: Schwarmseele, Mackestopp, Traumseherin, Weisheit der Schrift, Siegel der Ewigen Ruhe, Unsichtbare Chronik, Ruf des Bienenstocks, Winterlager, Bienenschwarm, Wachshaut, Bienenkönigin, Bienenfleiß, Bienentanz, Traumwissen.",
        passiveNote: "Zibilja-Tradition: Sippen- und Objekt-Rituale. Jedes einzeln erlernbar."
    },

    // ===========================
    // KARMALE SFs
    // ===========================

    "Akoluth": {
        type: "passive", category: "karmal",
        description: "Ein Akoluth ist ein dienendes Mitglied seiner Kirche (Ordensmitglied, Laienprediger, Altarhelfer). Er schuldet seinen Ordensoberen Gehorsam, kann zu Missionen im Dienste der Gottheit aufgefordert werden, und sein SO steigt um +1. Er hat gelernt, rituelle Handlungen eines Priesters zu unterstützen und damit dessen Mirakelprobe zu erleichtern. Er erhält die SF Liturgiekenntnis seiner Kirche auf einem Wert von 3 und ist damit in der Lage, Entrückung zu erfahren.",
        passiveNote: "SO +1. Liturgiekenntnis (Wert 3). Kann Entrückung erfahren. Gehorsam gegenüber Ordensoberen."
    },

    "Aura der Heiligkeit": {
        type: "active", category: "karmal", skill: null,
        description: "Ein Geweihter kann die ihm verliehene göttliche Kraft 'wie die Aura einer leibhaftigen Gottheit' verströmen. Dies äußert sich in Manifestationen wie bei Mirakeln (Aureole, Schmetterlinge, Dunkelheit etc.). Aktiviert und deaktiviert per Probe auf die Liturgiekenntnis. Kostet 1 KaP pro SR.",
        execute: "aura_heiligkeit_info"
    },

    "Karmalqueste": {
        type: "active", category: "karmal", skill: null,
        description: "Durch zweiwöchige Versenkungsübungen und eine Mirakelprobe gewinnt der Geweihte permanent KaP zu seinem Grundvorrat: IN/4 + LkP*/10 KaP (für nicht-alveranische Götter: IN/5 + LkP*/10). Damit verbunden ist eine Entrückung in Höhe des Zehnfachen der gewonnenen KaP. Nur einmal pro Jahr üblich.",
        execute: "karmalqueste_info"
    },

    "Kontakt zum Großen Geist": {
        type: "passive", category: "karmal",
        description: "Der Schamane hat die 'zweite Initiation' zum Hochschamanen (Nivesen, Waldmenschen, Utulus, Orks/Tairach) erhalten und ist damit einer nicht-alveranischen Gottheit geweiht. Er verfügt über 12 KaP Grundvorrat, die Fähigkeit zum Wirken von Mirakeln und darf passende Liturgien im Wert von 8 Liturgiegraden erwerben. Die Regelung zur Weihe von Zauberern gilt für Hochschamanen nicht.",
        passiveNote: "12 KaP Grundvorrat. Mirakel wirken. 8 Liturgiegrade erlernbar."
    },

    "Liturgiekenntnis": {
        type: "passive", category: "karmal",
        description: "Der Geweihte kann Liturgien und Anrufungen seiner Kirche erlernen und durchführen. Wird wie eine Gabe gehandhabt; Probe auf MU/IN/CH. Startwert: 3. Steigerung erfordert Lehrmeister, nach Spalte F.",
        passiveNote: "Liturgiekenntnis-Wert (MU/IN/CH). Startwert 3. Voraussetzung für Liturgien und Entrückung."
    },

    "Liturgien": {
        type: "passive", category: "karmal",
        description: "Formalisierte Rituale, mit denen der Geweihte die ordnende Kraft seiner Karmaenergie verströmt, um der Umgebung einen Aspekt seiner Gottheit nahezubringen. In sechs Grade aufgeteilt. Voraussetzung: Liturgiekenntnis-Wert ≥ dreifacher Grad. Liturgien fremder Kirchen gelten als einen Grad höher. Anwendung erfordert eine Mirakelprobe und den Einsatz von KaP.",
        passiveNote: "KaP-basierte Rituale des Geweihten (Grad 1–6). LkW ≥ 3×Grad erforderlich."
    },

    "Ritualkenntnis (Schamanentradition)": {
        type: "passive", category: "karmal",
        description: "Der Zauberkundige ist in der Lage, Rituale einer schamanistischen Tradition zu erkennen, erlernen und durchzuführen. Setzt sich zusammen aus vier Ritualfertigkeiten: Geister rufen (MU/IN/CH), Geister bannen (MU/CH/KK), Geister binden (KL/IN/CH) und Geister aufnehmen (MU/IN/KO). Jede hat einen eigenen RkW; Startwert: 3; Steigerung nach Spalte E (Spalte G bei Tradition ohne Repräsentation).",
        passiveNote: "Vier Schamanenfähigkeiten (Geister rufen/bannen/binden/aufnehmen), je RkW-Startwert 3, Spalte E."
    },

    "Spätweihe": {
        type: "passive", category: "karmal",
        description: "Der Held hat im Erwachsenenalter eine einjährige Ausbildung zum Priester erhalten und ist einer alveranischen Gottheit (24 KaP) oder einer nicht-alveranischen/Halbgott-Gottheit (12 KaP) geweiht. Enthält die passende Liturgiekenntnis auf Wert 3, die Fähigkeit zum Wirken von Mirakeln sowie Liturgien im Gegenwert von 16/8 Liturgiegraden. Der SO steigt auf den Mindestwert der Geweihten-Profession oder um 1.",
        passiveNote: "Alveranisch: 24 KaP, 16 LG. Nicht-alveranisch: 12 KaP, 8 LG. LkW 3. SO-Anpassung."
    },

    // ===========================
    // ALLGEMEINE SFs
    // ===========================

    "Akklimatisierung": {
        type: "passive", category: "general",
        description: "Erlaubt es, den Effekt von Hitzeresistenz bzw. Kälteresistenz nachträglich zu erlernen. Wesen mit dieser SF erleiden durch außergewöhnliche Umgebungstemperaturen keinen Schaden, solange diese im erträglichen Rahmen bleiben. Schützt nicht gegen Zauber auf Feuer- oder Eisbasis.",
        passiveNote: "Keine Temperaturschäden im erträglichen Rahmen (Hitze oder Kälte, je nach Variante)."
    },

    "Berufsgeheimnis": {
        type: "passive", category: "general",
        description: "Der Held hat von einem Zunftmeister ein Geheimnis der Handwerkskunst erfahren, das ihm besondere Herstellungsverfahren oder die Verwendung spezieller Materialien erlaubt (z.B. Damaszierung, Zwergenspan, Elfenbausch, Spinnenseide, Hand-Torsionswaffen). Die entsprechenden Regelungen und Boni dürfen nur genutzt werden, wenn der Held das passende Berufsgeheimnis kennt.",
        passiveNote: "Erlaubt Nutzung besonderer Handwerkstechniken/-materialien (je nach erworbenem Geheimnis)."
    },

    "Fälscher": {
        type: "passive", category: "general",
        description: "Ermöglicht das effektive Fälschen von Schriftstücken und Kunstwerken (Nachahmen fremder Schriften, falsche Siegel, Alterungstechniken u.a.). Erleichtert alle Proben, die sich um eine Fälschung drehen, um 3 Punkte. Proben zum Enttarnen der Fälschung (Sinnenschärfe, Wissenstalente) sind um 5 Punkte erschwert. Hilft auch beim Erkennen von Fälschungen: eigene Enttarnungsproben um 5 Punkte erleichtert.",
        passiveNote: "Fälschungsproben +3 erleichtert. Gegnerische Enttarnung +5 erschwert. Eigene Enttarnung +5 erleichtert."
    },

    "Geländekunde": {
        type: "passive", category: "general",
        description: "Der Held ist mit einer bestimmten Art von Wildnis besonders vertraut; alle Proben, die sich auf den Umgang mit dieser Wildnis beziehen (Wettervorhersage, Wildnisleben, Tier- und Pflanzenkunde, Sinnenschärfe, Fährtensuchen), sind um 3 Punkte erleichtert. Ermöglicht außerdem das Vorahnen typischer regionaler Phänomene.\nMögliche Arten: Dschungelkundig, Eiskundig, Gebirgskundig, Höhlenkundig, Maraskankundig, Meereskundig, Steppenkundig, Sumpfkundig, Waldkundig, Wüstenkundig. Kann mehrfach gewählt werden.",
        passiveNote: "+3 auf Wildnis-Proben im entsprechenden Gelände (Wettervorhersage, Wildnisleben, Tier-/Pflanzenkunde u.a.)."
    },

    // Alias-Keys für alle Geländekunde-Varianten — das System speichert den
    // spezifischen Variantennamen (z.B. "Höhlenkundig"), der NICHT mit dem
    // Prefix "Geländekunde" startet. Daher eigene Keys mit identischen Inhalten.
    "Dschungelkundig":  { type: "passive", category: "general", description: "Geländekunde (Dschungel). Der Held ist mit dem Dschungel besonders vertraut; alle Proben zu Wettervorhersage, Wildnisleben, Tier-/Pflanzenkunde, Sinnenschärfe und Fährtensuchen im Dschungel sind um 3 Punkte erleichtert.", passiveNote: "+3 auf Wildnis-Proben im Dschungel." },
    "Eiskundig":        { type: "passive", category: "general", description: "Geländekunde (Eis/Ewiges Eis). Der Held ist mit Eislandschaften besonders vertraut; alle Proben zu Wettervorhersage, Wildnisleben, Tier-/Pflanzenkunde, Sinnenschärfe und Fährtensuchen im Eis sind um 3 Punkte erleichtert.", passiveNote: "+3 auf Wildnis-Proben im Eis." },
    "Gebirgskundig":    { type: "passive", category: "general", description: "Geländekunde (Gebirge). Der Held ist mit Gebirgslandschaften besonders vertraut; alle Proben zu Wettervorhersage, Wildnisleben, Tier-/Pflanzenkunde, Sinnenschärfe und Fährtensuchen im Gebirge sind um 3 Punkte erleichtert.", passiveNote: "+3 auf Wildnis-Proben im Gebirge." },
    "Höhlenkundig":     { type: "passive", category: "general", description: "Geländekunde (Höhlen/Unterirdisch). Der Held ist mit unterirdischen Gebieten besonders vertraut; alle Proben zu Wildnisleben, Sinnenschärfe, Fährtensuchen und Orientierung unter der Erde sind um 3 Punkte erleichtert.", passiveNote: "+3 auf Wildnis-Proben in Höhlen und unterirdischen Gebieten." },
    "Maraskankundig":   { type: "passive", category: "general", description: "Geländekunde (Maraskan). Der Held ist mit der Insel Maraskan besonders vertraut; alle Proben zu Wettervorhersage, Wildnisleben, Tier-/Pflanzenkunde, Sinnenschärfe und Fährtensuchen auf Maraskan sind um 3 Punkte erleichtert.", passiveNote: "+3 auf Wildnis-Proben auf Maraskan." },
    "Meereskundig":     { type: "passive", category: "general", description: "Geländekunde (Meer/Küste). Der Held ist mit maritimen Gebieten besonders vertraut; alle Proben zu Wettervorhersage, Seefahrt, Sinnenschärfe und Orientierung auf See sind um 3 Punkte erleichtert.", passiveNote: "+3 auf Wildnis-Proben auf See und an der Küste." },
    "Steppenkundig":    { type: "passive", category: "general", description: "Geländekunde (Steppe). Der Held ist mit Steppenlandschaften besonders vertraut; alle Proben zu Wettervorhersage, Wildnisleben, Tier-/Pflanzenkunde, Sinnenschärfe und Fährtensuchen in der Steppe sind um 3 Punkte erleichtert.", passiveNote: "+3 auf Wildnis-Proben in der Steppe." },
    "Sumpfkundig":      { type: "passive", category: "general", description: "Geländekunde (Sumpf). Der Held ist mit Sumpflandschaften besonders vertraut; alle Proben zu Wettervorhersage, Wildnisleben, Tier-/Pflanzenkunde, Sinnenschärfe und Fährtensuchen im Sumpf sind um 3 Punkte erleichtert.", passiveNote: "+3 auf Wildnis-Proben im Sumpf." },
    "Waldkundig":       { type: "passive", category: "general", description: "Geländekunde (Wald). Der Held ist mit Waldgebieten besonders vertraut; alle Proben zu Wettervorhersage, Wildnisleben, Tier-/Pflanzenkunde, Sinnenschärfe und Fährtensuchen im Wald sind um 3 Punkte erleichtert.", passiveNote: "+3 auf Wildnis-Proben im Wald." },
    "Wüstenkundig":     { type: "passive", category: "general", description: "Geländekunde (Wüste). Der Held ist mit Wüstenlandschaften besonders vertraut; alle Proben zu Wettervorhersage, Wildnisleben, Tier-/Pflanzenkunde, Sinnenschärfe und Fährtensuchen in der Wüste sind um 3 Punkte erleichtert.", passiveNote: "+3 auf Wildnis-Proben in der Wüste." },

    "Kulturkunde": {
        type: "passive", category: "general",
        description: "Erlaubt es, Erschwernisse durch Fremdkultur (normalerweise 3–15 Punkte auf gesellschaftliche und Wissenstalente) zu ignorieren. Zuschläge, die auch für Mitglieder der Kultur gelten (z.B. SO-Differenz), werden nicht beeinflusst.\nKann für zahlreiche Kulturen erworben werden (Mittelreich, Tulamidenlande, Elfen, Zwerge, Orks, Trolle u.v.m.).",
        passiveNote: "Fremdkultur-Erschwernisse auf Gesellschafts- und Wissenstalente werden ignoriert (je nach gewählter Kultur)."
    },

    "Meister der Improvisation": {
        type: "passive", category: "general",
        description: "Erlaubt es, fehlendes Werkzeug durch improvisierte Hilfsmittel zu kompensieren. Eventuelle Probenzuschläge durch schlechtes oder fehlendes Werkzeug werden halbiert, wenn der Held genügend Zeit hat, Alternativen zu suchen. Bei Handwerksproben auf ein Talent, das der Held nicht besitzt (Ausweichen auf anderes Talent), gelten nur die Hälfte der Erschwernisse.",
        passiveNote: "Werkzeug-Zuschläge bei Improvisation halbiert. Ausweichtalent-Erschwernisse halbiert."
    },

    "Nandusgefälliges Wissen": {
        type: "passive", category: "general",
        description: "Der Held besitzt eine fantastische Allgemeinbildung und kann Wissen aus verwandten Gebieten kombinieren. Beim Ableiten eines nicht vorhandenen Wissenstalents (auch auf Klugheit) gelten nur die Hälfte der Erschwernisse. Der Held braucht nur die halbe Zeit für Bibliotheksrecherchen.",
        passiveNote: "Ableit-Erschwernisse auf Wissenstalente halbiert. Bibliotheksrecherche in halber Zeit."
    },

    "Ortskenntnis": {
        type: "passive", category: "general",
        description: "Der Held kennt ein bestimmtes Gebiet (max. 100 Rechtmeilen, oder eine Strecke/Straße ähnlicher Größe) mit all seinen Wegen, Wetterverhältnissen, Straßenbedingungen und lokalen Eigenheiten. In Städten ab 10.000 Einwohnern gilt sie nur für einen Stadtteil.\nSpieltechnisch: bis zu 7 Punkte Probenzuschläge auf passende Talente (Wildnisleben, Orientierung, Gassenwissen) werden ignoriert, wenn der Held am passenden Ort ist. Kann mehrfach für verschiedene Gebiete gewählt werden.",
        passiveNote: "Bis zu 7 Punkte Probenzuschläge auf Orientierung/Wildnisleben/Gassenwissen am bekannten Ort ignoriert."
    },

    "Rosstäuscher": {
        type: "passive", category: "general",
        description: "Der Held kennt Methoden, Tiere (v.a. Pferde) gezielt optisch aufzuwerten, um höhere Verkaufspreise zu erzielen. Bei allen Tätigkeiten rund ums Verschönern von Pferden ((Sich) Verkleiden, Tierkunde, Abrichten, Pflanzenkunde, Alchimie, Menschenkenntnis, Überreden) hat der Held einen um 5 Punkte verbesserten TaW. Dieser Bonus gilt auch, wenn er erkennen will, ob ein Tier so behandelt wurde.",
        passiveNote: "+5 auf pferdebezogene Talente (Tierkunde, Abrichten, Überreden u.a.) beim Verschönern oder Erkennen."
    },

    "Standfest": {
        type: "passive", category: "general",
        description: "Die erlernbare schwächere Variante des Vorteils Balance. Erleichtert alle Körperbeherrschungs-, Athletik- und Akrobatik-Proben um 2 und GE-Proben um 1, wenn es ums Balancehalten oder Stehenbleiben auf schwankendem Untergrund geht. Hilft auch im Kampf, nach bestimmten Manövern stehen zu bleiben oder einen Patzer-Sturz zu vermeiden.",
        passiveNote: "+2 auf Körperbeherrschung/Athletik/Akrobatik und +1 auf GE-Proben beim Balancehalten."
    },

    "Talentspezialisierung": {
        type: "passive", category: "general",
        description: "Der Held hat sich in einem Bereich eines Talents besonders spezialisiert (z.B. Überreden: Betteln/Feilschen/Lügen; Geschichtswissen nach Kultur; Grobschmied: Schwarzschmied/Waffenschmied/Plättner/Spengler). Im gewählten Spezialgebiet verfügt der Held über einen um 2 Punkte höheren effektiven TaW.",
        passiveNote: "+2 TaW im spezialisierten Aspekt des Talents."
    }
};

// ─── Lookup ───────────────────────────────────────────────────────────────────

export function getSFData(name) {
    if (!name) return null;
    const clean = name.trim();
    if (SF_DATABASE[clean]) return SF_DATABASE[clean];
    // Prefix match for "Waffenspezialisierung (Schwert)" etc.
    for (const [key, val] of Object.entries(SF_DATABASE)) {
        if (clean.startsWith(key)) return { ...val, displayName: clean };
    }
    return null;
}

export const ACTIVE_SFS = new Set(
    Object.entries(SF_DATABASE)
        .filter(([, v]) => v.type === "active")
        .map(([k]) => k)
);
