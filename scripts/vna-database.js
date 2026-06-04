// VNA database – Vorteile (advantages) and Nachteile (disadvantages) for DSA 4.1.
// type: "advantage" | "disadvantage". passiveNote: key mechanical effect in brief.

export const VNA_DATABASE = {

 // ===========================
 // VORTEILE (Advantages)
 // ===========================

 "Adlig": {
 type: "advantage",
 description: "Der Held ist von hervorgehobenem Stand. Verbilligt Besonderer Besitz auf.",
 passiveNote: "Adelsstand, rechtl. Privilegien; Bes. Besitz verbilligt; Startkapital erhöht."
 },

 "Amtsadel": {
 type: "advantage",
 description: "Der Held stammt nicht aus einer Herrscherfamilie, zählt aber dennoch zum Adelsstand, da er ein Amt bekleidet oder ein Würdenträger ist (z.B. Vogt, Verwalter, Wesir). Er unterliegt der Adelsgerichtsbarkeit, hat Anspruch auf die Anrede 'Achtbarer Herr/Dame' und die finanziellen Vorteile des Adligen (Ausrüstungsvorteil SO×2 Dukaten/GP, Besonderer Besitz verbilligt). Eine Sonderform ist der Titularadel (Ehrungstitel auf Lebenszeit, nicht erblich). Amtsadlige sind meist durch ihre Aufgaben voll ausgelastet und kaum als Spielerhelden geeignet.",
 passiveNote: "Adelsstand durch Amt. Adelsgerichtsbarkeit. Ausrüstungsvorteil SO×2 Dukaten/GP. Bes. Besitz verbilligt."
 },

 "Affinität zu": {
 type: "advantage",
 description: "Besonders gute Beziehung zu einer Art magischer Wesen (Geister, Elementarwesen oder Dämonen). Die jeweilige Probe, einen solchen zu einem Dienst zu bewegen, ist um 3 Punkte erleichtert. Nur eine der drei Gruppen wählbar. Nichtzauberer zahlen.",
 passiveNote: "Proben zur Bindung/Überzeugung der entsprechenden Wesenart +3 erleichtert."
 },

 "Akademische Ausbildung (Gelehrter)": {
 type: "advantage",
 description: "Besuch einer Akademie/Universität. Alle Wissenstalente, Sprachen und Schriften um eine Spalte erleichtert steigern (bis TaW 10; mit Veteran bis TaW 15). Beinhaltet SF Nandusgefälliges Wissen. Profession zeitaufwendig.",
 passiveNote: "Wissenstalente +1 Spalte erleichtert (bis TaW 10). Nandusgefälliges Wissen inklusive."
 },

 "Akademische Ausbildung (Magier)": {
 type: "advantage",
 description: "Magische Akademieausbildung. Wissenstalente +1 Spalte bis TaW 10, +6 AsP Grundvorrat, magic. SFs zu ¾ der AP. Bindung des Stabes inkl. Rüstungsgewöhnung I–III zu 1,5-fachen Kosten.",
 passiveNote: "Wissenstalente +1 Spalte, +6 AsP, magic. SFs ¾-Kosten. Stabsbindung inkl."
 },

 "Akademische Ausbildung (Krieger)": {
 type: "advantage",
 description: "Kriegerakademieausbildung. Kampftechniken um 2 Spalten erleichtert steigern (bis TaW 10; mit Veteran bis TaW 15). Kampf-SFs und waffenlose Kampfstile zu ¾ der AP. Kriegerbrief.",
 passiveNote: "Kampftechniken +2 Spalten bis TaW 10. Kampf-SFs ¾-Kosten. Kriegerbrief."
 },

 "Altersresistenz": {
 type: "advantage",
 description: "Der Held altert deutlich langsamer als üblich für seine Rasse. Die Altersschwellen (WdS 192) werden erst bei anderthalbfacher Jahreszahl erreicht.",
 passiveNote: "Altersschwellen erst bei 1,5-facher Jahreszahl. Sieht jünger aus."
 },

 "Begabung": {
 type: "advantage",
 description: "Der Held hat eine außergewöhnliche Begabung für einen bestimmten Zauberspruch: Dieser Spruch gilt als Hauszauber (linke Spalte) und kostet nur ¾ der normalen AP. Nur für Spruchzauberer, nicht für Übernatürliche Begabungen. Kosten variabel je nach Komplexität.",
 passiveNote: "Gewählter Zauber gilt als Hauszauber: linke SKT-Spalte, ¾ der AP."
 },

 "Balance": {
 type: "advantage",
 description: "Körperbeherrschungs-, Tanzen-, Athletik- und Akrobatik-Proben beim Balance halten, Drehen in der Luft oder Stehenbleiben auf schwankendem Untergrund um 3 erleichtert; GE-Proben in diesen Situationen um 2 erleichtert. Von Sturzschaden wird 1/5 der Punkte abgezogen (nach Körperbeherrschungs-Probe). Hilft im Kampf, nach bestimmten Manövern stehen zu bleiben oder Sturz bei Patzern zu vermeiden (WdS 63, 65, 84f.). Beinhaltet SF Standfest. Nicht kombinierbar mit Herausragende Balance, aber aufrüstbar.",
 passiveNote: "+3 auf Balance-/Tanz-/Athletik-/Akrobatik-Proben (Gleichgewicht); GE-Proben +2. Sturzschaden –1/5. SF Standfest inkl."
 },

 "Beidhändig": {
 type: "advantage",
 description: "Gleich gut mit beiden Händen. Kein Malus auf Proben/Kämpfe mit der falschen Hand. Einhändige Kampf-SFs zu ½, koordinierte (Schildkampf, Doppel­angriff usw.) zu ¾ der AP. Nicht kombinierbar mit Linkshändig.",
 passiveNote: "Kein Malus für falsche Hand; koordinierte Kampf-SFs zu ¾ AP."
 },

 "Besonderer Besitz": {
 type: "advantage",
 description: "Ein besonderer Ausrüstungsgegenstand (Pferd, Waffe, Artefakt), der zur Profession passt und zwischen 50 und 200 Dukaten wert ist. Kann bis zu 5× erworben werden (Wert ×5 je Stufe). Adlige zahlen nur.",
 passiveNote: "Besonderer Gegenstand (50–200 Dukaten). Adlige:. Bis zu 5 Stufen."
 },

 "Breitgefächerte Bildung": {
 type: "advantage",
 description: "Der Held hat zwei Professionen durchlaufen (+6 Jahre Einstiegsalter). Erhält ½ der Boni (LE/AU/MR/INI) und volle Automatische V/N der 2. Profession. Nicht mit Veteran kombinierbar.",
 passiveNote: "+6 Jahre Alter, ½ Boni der 2. Profession. Nicht mit Veteran kombinierbar."
 },

 "Dämmerungssicht": {
 type: "advantage",
 description: "Bei schlechter Beleuchtung nur die Hälfte der Abzüge auf AT, PA, Fernkampf und Sinnenschärfe-Proben. Andere Proben je nach Wichtigkeit des Sehsinns (Meisterentscheid).",
 passiveNote: "Halbe Beleuchtungsabzüge auf AT/PA/FK/Sinnenschärfe."
 },

 "Eidetisches Gedächtnis": {
 type: "advantage",
 description: "Praktisch perfektes Gedächtnis. KL-Proben zum Erinnern +7 erleichtert. Wissenstalente, Sprachen, Zauberkenntnisse, bestimmte SFs zu ½ der AP/Punkte steigern. Ersetzt Lesen/Schreiben-Voraussetzung. Nicht mit Gutem Gedächtnis kombinierbar.",
 passiveNote: "KL-Proben zum Erinnern +7. Wissenstalente/Zauber zu ½ AP."
 },

 "Eigeboren": {
 type: "advantage",
 description: "Weibliche Hexe mit besonderer Aura. Automatisch Altersresistenz + Gut Aussehend. Gesellschaftliche Proben unter Schwestern +3. CH-Steigerung +1 Spalte erleichtert. Flüche zu ½ AP. Mächtiger Vertrauter ohne Zusatzkosten. Nur weibliche Hexen.",
 passiveNote: "Altersresistenz + Gut Aussehend inkl. CH-Steigerung +1 Spalte. Flüche ½ AP."
 },

 "Eisenaffine Aura": {
 type: "advantage",
 description: "Magiebegabter Charakter ist durch Eisen und Metalle weniger in seiner Zauberei eingeschränkt: Erleidet nur die leichten Auswirkungen bei Zauberbehinderung durch Metalle. Nicht für Druiden/Geoden.",
 passiveNote: "Nur leichte Metallbehinderung beim Zaubern (statt voller)."
 },

 "Eisern": {
 type: "advantage",
 description: "Besonders widerstandsfähig gegen mechanischen Schaden. Wundschwellen (normalerweise KO/2, KO, 3/2 KO) je um 2 Punkte erhöht. Mit 1–5 LeP noch handlungsfähig. Nicht kombinierbar mit Glasknochen.",
 passiveNote: "Wundschwellen je +2. Mit 1–5 LeP noch aktionsfähig. Nicht mit Glasknochen. (System: Wundschwellen automatisch erhöht.)"
 },

 "Empathie": {
 type: "advantage",
 description: "Gabe: Spürt Stimmungen bis hin zur vollständigen Durchleuchtung der Gefühlswelt. Probe MU/IN/IN, Startwert 3, Reichweite TaW/2 Schritt. TaP* für Gesellschaftstalente nutzbar. 1 Erschöpfung pro Probe.",
 passiveNote: "Gabe MU/IN/IN (SW 3). Stimmung/Gefühle erspüren. TaP* für soz. Proben."
 },

 "Entfernungssinn": {
 type: "advantage",
 description: "Präzises Abschätzen von Entfernungen. +3 auf alle IN-Proben zum Entfernungsabschätzen. Fernkampf-Proben und Zauber auf Reichweite Horizont um 2 Punkte erleichtert.",
 passiveNote: "+3 auf Entfernungsschätzen (IN). Fernkampf +2 erleichtert. Horizont-Zauber +2."
 },

 "Feenfreund": {
 type: "advantage",
 description: "Der Held ist ein Sympathieträger unter den Feen. In Gebieten mit Feen kann er von unerwarteter Seite Hilfe erhalten (Meisterentscheid). Kobolde gelten nicht als Feen.",
 passiveNote: "Gelegentliche Hilfe von Feen (Meisterentscheid). Kobolde ausgenommen."
 },

 "Feste Matrix": {
 type: "advantage",
 description: "Zauberpatzer nur bei Doppel-20 plus 18, 19 oder 20 (ca. 10× seltener als üblich). Normale Misserfolgswahrscheinlichkeit unverändert. Nicht für Schelme, nicht mit Wilder Magie.",
 passiveNote: "Patzer nur bei 20+20+18/19/20. ~10× seltener. Nicht mit Wilder Magie."
 },

 "Flink": {
 type: "advantage",
 description: "Basis-GS +1. +1 auf alle Ausweichen-Proben. Bei Athletik-Probe 0,2 GS/TaP* (statt 0,1). Kein Kampfreflexe-Erfordernis für Klingensturm/Klingenwand. Verliert Wirkung bei BE 5+.",
 passiveNote: "GS +1, Ausweichen +1. 0,2 GS/TaP* bei Athletik. Verfällt ab BE 5. (System: GS und Ausweichen automatisch erhöht.)"
 },

 "Gebildet": {
 type: "advantage",
 description: "40 AP, die nur für Wissenstalente, Sprachen, Schriften, Handwerk oder zugehörige SFs verwendet werden dürfen (max. 200 AP). Die Hälfte dieser AP kann für Zauberfertigkeiten/magische SFs eingesetzt werden.",
 passiveNote: "1. 200 AP)."
 },

 "Gefahreninstinkt": {
 type: "advantage",
 description: "Gabe: Warnt vor direkt bevorstehender Gefahr. Kaum zu überraschen. Probe KL/IN/IN, Startwert 3. Meister würfelt verdeckt. Je mehr TaP* übrig, desto besser die Gefahreneinschätzung.",
 passiveNote: "Gabe KL/IN/IN (SW 3). Gefahrenwarnung, kaum überraschbar. Meister würfelt verdeckt."
 },

 "Geräuschhexerei": {
 type: "advantage",
 description: "Gabe: Beliebige Geräusche außerhalb des Körpers erzeugen (bis TaW Schritt Entfernung). Probe IN/CH/KO, SW 3. Während Anwendung +3 auf andere Proben. 1 Erschöpfung pro SR.",
 passiveNote: "Gabe IN/CH/KO (SW 3). Geräusche erzeugen bis TaW Schritt. 1 Ersch./SR."
 },

 "Geweiht": {
 type: "advantage",
 description: "Geweihter Priester mit Karmaenergie-Zugang. Alveranisch: 24 KaP, 14 LG. Nicht-alveranisch: 12 KaP, 10 LG. Liturgiekenntnis 3. MR +1. Karmalqueste inbegriffen.",
 passiveNote: "Geweihter: KaP-Vorrat, Liturgien, MR +1, LkW 3. Kosten je nach Gottheit."
 },

 "Glück": {
 type: "advantage",
 description: "Bis zu 2× pro aventurischem Tag einen Würfelwurf wiederholen und günstigeres Ergebnis wählen. Alternativ: Meister muss einen Wurf wiederholen. Genaue Häufigkeit vom Meister verdeckt bestimmt (1W3–1).",
 passiveNote: "2× täglich Würfelwurf wiederholen (oder Gegner-Wurf). Häufigkeit verdeckt."
 },

 "Glück im Spiel": {
 type: "advantage",
 description: "IN-Probe beim Glücksspiel um 7 Punkte erleichtert. Beim Tischspiel: eine Karte neu ziehen oder Würfelergebnis modifizieren. Je nach Glücksabhängigkeit des Spiels auch Boni auf Brett-/Kartenspiele.",
 passiveNote: "Glücksspiel-IN-Probe +7 erleichtert. Eine Karte neu ziehen / Würfel modifizieren."
 },

 "Gut Aussehend": {
 type: "advantage",
 description: "Attraktives Äußeres. Alle passenden gesellschaftlichen Proben und CH-Proben zur Sympathiegewinnung um 1 erleichtert. Bei einigen Zaubern (Bannbaladin, Seidenzunge u.a.) +1 auf Zauberprobe. Nicht mit Widerwärtigem Aussehen oder Herausragendem Aussehen kombinierbar.",
 passiveNote: "+1 auf gesellschaftliche/CH-Proben. Bei Bannbaladin u.ä. +1 auf Zauberprobe."
 },

 // Alias: GDSA speichert diesen Vorteil ohne Leerzeichen als "Gutaussehend"
 "Gutaussehend": {
 type: "advantage",
 description: "Attraktives Äußeres. Alle passenden gesellschaftlichen Proben und CH-Proben zur Sympathiegewinnung um 1 erleichtert. Bei einigen Zaubern (Bannbaladin, Seidenzunge u.a.) +1 auf Zauberprobe. Nicht mit Widerwärtigem Aussehen oder Herausragendem Aussehen kombinierbar.",
 passiveNote: "+1 auf gesellschaftliche/CH-Proben. Bei Bannbaladin u.ä. +1 auf Zauberprobe."
 },

 "Guter Ruf": {
 type: "advantage",
 description: "Bekannt für positive Charakterzüge. +1 auf gesellschaftliche Talentproben. Je nach Situation als SO-Ersatz verwendbar (für Audienzen u.ä.). Gilt in eigener Kultur.",
 passiveNote: "+1 gesellschaftliche Talentproben. SO-Ersatz möglich. Eigene Kultur."
 },

 "Gutes Gedächtnis": {
 type: "advantage",
 description: "Erinnert Gelerntes sehr gut. Zusätzliche KL-Proben für Informationen. Sprachen, Zauber und bestimmte SFs zu ¾ der AP/Punkte steigern. Nicht mit Eidetischem Gedächtnis.",
 passiveNote: "Sprachen/Zauber/bestimmte SFs zu ¾ AP. Zusätzliche KL-Proben möglich."
 },

 "Halbzauberer": {
 type: "advantage",
 description: "Grundlegende oder spezialisierte Magiebegabung. (MU+IN+CH)/2 +6 AsP, MR +1. 10 Grundkenntnisse (5 Hauszauber erleichtert), oder typische Ritualfertigkeiten/Ritualkenntnisse.",
 passiveNote: "(MU+IN+CH)/2+6 AsP, MR +1. 10 Grundkenntnisse (5 Hauszauber). (System: AsP-Grundvorrat und MR automatisch eingerechnet.)"
 },

 "Herausragende Balance": {
 type: "advantage",
 description: "Stärkere Variante von Balance. Körperbeherrschung/Tanzen/Athletik/Akrobatik +7, GE +5 bei Balance-Proben. ¼ Sturzschaden absorbiert. Kampf-Sturzschutz.",
 passiveNote: "+7 auf Balance-Körperproben, +5 GE. ¼ Sturzschaden absorbiert."
 },

 "Herausragende Eigenschaft": {
 type: "advantage",
 description: "Erlaubt einen Eigenschafts-Startwert über 14 zu erreichen (nach Rasse/Kultur-Modifikation). Kosten steigen je weiterer Stufe. Kann mehrfach für dieselbe Eigenschaft gewählt werden.",
 passiveNote: "Eigenschaft auf 15+ steigern (Startwert). Kosten steigen je weiterer Stufe."
 },

 "Herausragender Sechster Sinn": {
 type: "advantage",
 description: "Besondere Begabung für magische Zusammenhänge. Alle Proben auf Magiegespür sowie astrale Erkennungszauber (ODEM, ANALYS, OCULUS etc.) +3 erleichtert.",
 passiveNote: "Magiegespür und astrale Erkennungsproben +3 erleichtert."
 },

 "Herausragender Sinn": {
 type: "advantage",
 description: "Ein Sinn (Gehör, Sicht, Tastsinn oder Geruch/Geschmack) besonders gut ausgebildet. Alle Sinnenschärfe-Proben für diesen Sinn +5 erleichtert; zusätzliche Proben möglich.",
 passiveNote: "Gewählter Sinn: Sinnenschärfe +5 erleichtert. Zusätzliche Proben möglich."
 },

 "Herausragendes Aussehen": {
 type: "advantage",
 description: "Extrem attraktives Äußeres. Alle passenden gesellschaftlichen/CH-Proben +3 erleichtert. Bannbaladin/Seidenzunge u.a. +2 auf Zauberprobe. Nicht in Menge verbergbar (Sich Verstecken –5).",
 passiveNote: "+3 auf gesellschaftliche/CH-Proben. Zaubern auf Sympathie +2. Nicht verbergbar."
 },

 "Hitzeresistenz": {
 type: "advantage",
 description: "Kein Schaden durch extreme Hitze bis ~50 °C; nur erhöhter Ausdauerverlust bei Überanstrengung. Schützt nicht gegen Feuer-/Hitzezauber oder Fackelhiebe. Kann auch durch SF Akklimatisierung (Hitze) erworben werden.",
 passiveNote: "Kein Hitzeschaden bis 50 °C. Schützt nicht vor Feuerzaubern. Akklimatisierung-Variante."
 },

 "Hohe Lebenskraft": {
 type: "advantage",
 description: "+1 LeP (max. +6 LeP). Diese Punkte zählen zur LeP-Basis und erhöhen damit auch das spätere Steigerungsmaximum.",
 passiveNote: "+1 LeP je. Erhöht auch LeP-Steigerungsmaximum. (System: LeP-Maximum automatisch erhöht.)"
 },

 "Hohe Magieresistenz": {
 type: "advantage",
 description: "+1 MR (max. +3 MR). Diese Punkte zählen zur MR-Basis.",
 passiveNote: "+1 MR je. Erhöht MR-Steigerungsbasis. (System: MR automatisch erhöht.)"
 },

 "Immunität gegen Gift": {
 type: "advantage",
 description: "KO bei Resistenzproben gegen Gift/Krankheit um 15 erhöht (statt 7 bei Resistenz). Einzelgift:. Giftkategorie:. Alle Gifte:. Nicht kombinierbar mit Resistenz gegen dasselbe Gift.",
 passiveNote: "KO +15 bei Giftresistenzproben. Einzelgift."
 },

 "Immunität gegen Krankheiten": {
 type: "advantage",
 description: "KO bei Krankheitsresistenzproben um 15 erhöht. Einzelkrankheit:. Alle Krankheiten:.",
 passiveNote: "KO +15 bei Krankheitsresistenzproben. Einzel:."
 },

 "Innerer Kompass": {
 type: "advantage",
 description: "Weiß immer, wo Norden ist (Land, Stadt, unterirdisch). Orientierungs-Proben +7 erleichtert, auf See/Wüste bis zu +14. Beinhaltet Richtungssinn; verbilligt, wenn Richtungssinn bereits vorhanden.",
 passiveNote: "Immer Richtung bekannt. Orientierung +7 (See/Wüste bis +14). Beinhaltet Richtungssinn."
 },

 "Kälteresistenz": {
 type: "advantage",
 description: "Kein Schaden bis –20 °C Luft / 0 °C Wasser, reduzierter Schaden bei extremerer Kälte. Schützt nicht vor Eis-/Kältezaubern. Kann auch durch SF Akklimatisierung (Kälte) erworben werden.",
 passiveNote: "Kein Kälteschaden bis –20 °C. Schützt nicht vor Kältezaubern."
 },

 "Kampfrausch": {
 type: "advantage",
 description: "Bewusster kontrollierbarer Blutrausch. Auslösen per Selbstverletzung (1W3 LeP + 1 Ersch.) + Selbstbeherrschung +10. Im Rausch: keine Wunden-/LE/AuP-Malus, kein Bewusstlosigkeitswurf. Nur Wuchtschlag-Manöver. Nicht mit Blutrausch.",
 passiveNote: "Kein Wunden-/LE-Malus im Rausch. Nur Wuchtschlag-Manöver. Selbstverletzung + SE+10."
 },

 "Koboldfreund": {
 type: "advantage",
 description: "Besondere Beziehung zu Kobolden. Der Held kann von Kobolden lernen und ihnen besonders gut begegnen. Ermöglicht auch das Erlernen der Gabe Geräuschhexerei.",
 passiveNote: "Besondere Bindung zu Kobolden. Ermöglicht Geräuschhexerei-Lernen."
 },

 "Kräfteschub": {
 type: "advantage",
 description: "Der Held kann in kritischen Situationen kurzfristig Kräfte mobilisieren, die über sein normales Maß hinausgehen (ähnlich dem Talent Kräfteschub/Talentschub).",
 passiveNote: "Kurzfristige Kraft-/Talentmobilisierung in kritischen Situationen."
 },

 "Meisterhandwerk": {
 type: "advantage",
 description: "Zauberer kann AsP einsetzen, um bis zu 5 berufstypische Talente zu erleichtern. Entweder: TaW +2/AsP (max. doppelter TaW) vor der Probe, oder nachträglich 1 AsP = 1 TaP aufwerten. Vollzauberer.",
 passiveNote: "AsP für Talentproben: +2 TaW/AsP vorab, oder 1 AsP = 1 TaP nachträglich. (System: Meisterhandwerk-Option in Würfeldialogen verfügbar.)"
 },

 "Nachtsicht": {
 type: "advantage",
 description: "Selbst bei minimaler Beleuchtung maximal –2 AT/PA und –5 FK. Beinhaltet Dämmerungssicht. Nicht mit Nachtblindheit kombinierbar. Wer Dämmerungssicht hat: verbilligt.",
 passiveNote: "Max. –2 AT/PA, –5 FK bei minimaler Beleuchtung (nicht Totaldunkel). Beinhaltet Dämmerungssicht."
 },

 "Natürliche Waffen": {
 type: "advantage",
 description: "Rasse verfügt über natürliche Waffen (Krallen, Biss). Krallen: frei wählbar ob TP(A) oder echter Schaden. Biss immer echter Schaden. Inkl. zugehöriges Kampfmanöver.",
 passiveNote: "Natürl. Waffen (Biss/Krallen) mit echtem Schaden. Inkl. Kampfmanöver. (System: Waffenwerte automatisch registriert.)"
 },

 "Natürlicher Rüstungsschutz": {
 type: "advantage",
 description: "Besonders zähe Haut/Fell/Schuppen als zusätzlicher RS (max. RS 3). Nur ausgewählte Rassen mit vorgegebenem RS-Wert.",
 passiveNote: "Natürlicher RS (max. 3) durch Haut/Fell/Schuppen. Nur bestimmte Rassen. (System: RS automatisch auf alle Zonen angerechnet.)"
 },

 "Niedrige Schlechte Eigenschaft": {
 type: "advantage",
 description: "Ermöglicht, eine durch Rasse/Kultur/Profession erhaltene Schlechte Eigenschaft vor Spielbeginn zu reduzieren (auch unter 5, bis auf 0). Kosten entsprechen dem Wert der reduzierten Punkte.",
 passiveNote: "Pflichtschlechte Eigenschaft vor Spielbeginn reduzieren. Kosten entsprechend."
 },

 "Prophezeien": {
 type: "advantage",
 description: "Gabe: Gespür für großräumige Zukunftsentwicklungen. Probe IN/IN/CH (SW 3), Meister würfelt verdeckt. Einsichten immer verschwommen und vieldeutig. 2 Erschöpfung pro Anwendung, dauert mind. ½ Stunde.",
 passiveNote: "Gabe IN/IN/CH (SW 3). Vage Zukunftseinsichten (Meister verdeckt). 2 Ersch., ½ Std."
 },

 "Resistenz gegen Gift": {
 type: "advantage",
 description: "KO bei Resistenzproben gegen Gift um 7 erhöht. Einzelgift:. Giftkategorie (Herkunft oder Anwendungsart):. Allgemeine Resistenz (alle Gifte):.",
 passiveNote: "KO +7 bei Giftresistenzproben. Einzelgift."
 },

 "Resistenz gegen Krankheiten": {
 type: "advantage",
 description: "KO bei Krankheitsresistenzproben und beim Ausheilen um 7 erhöht. Gilt gegen alle Krankheiten.",
 passiveNote: "KO +7 bei Krankheitsresistenz und Ausheilen. Alle Krankheiten."
 },

 "Richtungssinn": {
 type: "advantage",
 description: "Intuitives Gespür für Himmelsrichtungen und zurückgelegte Strecken. Orientierungs-Proben +5 erleichtert. Gilt nur für vertrauten Geländetyp. Kann zu Innerem Kompass aufgewertet werden.",
 passiveNote: "Orientierung +5 erleichtert. Auf vertrauten Geländetyp begrenzt."
 },

 "Schnelle Heilung": {
 type: "advantage",
 description: "Regeneriert pro Ruhephase 1/2/3 zusätzliche LeP (also 1W6+1/2/3). KO-Proben zur Wundheilung +1/2/3 erleichtert. Nicht kombinierbar mit Schlechter Regeneration.",
 passiveNote: "+1/+2/+3 LeP pro Ruhephase. KO-Heilungsproben +1/2/3 erleichtert. (System: LeP-Regenerationsbonus automatisch eingerechnet.)"
 },

 "Schutzgeist": {
 type: "advantage",
 description: "Kann alle verbleibenden AsP einsetzen, um einen Patzer abzuwenden, eine misslungene Probe zu wiederholen, oder einen 1W20 um die Anzahl eingesetzter AsP zu vermindern. Nur in bedrohlichen (nicht selbst verursachten) Situationen. Nur für Viertelzauberer und einige Halbzauberer.",
 passiveNote: "Alle AsP: Patzer abwenden / Probe wiederholen / W20 –AsP. Nur echte Notlagen."
 },

 "Schwer zu verzaubern": {
 type: "advantage",
 description: "Angeborene Resistenz gegen Zauberei. Alle Herrschafts-, Einfluss-, Heilungs-, Hellsicht-, Eigenschaften-, Form-Zauber auf diesen Helden +3 erschwert. Gilt auch für helfende Zauber. Nur für Nichtzauberer.",
 passiveNote: "Alle direkten Zauber (Herrschaft/Einfluss/Heilung u.a.) auf diesen Held +3 erschwert."
 },

 "Soziale Anpassungsfähigkeit": {
 type: "advantage",
 description: "Findet sich in sozial ungewohnter Umgebung schnell zurecht. Kulturkunde für fremde Kulturen verbilligt. Kann falschen SO leichter vortäuschen. Verbindungen kosten nur 1/5 des SO-Werts (SO ±7 Spielraum).",
 passiveNote: "Kulturkunde verbilligt. Falscher SO leichter. Verbindungen 1/5 SO-Wert. SO ±7."
 },

 "Tierempathie": {
 type: "advantage",
 description: "Gabe: Stimmungssinn bis vollständige Verständigung mit Tieren. Probe MU/IN/CH (SW 3), Reichweite 1 Schritt. TaP* für Tier-Talentproben nutzbar. 1 Erschöpfung. Spezielle Tierart:.",
 passiveNote: "Gabe MU/IN/CH (SW 3). Tier-Stimmung/-Verständigung. TaP* nutzbar."
 },

 "Tierfreund": {
 type: "advantage",
 description: "Tiere akzeptieren den Held schnell. Alle Proben mit Tierumgang (Abrichten, Reiten, Beruhigen) +3 erleichtert. Bei artverwandten Wesen +5. Zauber Sanftmut/Herr über das Tierreich +3.",
 passiveNote: "Abrichten/Reiten/Tierumgang +3 erleichtert. Bei Artverwandten +5."
 },

 "Übernatürliche Begabung": {
 type: "advantage",
 description: "Viertelzauberer erwirbt zauberähnliche Wirkungen (AXXELERATUS, BALSAM u.a.) als Talent. Aktiviert mit Startwert 3, steigerbar nach Spalte F. Kein Gestikulieren/Sprechen nötig. Max. 5 Begabungen.",
 passiveNote: "Zauberähnliche Wirkung als Talent (SW 3, Spalte F). Nur AsP+Probe nötig."
 },

 "Veteran": {
 type: "advantage",
 description: "Hat dieselbe Profession zweimal durchlaufen (+6 Jahre Alter, +1 auf einen Wert der Profession). Talente erleichtert steigern bis TaW 15. Nicht mit Breitgefächerter Bildung kombinierbar. Kosten der gewählten Profession.",
 passiveNote: "+6 Jahre; Talente bis TaW 15 erleichtert steigern. Kosten der gewählten Profession."
 },

 "Viertelzauberer": {
 type: "advantage",
 description: "(MU+IN+CH)/2 –6 AsP. Potential für Meisterhandwerk, Schutzgeist, Übernatürliche Begabung sowie bestimmte magische SFs. Kann keine regulären Zaubersprüche erlernen.",
 passiveNote: "(MU+IN+CH)/2 –6 AsP. Kein Spruchzaubern; Meisterhandwerk/Schutzgeist/Übernatürl. Beg. möglich. (System: AsP-Grundvorrat automatisch eingerechnet.)"
 },

 "Vollzauberer": {
 type: "advantage",
 description: "(MU+IN+CH)/2 +12 AsP. 13 Grundkenntnisse (7 Hauszauber). Repräsentation + Ritualkenntnis (SW 3). SF Große Meditation. MR +2. Basis aller vollmagischen Professionen.",
 passiveNote: "(MU+IN+CH)/2+12 AsP, MR +2. 13 Grundkenntnisse (7 Hauszauber). Große Meditation. (System: AsP-Grundvorrat und MR automatisch eingerechnet.)"
 },

 "Vom Schicksal begünstigt": {
 type: "advantage",
 description: "Einmal pro Abenteuer kann der Spieler eine lebensbedrohliche, nicht selbst verursachte Situation durch einen glücklichen Zufall abwenden. Gilt für Schiffsuntergang, Hinterhalt, Lawine u.ä., nicht für bewusst eingegangene Gefahren.",
 passiveNote: "1× pro Abenteuer lebensbedrohliche Situation (unverschuldet) abwenden."
 },

 "Wesen der Nacht": {
 type: "advantage",
 description: "Zaubert bevorzugt bei Nacht: +1/+2/+3 auf alle Zauber- und Ritualproben bei Nacht (Sonnenuntergang bis -aufgang). Tritt häufig kombiniert mit Lichtempfindlich auf.",
 passiveNote: "+1/2/3 auf alle Zauber-/Ritualproben bei Nacht. Häufig mit Lichtempfindlich."
 },

 "Wohlklang": {
 type: "advantage",
 description: "Besonders schöne Stimme. +5 auf Singen-Proben. +2 auf alle gesellschaftlichen Proben, bei denen die Stimme aktiv eingesetzt wird. Hilft nicht bei Elfenliedern oder Dämonen-/Dschinn-Beschwörungen.",
 passiveNote: "+5 Singen, +2 auf gesellschaftliche Stimm-Proben. Elfenlieder/Dämonen ausgenommen."
 },

 "Wolfskind": {
 type: "advantage",
 description: "Nivesisches Erbe der Himmelswölfe. Kann sich für 1W6 AsP in einen Wolfsmenschen verwandeln (bis zur übernächsten Dämmerung). Verschiedene Stärken je nach Variante.",
 passiveNote: "Wolfsverwandlung für 1W6 AsP bis zur nächsten Dämmerung."
 },

 "Zauberhaar": {
 type: "advantage",
 description: "Haare ab 50 cm Länge (+ Bart bei Männern) speichern 7 zusätzliche AsP. Kurzes Haar macht diese AsP unzugänglich; wächst 0,5 Spann/Monat nach. Magisch auffällige Haarfarbe. Herrschaftsrituale +7 gegen Haarträger. Nicht mit Körpergebundener Kraft.",
 passiveNote: "+7 AsP Speicher bei Haar ≥50 cm. Verloren bei Haarschnitt (5 Monate Nachwuchs)."
 },

 "Zeitgefühl": {
 type: "advantage",
 description: "Kann Tageszeit auf eine Viertelstunde genau bestimmen, auch ohne Himmelsblick, aus Schlaf oder Bewusstlosigkeit. Verschläft nicht, verpasst keine Termine. Kann Sternkunde-Proben bei Großritualen positiv beeinflussen.",
 passiveNote: "Tageszeit auf ¼ Stunde genau (auch ohne Sicht/aus Schlaf). Sternkunde-Bonus."
 },

 "Zusätzliche Gliedmaßen": {
 type: "advantage",
 description: "Anatomische Besonderheiten wie zusätzliches Armpaar, funktionaler Schwanz (je nach Funktion) oder Flügel (Fliegendes Wesen). Von spielbaren Aventurier-Rassen nur Achaz (Schwanz kostenlos, Gebiss TP(A)).",
 passiveNote: "Zusätzl. Armpaar."
 },

 "Zweistimmiger Gesang": {
 type: "advantage",
 description: "Nur Elfen und Halbelfen. Ermöglicht das Erlernen elfischer Zauberlieder und der alten Sprache Asdharia zur Perfektion. Bestimmte magische Elfenlieder (Salasandra u.a.) nur mit diesem Vorteil lernbar.",
 passiveNote: "Elfische Zauberlieder erlernbar, Asdharia zur Perfektion. Nur Elfen/Halbelfen."
 },

 "Zwergennase": {
 type: "advantage",
 description: "Gabe: Übernatürlicher Instinkt für Geheimgänge, verborgene Türen, Hohlräume in Gemäuer und Gestein (auch wenn keine Sinnenschärfe-Probe erlaubt wäre). Probe und Startwert je nach TaW.",
 passiveNote: "Gabe: Verborgene Türen/Hohlräume in Stein erspüren (auch ohne Sinnenschärfe)."
 },

 "Dschinngeboren": {
 type: "advantage",
 description: "Der Held hat aufgrund eines Vorfahren, der eine Verbindung zu einem Dschinn hatte, eine besondere Nähe zu einem der sechs Elemente (Feuer, Wasser, Luft, Erz, Humus oder Eis). Er erhält automatisch den Vorteil Viertelzauberer und darf Meisterhandwerk und Schutzgeist erwerben. Elementaffine Übernatürliche Begabungen sind wählbar; Übernatürliche Begabungen des Gegenelements können nicht gewählt werden. Automatische Nachteile: Wahrer Name. Automatische Vorteile: Begabung für das gewählte Element (gilt auch für Viertelzauberer, erlaubt Steigerung nach Spalte E). Professionen mit Halb-/Vollzauberer-Vorteil: um 2 GP billiger.",
 passiveNote: "Viertelzauberer + Begabung Gegenelement. Elementaffine Üb. Begabungen wählbar. Wahrer Name automatisch."
 },

 "Göttergeschenk": {
 type: "advantage",
 description: "Ein Göttergeschenk ist eine göttliche Gabe, die mit einer bestimmten Profession oder Gottheit verbunden ist und dem Helden spezifische Talent-Boni und -Mali auferlegt. Jedes Göttergeschenk beinhaltet einen Vorteil (Talent +1 oder +2 oder eine verbilligte SF) und einen Nachteil (Talent –1). Der Stern (*) bedeutet: Ist das Talent bereits durch Rasse, Kultur oder Profession aktiviert, beträgt der Bonus +2 statt +1.",
 passiveNote: "Göttliche Gabe: spez. Talentboni und -mali (je nach gewähltem Geschenk)."
 },

 "Göttergeschenk: Firunsbär": {
 type: "advantage",
 description: "Göttergeschenk des Firun (Gott der Jagd und des Winters). Bonus: Selbstbeherrschung +1 oder Ausdauer (AU) +1. Malus: Tanzen –1. Ist Selbstbeherrschung bereits durch Rasse, Kultur oder Profession aktiviert, beträgt der Bonus +2.",
 passiveNote: "Selbstbeherrschung +1 oder AU +1. Tanzen –1."
 },

 "Paktierer": {
 type: "advantage",
 description: "Der Charakter hat einen Pakt mit einem Erzdämon geschlossen und erhält dafür Pakt-GP, die er für Schwarze Gaben, Vorteile, Eigenschaftssteigerungen, Sonderfertigkeiten und Talente ausgeben kann. 1 AP = 1 Pakt-GP, 1 GP = 30 Pakt-GP. Domänenspezifische Verbilligungen halbieren die Kosten. Steigerung Eigenschaften/LE nach SKT G, AsP/Gaben nach E, AuP nach C, MR nach H. Alle nicht-geweihten SFs erwerbbar (ohne Voraussetzungen). Mit fortschreitendem Pakt entstehen körperliche Veränderungen (Dämonenmal) und die Kreise der Verdammnis schreiten voran.",
 passiveNote: "Pakt-GP System: Schwarze Gaben, Eigenschaften, SFs, Talente kaufen. Domänenverbilligungen."
 },

 "Paktgeschenk": {
 type: "advantage",
 description: "Paktgeschenke sind besondere Fähigkeiten, die Paktierer mit Pakt-GP erwerben können. Allgemein zugängliche Paktgeschenke stehen allen Paktierern offen; domänenspezifische Paktgeschenke nur den Paktierern des jeweiligen Erzdämons. Kosten in Pakt-GP (1 GP ≈ 30 Pakt-GP).",
 passiveNote: "Pakt-GP-Ausgabe für besondere Fähigkeiten. Allgemeine und domänenspez. Varianten."
 },

 "Paktgeschenk: Alterslosigkeit": {
 type: "advantage",
 description: "Der Paktierer altert nicht mehr. Er erfährt weder positive noch negative Auswirkungen des Alters (siehe WdS 192 zu Altersschwellen). Kosten: 200 Pakt-GP.",
 passiveNote: "Altert nicht. Keine positiven oder negativen Altersauswirkungen. 200 Pakt-GP."
 },

 "Paktgeschenk: Schutz vor göttlichem Wirken": {
 type: "advantage",
 description: "Für jede Stufe (I–VII) dieser SF ist eine Liturgie gegen einen vom Paktierer beschworenen Dämon um 1 Punkt erschwert, und eventueller Schaden sinkt um 1 Punkt. Alternativ kann die Wirkung auf den Paktierer selbst angewandt werden (teurere Variante). Kosten: 70 Pakt-GP pro Stufe (auf den Paktierer: 100 Pakt-GP/Stufe). Einsatz erhöht Beschwörungskosten um Stufe AsP.",
 passiveNote: "Liturgien gegen besch. Dämon +1 Erschwernis/Stufe, Schaden –1/Stufe. 70–100 Pakt-GP/Stufe."
 },

 "Schwarze Gabe": {
 type: "advantage",
 description: "Schwarze Gaben sind besondere übernatürliche Fähigkeiten und Fertigkeiten, die Paktierer über Pakt-GP erwerben. Einige sind Gaben im regeltechnischen Sinne (Talentproben), andere sind passive Fähigkeiten oder Sonderfertigkeiten. Durch dämonische Macht erworbene Gaben haben einen Startwert von 7 (reguläre: 5). Einsatz kostet AuP (1W6 oder 3W6 je nach Gabe) und braucht 1 Aktion (1W6 AuP) bzw. 10 Aktionen (3W6 AuP). Nebenwirkungen durch dämonisches Chaos möglich (Meisterentscheid).",
 passiveNote: "Übernatürl. Päktier-Fähigkeit (Gabe/SF). SW 7. AuP-Kosten. Chaotische Nebenwirkungen möglich."
 },

 "Schwarze Gabe: Alpträume erzeugen": {
 type: "advantage",
 description: "Schwarze Gabe des Thargunitoth-Paktierers. Ermöglicht es, Alpträume zu erzeugen (Tödliche Träume-Regeln). Reichweite: TaW Meilen. Benötigt mindestens einen persönlichen Gegenstand des Opfers. Dauer: bis TaP*/2 Stunden. Zur Realitätsdichte werden die TaP* addiert. Probe: KL/IN/CH + MR. Einsatz: 3W6 AuP. Kosten: 300 Pakt-GP.",
 passiveNote: "Gabe KL/IN/CH + MR. Reichweite TaW Meilen. Braucht persönl. Gegenstand. 3W6 AuP."
 },

 "Schwarze Gabe: Brünstigkeit erzeugen": {
 type: "advantage",
 description: "Schwarze Gabe des Belkelel-Paktierers. Der Paktierer versetzt eine bis TaW Schritt entfernte Person in Brünstigkeit. Das Opfer erhält für TaP* Tage die Schlechte Eigenschaft Brünstigkeit auf einem Wert von 7+TaP*. Probe: CH/CH/KO + MR. Einsatz: 3W6 AuP. Kosten: 200 Pakt-GP.",
 passiveNote: "Gabe CH/CH/KO + MR. Opfer: Brünstigkeit 7+TaP* für TaP* Tage. TaW Schritt Reichweite. 3W6 AuP."
 },

 "Schwarze Gabe: Lähmende Furcht": {
 type: "advantage",
 description: "Schwarze Gabe des Belhalhar-Paktierers. Durch Blicke, Geheul oder miasmatische Ausdünstungen werden Feinde durch überwältigende Furcht gelähmt. AT- und PA-Wert des Opfers sinken um TaP* Punkte. Probe: MU/CH/KO + MR. Einsatz: 1W6 AuP. Kosten: 250 Pakt-GP.",
 passiveNote: "Gabe MU/CH/KO + MR. Gegner-AT/PA –TaP*. 1W6 AuP."
 },

 "Schwarze Gabe: Leichengespür": {
 type: "advantage",
 description: "Schwarze Gabe des Thargunitoth-Paktierers. Der Paktierer kann sterbliche Überreste entdecken. In einem Radius von 7×TaP* Schritt werden ihm alle Skelette und Leichen bewusst, die größer als ein Hund sind. Probe: MU/IN/FF. Einsatz: 1W6 AuP. Kosten: 100 Pakt-GP.",
 passiveNote: "Gabe MU/IN/FF. Leichen im Radius 7×TaP* Schritt wahrnehmen. 1W6 AuP."
 },

 "Schwarze Gabe: Verborgenes Wissen erspüren": {
 type: "advantage",
 description: "Schwarze Gabe des Amazeroth-Paktierers. Der Paktierer spürt verborgenes oder verschüttetes Wissen auf. Im Umkreis von TaP* Schritt findet er versteckte Bücher und alte Inschriften. In Bibliotheken zieht es ihn zum interessantesten Buch und er schlägt die relevanten Textstellen auf. Probe: KL/KL/IN. Einsatz: 1W6 AuP. Kosten: 150 Pakt-GP.",
 passiveNote: "Gabe KL/KL/IN. Versteckte Bücher/Inschriften im Radius TaP* Schritt finden. 1W6 AuP."
 },

 "Schwarze Gabe: Wahrheitssinn": {
 type: "advantage",
 description: "Schwarze Gabe des Blakharaz-Paktierers. Der Paktierer kann bestimmen, ob eine Antwort wahrheitsgemäß gegeben wurde. Er nimmt auch jedes Zögern und schlechtes Gewissen bei Halb- und Viertellügen oder bewussten Auslassungen wahr. Die Gabe ignoriert MR bis zu einer Höhe von 7 (höhere MR wirkt voll). Probe: KL/IN/IN. Einsatz: 1W6 AuP pro SR. Kosten: 200 Pakt-GP.",
 passiveNote: "Gabe KL/IN/IN. Lügen/Halbwahrheiten erkennen. MR bis 7 ignoriert. 1W6 AuP/SR."
 },

 "Schwarze Gabe: Wundschmerz": {
 type: "advantage",
 description: "Schwarze Gabe des Belhalhar-Paktierers. Erzielt der Paktierer bei einem Angriff Schadenspunkte und setzt diese Gabe ein, erleidet das Opfer niederhöllische Schmerzen und verliert zusätzlich TaP* AuP. Diese AuP müssen bei einer eventuell geforderten Selbstbeherrschungs-Probe des Opfers mit angerechnet werden. Probe: MU/KO/KK. Einsatz: 1W6 AuP. Kosten: 200 Pakt-GP.",
 passiveNote: "Gabe MU/KO/KK. Bei Treffer: Opfer verliert TaP* AuP (zählt für SB-Probe). 1W6 AuP."
 },

 "Schwarze Gabe: Zwist und Hader": {
 type: "advantage",
 description: "Schwarze Gabe des Lolgramoth-Paktierers. Der Paktierer verflucht eine bis TaW Schritt entfernte Person für TaP* Tage mit der Schlechten Eigenschaft Streitsucht auf einem Wert von 7+TaP*. Probe: KL/IN/CH + MR. Einsatz: 1W6 AuP. Kosten: 150 Pakt-GP.",
 passiveNote: "Gabe KL/IN/CH + MR. Opfer: Streitsucht 7+TaP* für TaP* Tage. TaW Schritt Reichweite. 1W6 AuP."
 },

 "Astrale Regeneration": {
 type: "advantage",
 description: "Magischer Vorteil (ZH). Der Held regeneriert pro Ruhephase 1 (Stufe I), 2 (Stufe II) oder 3 (Stufe III) zusätzliche Astralpunkte (also normalerweise 1W6+1/+2/+3 AsP). Intuitions-Proben zur Rückgewinnung verlorener AsP sowie KL- oder IN-Proben bei Ritualen zum Erlangen eines höheren AsP-Grundwerts sind um 1/2/3 Punkte erleichtert. Nicht kombinierbar mit dem Nachteil Astraler Block.",
 passiveNote: "Pro Ruhephase +1/+2/+3 AsP. AsP-Rückgewinnungs-/Meditations-Proben erleichtert. (System: AsP-Regenerationsbonus automatisch eingerechnet.)"
 },

 "Ausrüstungsvorteil": {
 type: "advantage",
 description: "Der Held erhält für je 1 GP zusätzliche Dukaten in Höhe des doppelten SO für Ausrüstung (nicht als Handgeld). Maximale GP = SO des Helden. Helden mit Breitgefächerter Bildung oder Veteran erhalten SO×3 Dukaten pro GP.",
 passiveNote: "1 GP = SO×2 Dukaten Ausrüstungsbudget. Max. investierbare GP = SO."
 },

 "Bemuskelter Schwanz": {
 type: "advantage",
 description: "Achaz-spezifisch. Der bemuskelte Schwanz des Achaz kann als natürliche Waffe eingesetzt werden und richtet 1W TP(A) an (vergleichbar mit einem normalen Fausthieb). Kostet 0 GP als natürliche Waffe. Ermöglicht das Manöver Schwanzschlag (automatisch) und auf Basis des Schwanzes die Manöver Schwanzfeger und weitere.",
 passiveNote: "Schwanz als Waffe: 1W TP(A). Manöver Schwanzschlag automatisch. Nur Achaz."
 },

 "Beseelte Knochenkeule": {
 type: "advantage",
 description: "Nur in Kombination mit Profession Schamane. Die Knochenkeule des Schamanen wird von einem Geist bewohnt (siehe SF Geist der Keule). Kosten je nach Art des Geistes und Start-Loyalität (LO): Totengeist LO×1 GP, Elementargeist LO×2 GP, Dschinn oder Dämon LO×3 GP. Kombinierbar mit dem Vorteil Ererbte Knochenkeule.",
 passiveNote: "Knochenkeule mit einwohnendem Geist. LO×1/2/3 GP je nach Geistesart. Nur Schamanen."
 },

 "Talentschub": {
 type: "advantage",
 description: "Gabe (5 GP). Bei gelungener Gabenprobe (MU/IN/KO, SW 3) ist die nachfolgende Talentprobe für ein bei der Heldenerstellung festgelegtes Talent um die übrig behaltenen Punkte (mindestens 1) erleichtert. Misslingt die Probe, ist die folgende Probe um 3 Punkte erschwert. Einsatz kostet 1W3 Erschöpfung und benötigt 4 Aktionen Konzentration. Nicht kombinierbar mit einem Meisterhandwerk im selben Talent.",
 passiveNote: "Gabe MU/IN/KO (SW 3): nächste Talentprobe erleichtert. 1W3 Erschöpfung. 4 Aktionen."
 },

 "Titularadel": {
 type: "advantage",
 description: "Als Ehrung vergebener Adelstitel ohne direkte Erbfolge (Variante des Amtsadels). Gilt auf Lebenszeit und kann nicht vererbt werden. Beinhaltet die finanziellen Vorteile des Adligen (Besonderer Besitz verbilligt, Ausrüstungsvorteil SO×3 Dukaten/GP, Startkapital SO×SO×2 Silbertaler) und unterliegt der Adelsgerichtsbarkeit. Kein erbliches Lehen.",
 passiveNote: "Lebzeitadel (nicht erblich). Adels-Finanzvorteile. Adelsgerichtsbarkeit."
 },

 "Unbeschwertes Zaubern": {
 type: "advantage",
 description: "Magischer Vorteil (nur Schelme; 7 GP). Der Schelm hat gelernt, auf spielerisch-leichte Art zu zaubern (resultierend aus dem jahrelangen Umgang mit Kobolden): Beim Wirken von Zaubern in schelmischer Repräsentation kann er eine Magieresistenz bis zu einem Wert von 7 gänzlich ignorieren; eine MR von 8 oder mehr kommt dagegen voll zum Tragen.",
 passiveNote: "MR bis 7 beim Zaubern in schelmischer Repräsentation ignoriert. Nur Schelme."
 },

 "Verbindungen": {
 type: "advantage",
 description: "Der Held hat einen 'guten Bekannten', den er in schwierigen Situationen um Hilfe bitten kann. Der Bekannte muss aus einem Rahmen von eigenem SO ±5 (max. SO 15) gewählt werden. Kosten: 1/3 des SO des Bekannten in GP. Art und Häufigkeit der Hilfe hängen von Charakter und Profession des Bekannten ab (Meisterentscheid). Kann mehrfach gewählt werden.",
 passiveNote: "Bekannter (SO ±5) für gelegentliche Hilfe. Kosten: SO/3 GP."
 },

 "Astralmacht": {
 type: "advantage",
 description: "Magischer Vorteil (ZHV). Der Held erhält einen Astralpunkte-Bonus von 1 Punkt pro eingesetztem GP; maximal können auf diese Weise 6 AsP hinzugewonnen werden. Diese Punkte zählen zur AsP-Basis und werden beim späteren Zukauf weiterer Astralenergie nicht beachtet.",
 passiveNote: "1 GP = +1 AsP (max. 6 AsP). Zählt zur AsP-Basis. (System: AsP-Maximum automatisch erhöht.)"
 },

 "Ausdauernd": {
 type: "advantage",
 description: "Je 1 GP bringt 2 Ausdauerpunkte (max. 6 AuP). Diese Punkte zählen zur AU-Basis. Ab 2 investierten GP: Erschöpfungsschwelle steigt von KO auf KO+1. Ab 3 GP: Erschöpfungsschwelle KO+2.",
 passiveNote: "1 GP = +2 AuP (max. 6). Ab 2 GP: Erschöpfungsschwelle KO+1; ab 3 GP: KO+2. (System: AuP-Maximum automatisch erhöht.)"
 },

 "Ausdauernder Zauberer": {
 type: "advantage",
 description: "Magischer Vorteil (ZHV; 3 GP). Der Zauberer verliert bei jedem Spruch nur halb so viel AuP wie ein Zauberkundiger ohne diesen Vorteil und erleidet auch nur seltener direkt einen Punkt Erschöpfung bei seinen Zaubern. Nur sinnvoll mit der Expertenregel zur Ausdauer beim Zaubern.",
 passiveNote: "Halb so viel AuP pro Zauber. Erschöpfung seltener. Nur mit Ausdauer-Expertenregel relevant."
 },

 "Ererbte Knochenkeule": {
 type: "advantage",
 description: "Magischer Vorteil (H; 2 GP pro pAsP; nur Schamane). Der Schamane besitzt die bereits geweihte und gebundene Knochenkeule eines verstorbenen Schamanen. Der Spieler legt in Absprache mit dem Meister fest, welche Objektrituale bereits auf der Keule liegen (außer Geist der Keule); kein einzelner Bonus darf +3 übersteigen. Kosten: 2 GP pro gespeichertem permanenten AsP. Kombinierbar mit dem Vorteil Beseelte Knochenkeule.",
 passiveNote: "Vorgebundene Schamanen-Knochenkeule mit vorhandenen Ritualen. 2 GP/pAsP. Nur Schamane."
 },

 "Linkshänder": {
 type: "advantage",
 description: "Linkshänder haben leichte Vorteile im Kampf: In den ersten 5 Kampfrunden erhält ihr Gegner durch die Überraschung einen PA-Nachteil von 1 Punkt. Die Sonderfertigkeiten Linkhand, Beidhändiger Kampf I und II können zu drei Vierteln der Kosten erlernt werden. Es kann Waffen oder Objekte geben, die für Linkshänder ungeeignet sind. Nicht kombinierbar mit dem Vorteil Beidhändig.",
 passiveNote: "Gegner PA –1 in den ersten 5 KR. Linkhand/Beidhändiger Kampf I+II zu ¾ Kosten."
 },

 "Machtvoller Vertrauter": {
 type: "advantage",
 description: "Magischer Vorteil (Z; 5 GP; nur Hexen, Geoden, Zibiljas, Goblin-Schamaninnen). Die Hexe kann bei der Charaktererschaffung festlegen, dass sie ein mächtigeres oder gefährlicheres Vertrautentier hat als üblich (z.B. Boronsotter, Gepard, Luchs, große Spinne, Skorpion). Die Werte werden an WdZ-Maxima verwandter Arten angelehnt, können aber deutlich mehr Punkte verteilt haben und eine Eigenschaft darf das angegebene Maximum um 3 überschreiten. Die Vertrautenbindung kostet entsprechend mehr AP.",
 passiveNote: "Mächtigeres Vertrautentier als üblich. Höhere Bindungskosten. Nur Hexe/Geode/Zibilja/Goblin-Schamanin."
 },

 "Magiegespür": {
 type: "advantage",
 description: "Gabe (12 GP). Lässt den Helden intuitiv Quellen astraler Kraft in seiner Umgebung spüren (Frösteln, Beklemmung, sphärische Klänge). Der Meister würfelt verdeckt. Willentliche Anwendung erst ab TaW 7. Probe erleichtert bis +7 (starke Quellen) bzw. erschwert bis +10 (gebundene Magie). Ist der Held magiebegabt, sind alle Proben auf ODEM ARCANUM und OCULUS um TaW/5 (Magiegespür) erleichtert. Jede Probe (willentlich oder unwillkürlich) kostet 1 Erschöpfung. Probe: MU/IN/IN, Startwert 3, 10 Aktionen.",
 passiveNote: "Gabe MU/IN/IN (SW 3). Astrale Quellen erspüren. ODEM/OCULUS erleichtert. 1 Ersch./Probe."
 },

 "Schlangenmensch": {
 type: "advantage",
 description: "25 GP. Der Held scheint nur aus Gelenken zu bestehen. Erhält +1 TaP auf Ringen, Akrobatik, Gaukeleien, Körperbeherrschung, Schleichen, Sich Verstecken, Tanzen und Fesseln/Entfesseln sowie je +1 Spalte leichter steigern. Ringen-PA und Fesseln/Entfesseln-Proben zum Befreien aus Umschlingung +1 erleichtert, Ringen-PA gegen waffenlose Angriffe sogar +3. Ausweichen I–III, Schnellziehen und Waffenloser Kampfstil Unauer Schule zu ½ AP. Voraussetzung: GE 14; KK-Maximum –2 (anderthalbfacher Startwert –2). Nicht mit Herausragender Eigenschaft Körperkraft kombinierbar.",
 passiveNote: "+1 TaP auf Ringen/Akrobatik/Körperbeh./Schleichen u.a. Ringen-PA erleichtert. GE 14 Voraus. KK-Max. –2."
 },

 "Verhüllte Aura": {
 type: "advantage",
 description: "Magischer Vorteil (ZHV; 3 GP). Die Aura des Helden erscheint schwächer als sie ist. Gezielte Hellsichtzauberei (ODEM, Magiegespür-Untersuchung, Liturgien): +5 Erschwernis. Magieerkennende Artefakte (Knochenkeule) und tierische Spürer (Hexenkröte, Nachtwind): +7 Erschwernis. Ungezielte Erkenntniszauber/-rituale und entsprechende Fallen schlagen überhaupt nicht an. Der Zauber SCHLEIER ist um 3 Punkte erleichtert, die MU-Probe für die SF Aura verhüllen um 1 Punkt.",
 passiveNote: "Aura-Erkennung +5/+7 erschwert. Ungezielte Erkenntniszauber schlagen nicht an. SCHLEIER +3 erleichtert."
 },

 "Zäher Hund": {
 type: "advantage",
 description: "10 GP. Üblicherweise fällt ein Held, dessen LeP unter 0 sinken, in ein Koma, das noch innerhalb von (1W6 × KO) Kampfrunden gerettet werden kann; fällt die LE unter den negativen KO-Wert, ist der Held tot. Zähe Hunde können in beiden Fällen statt einfachem KO den Wert 1,5 × KO einsetzen. Zudem können sie auch bei einem LE-Stand von 1 bis 5 noch agieren.",
 passiveNote: "Koma-Schwelle 1,5×KO (statt KO). Tod-Schwelle 1,5×KO (statt KO). Mit 1–5 LeP noch aktionsfähig."
 },

 // ===========================
 // NACHTEILE (Disadvantages)
 // ===========================

 "Aberglaube": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Der Held hat Aberglauben bezüglich bestimmter Dinge (Glück/Pech bringende Objekte, Ängste). Kann das Verhalten in bestimmten Situationen einschränken. Details frei wählbar.",
 passiveNote: "Schlechte Eigenschaft: Einschränkendes abergläubisches Verhalten."
 },

 "Albino": {
 type: "disadvantage",
 description: "Keine Farbpigmente in Haut, Haaren, Augen. Bei Sonnenlicht ~1 SP/Stunde. Oft lichtscheu/lichtempfindlich. Häufig gesellschaftlich diskriminiert. Einschüchtern +3.",
 passiveNote: "Sonnenbrand 1 SP/Std. SO >7. Einschüchtern +3."
 },

 "Angst vor": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Übertriebene Angst (Phobie) vor einem bestimmten Auslöser (Insekten, Feuer, Wasser, Dunkelheit..). Häufige Auslöser:. Seltene:. Kann in Panikzustände münden.",
 passiveNote: "Schlechte Eigenschaft: Phobie-Panikreaktion auf bestimmten Auslöser."
 },

 "Animalische Magie": {
 type: "disadvantage",
 description: "Magischer Nachteil: Alle Zauber-/Ritualproben mit KL-Teilprobe um Wert der Eigenschaft (max. 5) erschwert. Doppelt-KL-Zauber: doppelter Malus + eine Spalte teurer. Nur für Spruchzauberer.",
 passiveNote: "Zauber mit KL-Probe –[Wert] (max. 5). Doppelt-KL: doppelter Malus. Spruchzauberer."
 },

 "Arkanophobie": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Panische Angst vor Verzauberung. Misstraut magisch Begabten, benutzt keine Zauberobjekte. Senkt MR, wenn Verzauberung bewusst erwartet. Nicht für Halb-/Vollzauberer; Elfen können nicht wählen.",
 passiveNote: "MR sinkt bei bewusst erwarteter Verzauberung. Keine Zauberobjekte."
 },

 "Arroganz": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Hochnäsiges Verhalten, überschätzt eigene Fähigkeiten, traut anderen nichts zu. Gesellschaftliche Proben entsprechend erschwert.",
 passiveNote: "Schlechte Eigenschaft: Gesellschaftliche Proben durch Überheblichkeit erschwert."
 },

 "Artefaktgebunden": {
 type: "disadvantage",
 description: "Magischer Nachteil: Ohne Hautkontakt mit dem Traditionsartefakt müssen Zauber 7 ZfP aufbringen, Zauberdauer +3 Aktionen, keine Spontanmodifikationen. Artefaktzerstörung: –3 pAsP, –1 geistige Eigenschaft.",
 passiveNote: "Ohne Artefakt: 7 ZfP Mindestaufwand, +3 Aktionen, keine Spontanmod."
 },

 "Astraler Block": {
 type: "disadvantage",
 description: "Magischer Nachteil: Regeneriert nur 1W6–1 AsP pro Ruhephase. Intuitionswürfe für AsP-Rückgewinnung +2 erschwert. Regeneration I/II und Meisterliche Regeneration kosten doppelt.",
 passiveNote: "AsP-Regen nur 1W6–1/Ruhephase. Regen. I/II doppelt. Vollz./Hz. (System: AsP-Regenerationsmalus automatisch eingerechnet.)"
 },

 "Autoritätsgläubig": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Zweifelt keine Entscheidungen von Obrigkeiten oder angesehenen Gelehrten an. Proben können versagen oder erschwert werden, wenn gegen Anweisungen gehandelt wird.",
 passiveNote: "Schlechte Eigenschaft: Handeln gegen Obrigkeit/Gelehrte: Probe oder Erschwernis."
 },

 "Behäbig": {
 type: "disadvantage",
 description: "Basis-GS –1. Ausweichen –1. Sprungweite/-höhe Grundwert –1. Nur einmal wählbar. Nicht mit Flink.",
 passiveNote: "GS –1, Ausweichen –1, Sprunggrundwert –1. (System: GS und Ausweichen automatisch reduziert.)"
 },

 "Blutdurst": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Liebt es, Gegner langsam und blutig zu töten; verweilt auf Schlachtfeldern, tötet Verwundete, ermordet Informanten. Kein Moralkodex möglich, der Gewalttätigkeit ausschließt.",
 passiveNote: "Schlechte Eigenschaft: Zwang zu übermäßiger Gewalt. Kein Pazifismus-Kodex."
 },

 "Blutrausch": {
 type: "disadvantage",
 description: "Unkontrollierter Blutrausch durch Jähzorn, Wunden oder Rauschmittel. Im Rausch: MU/AT/TP +5, keine Parade, kein Schmerzempfinden, keine komplexen Aktionen. 2 AuP/AT-Verlust. Nicht mit Kampfrausch.",
 passiveNote: "MU/AT/TP +5 im Rausch, keine Parade. 2 AuP/AT. Jähzorn/Wunde/Rauschmittel als Auslöser."
 },

 "Brünstigkeit": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Unerschöpfliches sexuelles Verlangen führt zu Vernachlässigung der Umgebung. Betören-Versuche gegen ihn um Brünstigkeitswert erleichtert.",
 passiveNote: "Schlechte Eigenschaft: Betören gegen diesen Held um Wert erleichtert."
 },

 "Dunkelangst": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Beklemmungsgefühle durch Dunkelheit. Erlöschendes Licht kann zu Panikzuständen führen. Teurer als normale Phobien.",
 passiveNote: "Schlechte Eigenschaft: Panik durch Dunkelheit. Teurer als normale Phobien."
 },

 "Einarmig": {
 type: "disadvantage",
 description: "Verlust eines Arms. Zweihändig erfordernde Aktionen: Eigenschaftsproben +5, Talentproben +10 erschwert. Bogenschießen und zweihand. Waffen nicht möglich. SFs mit links/rechts nicht einsetzbar.",
 passiveNote: "Zweihändig: Eig.proben +5, Talentproben +10. Bogen/ZH-Waffen unmöglich."
 },

 "Einbildungen": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Der Held hat teils unzutreffende Überzeugungen oder Marotten, die ihn gelegentlich einschränken. Weniger schwerwiegend als Wahnvorstellungen.",
 passiveNote: "Schlechte Eigenschaft: Marotten/Einbildungen, die Handlungen gelegentlich einschränken."
 },

 "Farbenblind": {
 type: "disadvantage",
 description: "Sieht nur Grauschattierungen. Bestimmte Proben erschwert, einige Professionen unmöglich. Fernkampf auf Distanz >50 Schritt –4. Farbenblinde Zauberer: –4 auf gezielte Zauber (Horizont, Zielschwierigkeiten).",
 passiveNote: "Nur Grautöne. FK >50 Schritt –4. Gezielte Zauber –4. Bestimmte Proben erschwert."
 },

 "Feind": {
 type: "disadvantage",
 description: "Ein einzelner Feind verfolgt den Held mit Hass und will ihm an Ruf, Leib oder Leben schaden. Je nach SO des Feindes entsprechend gefährlich. Nicht kombinierbar mit Gesucht (gegen dieselbe Person).",
 passiveNote: "Ein persönlicher Feind. Verfolgt aktiv. Nicht mit Gesucht (gleiche Person)."
 },

 "Feste Gewohnheit": {
 type: "disadvantage",
 description: "Magischer Nachteil: Zusätzliche Bedingungen müssen erfüllt werden, damit Zauber gelingen (Gebet, Randbedingungen wie Nacht, Barfüßigkeit etc.). Ignorieren deutlich schwieriger als bei Repräsentations-Bedingungen.",
 passiveNote: "Zauber nur unter bestimmten Bedingungen (Ort/Zeit/Kleidung/Geste)."
 },

 "Festgefügtes Denken": {
 type: "disadvantage",
 description: "Magischer Nachteil: Alle Zauber-/Ritualproben mit IN-Teilprobe um Wert (max. 5) erschwert. Doppelt-IN-Zauber: doppelter Malus + eine Spalte teurer. Nur für Spruchzauberer.",
 passiveNote: "Zauber mit IN-Probe –[Wert] (max. 5). Doppelt-IN: doppelter Malus."
 },

 "Fettleibig": {
 type: "disadvantage",
 description: "AU auf die Hälfte. GE- und FF-Max je –4 Punkte. KK-Proben mit Eigengewicht +2, Talentproben +5 erschwert. Gewicht +50 %. Rüstungsanpassung schwierig.",
 passiveNote: "AU ½. GE/FF-Max –4. Körperl. Proben +2–5 erschwert. Gewicht +50 %."
 },

 "Fluch der Finsternis": {
 type: "disadvantage",
 description: "Magischer Nachteil: Alle Zauber-/Ritualproben bei Tag (Sonnenauf- bis -untergang) –1/–2/–3 erschwert. Kumulativ mit Lichtempfindlich/Lichtscheu.",
 passiveNote: "Zauber/Ritualproben bei Tag –1/2/3. Kumulativ mit Lichtempfindlich."
 },

 "Geiz": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Kann sich in Notsituationen nicht von Besitztümern trennen, spart auch bei Heilkräutern/Bestechung. Erzwungene Ausgaben lösen Auswirkungen der Schlechten Eigenschaft aus.",
 passiveNote: "Schlechte Eigenschaft: Kein Geldausgeben, auch bei Heilbedarf."
 },

 "Gerechtigkeitswahn": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Besteht auf strikte Einhaltung von Gesetzen, keine mildernden Umstände. Will Richter, Henker und Gesetzgeber in einer Person sein.",
 passiveNote: "Schlechte Eigenschaft: Strikte Regelbefolgerung, kein Ermessensspielraum."
 },

 "Gesucht": {
 type: "disadvantage",
 description: "Steckbrieflich gesucht mit Kopfgeld. Stufe I: regional, langjährige Haft. Stufe II: überregional, Verstümmelung droht. Stufe III: international bekannt, Todesstrafe.",
 passiveNote: "Steckbrief + Kopfgeld. I: regional –5. II: überregional –10. III: international."
 },

 "Glasknochen": {
 type: "disadvantage",
 description: "Besonders empfindlich gegen Kampfschaden. Wundschwellen je um 2 Punkte gesenkt. Nicht kombinierbar mit Eisern.",
 passiveNote: "Wundschwellen je –2. Nicht mit Eisern. (System: Wundschwellen automatisch reduziert.)"
 },

 "Goldgier": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Unvernünftige Handlungen durch Gier nach Reichtum, Schätzen, seltenen Zauberobjekten und Tränken.",
 passiveNote: "Schlechte Eigenschaft: Unvernünftige Aktionen durch Gier nach Schätzen/Artefakten."
 },

 "Größenwahn": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Fühlt sich zu Großem berufen, kein Wille außer dem eigenen zählt. Megalomanie, Machtstrebigkeit, teils Wahnvorstellungen.",
 passiveNote: "Schlechte Eigenschaft: Megalomanie, Machtgier. Kein Wille außer dem eigenen."
 },

 "Heimwehkrank": {
 type: "disadvantage",
 description: "Chronisches Heimweh (Melancholie/Depression). Außerhalb der Heimat krankheitsanfälliger. AsP-Regeneration –1. Nur für Elfen.",
 passiveNote: "Außerhalb Heimat: Krankheitsanfällig + AsP-Regen –1. Stimmungsabzüge. Nur Elfen."
 },

 "Hitzeempfindlichkeit": {
 type: "disadvantage",
 description: "Ab ca. 25 °C alle Proben +3 erschwert, Regeneration –1, doppelt schnelle Erschöpfung, AuP-Verluste +1.",
 passiveNote: "Ab 25 °C: alle Proben +3, Regen –1, doppelt schnell erschöpft, AuP +1."
 },

 "Höhenangst": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Panikreaktion bei Absturzgefahr. Bei Extremsituationen: 'Sog der Tiefe'.",
 passiveNote: "Schlechte Eigenschaft: Panik bei Absturzgefahr. Sog der Tiefe möglich."
 },

 "Impulsiv": {
 type: "disadvantage",
 description: "Unter Anspannung kein zweites Nachdenken. KL-/IN-Proben zum Verhindern direkter Aktion +5 erschwert. Finte/Meisterparade-Manöver +2 erschwert.",
 passiveNote: "Handeln ohne Nachdenken: KL/IN-Proben +5. Finte/Meisterparade +2."
 },

 "Jähzorn": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Überreaktion bei Ehrbeleidigung, Missgeschick oder drohender Unterlegenheit. Im Kampf mit gelungener Jähzorn-Probe: Finte/Meisterparade-Manöver +2 erschwert.",
 passiveNote: "Schlechte Eigenschaft: Überreaktion auf Provokation. Finte/Meisterparade +2 erschwert."
 },

 "Kälteempfindlichkeit": {
 type: "disadvantage",
 description: "Unter ~10 °C alle Proben +3 erschwert, Regeneration –1. Unter 0 °C auch mit Kleidung unterkühlt. Bei Kälteschaden +2 kTP.",
 passiveNote: "Unter 10 °C: Proben +3, Regen –1. Unter 0 °C unterkühlt. Kälteschaden +2 kTP."
 },

 "Kältestarre": {
 type: "disadvantage",
 description: "Bei Temperaturen unter ~10 °C: KK/FF/GE –2 bis –5. Unter 0 °C vollständig handlungsunfähig und Kälteschlaf. Typisch für Echsenvölker (Achaz).",
 passiveNote: "Unter 10 °C: KK/FF/GE –2–5. Unter 0 °C handlungsunfähig (Kälteschlaf)."
 },

 "Kein Vertrauter": {
 type: "disadvantage",
 description: "Magischer Nachteil: Die Hexe wird niemals einen Vertrauten finden. Führt zu gesellschaftl. Nachteilen unter Hexenschwestern (–1–3 auf soz. Proben). Nur für Hexen.",
 passiveNote: "Kein Vertrauter je möglich. Soziale Abzüge unter Hexen. Nur Hexen."
 },

 "Kleinwüchsig": {
 type: "disadvantage",
 description: "Unter 1,5 Schritt groß. GS –1. Waffen >1,5 Schritt (nicht Speer): AT/PA –3, TP –2. Rüstungs-BE +1. Gegenhalten +1 erleichtert. Trefferzone-Kopf: –1/Beine: +1.",
 passiveNote: "GS –1. Lange Waffen –3 AT/PA, –2 TP. BE +1. Gegenhalten +1 erleichtert. (System: GS automatisch reduziert.)"
 },

 "Körpergebundene Kraft": {
 type: "disadvantage",
 description: "Magischer Nachteil: 1/5 der Basis-AE nur bei Haar ≥50 cm zugänglich. Kurzes Haar = regeneriert max. 4/5 der möglichen AsP. Herrschaftsrituale +7 gegen Haarträger. Nicht mit Zauberhaar.",
 passiveNote: "⅕ Basis-AsP nur bei Haar ≥50 cm. Max. ⅘ AsP bei kurzem Haar."
 },

 "Krankhafte Reinlichkeit": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Extremes Unwohlsein bei Verschmutzung von sich selbst oder der Umgebung. Ablenkung verhindert Konzentration auf andere Ziele.",
 passiveNote: "Schlechte Eigenschaft: Verschmutzung verursacht Konzentrationsverlust."
 },

 "Krankheitsanfällig": {
 type: "disadvantage",
 description: "KO-Proben gegen Ansteckung und Schadensreduktion bei Krankheiten +5 erschwert. Nicht mit Resistenz/Immunität gegen Krankheiten.",
 passiveNote: "KO-Proben gegen Krankheiten +5 erschwert. Nicht mit Resistenz/Immunität."
 },

 "Kristallgebunden": {
 type: "disadvantage",
 description: "Magischer Nachteil (nur Kristallomanten): Jede Zauberhandlung ist an Edelsteine gebunden (+1–10 Aktionen für Vorbereitung). Spontanmodifikationen ohne Kristall doppelt. Ohne Kristall: +12 auf Zauberprobe.",
 passiveNote: "Zauber nur mit Edelsteinen (+1–10 Aktionen). Ohne: +12. Spontanmod. doppelt."
 },

 "Kurzatmig": {
 type: "disadvantage",
 description: "Je –2 AuP (max. –6 AuP). Erschöpfungsschwelle bereits bei KO–1 bzw. KO–2.",
 passiveNote: "–2 AuP (max. –6). Erschöpfungsschwellen bei KO–1/–2."
 },

 "Lahm": {
 type: "disadvantage",
 description: "Lahmes Bein. GE –2 (beeinflusst Kampfwerte). GS –1 (min. 1). Körperliche Beinarbeits-Talente +3 erschwert. Dauerhaft, nicht durch Prothese oder Magie behebbar.",
 passiveNote: "GE –2, GS –1. Körperl. Beinarbeits-Talente +3. Dauerhaft."
 },

 "Lästige Mindergeister": {
 type: "disadvantage",
 description: "Magischer Nachteil: Mindergeister (Windbeutel, Tränlinge, Krautwichte, Flammenbolde) werden vom Held angezogen. Entstehen bei misslungenem Zauber >10 AsP und bei Patzern. Probenerschwernis bis 1 Punkt.",
 passiveNote: "Mindergeister bei misslungenem Zauber >10 AsP / Patzer. Bis –1 auf Proben."
 },

 "Lichtempfindlich": {
 type: "disadvantage",
 description: "Der Held reagiert empfindlich auf helles Licht: Abzüge auf Proben in direktem Sonnenlicht oder bei starker künstlicher Beleuchtung. Kumulativ mit Fluch der Finsternis.",
 passiveNote: "Abzüge bei hellem Licht auf Proben. Kumulativ mit Fluch der Finsternis. Variabel."
 },

 "Lichtscheu": {
 type: "disadvantage",
 description: "Stärkere Variante von Lichtempfindlich: Starke Vermeidungsreaktion bei hellem Licht, starke Probenabzüge oder Handlungsunfähigkeit bei direktem Sonnenlicht. Kumulativ mit Fluch der Finsternis.",
 passiveNote: "Starke Abzüge/Handlungsunfähigkeit bei Sonnenlicht. Kumulativ mit Fluch der Finsternis."
 },

 "Meeresangst": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Der Held reagiert mit Angst auf das Meer und auf Schiffsfahrten, was zu Einschränkungen und Probenabzügen führt.",
 passiveNote: "Schlechte Eigenschaft: Angst vor dem Meer / Schiffsfahrten. Probenabzüge."
 },

 "Mondsüchtig": {
 type: "disadvantage",
 execute: "mondsüchtig",
 description: "Fühlt sich in der Mondphase zunehmend verzückt: Neumond 0 Punkte, 1 Woche danach 1 Punkt, 2 Wochen 2 Punkte, Vollmondnacht 4 Punkte Verzückung. Neigung zu Visionen und Schlafwandeln. Verzückung addiert sich zu Entrückung.",
 passiveNote: "Zunehmende Verzückung mit Mondphase (bis 4 Punkte Vollmond). Visionen, Schlafwandeln."
 },

 "Moralkodex": {
 type: "disadvantage",
 description: "Verpflichtungen durch religiösen oder weltanschaulichen Moralkodex (Pflichten, Gesetze, Speisegebote). Bruch führt zu Gewissensbissen mit Wirkung einer Schlechten Eigenschaft.",
 passiveNote: "Religiöse/weltl. Pflichten. Bruch: Schlechte-Eigenschaft-Wirkung."
 },

 "Nachtblind": {
 type: "disadvantage",
 description: "Doppelte Beleuchtungsabzüge (max. entsprechend Totaldunkel: AT/PA –8, FK –4 Größenklassen, Talente –16). Nicht mit Dämmerungssicht/Nachtsicht.",
 passiveNote: "Doppelte Dunkelabzüge (max. –8 AT/PA, –16 auf Talente). Nicht mit Nachtsicht."
 },

 "Nahrungsrestriktion": {
 type: "disadvantage",
 description: "Mind. 50 % der täglichen Nahrung muss einer bestimmten Kategorie angehören. Bei Verstoß: LeP/AsP-Regen –2/Nacht. Nach >3 Tagen: kein Regen + KO –1/Tag (bis KO/2).",
 passiveNote: "50 % Nahrung eng kategorisiert. Verstoß: LeP/AsP –2/Nacht; >3 Tage: KO –1/Tag."
 },

 "Neid": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Missgönnt anderen Erfolg und Besitz, will beides für sich. Hintertreibt Bemühungen anderer.",
 passiveNote: "Schlechte Eigenschaft: Missgönnt anderen, hintertreibt Bemühungen."
 },

 "Neugier": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Muss alles Interessante untersuchen, unabhängig von Risiken. Zwang zur Untersuchung statt Einschränkung anderer Proben.",
 passiveNote: "Schlechte Eigenschaft: Zwang zur Untersuchung aller Interessantes ungeachtet der Risiken."
 },

 "Niedrige Astralkraft": {
 type: "disadvantage",
 description: "Magischer Nachteil: –1 AsP zu Spielbeginn je Punkt.",
 passiveNote: "–1 AsP je gewähltem Punkt (max. –6 AsP). (System: AsP-Maximum automatisch reduziert.)"
 },

 "Niedrige Lebenskraft": {
 type: "disadvantage",
 description: "–1 LeP je gewähltem Punkt (max. –6 LeP).",
 passiveNote: "–1 LeP je Punkt (max. –6 LeP). (System: LeP-Maximum automatisch reduziert.)"
 },

 "Niedrige Magieresistenz": {
 type: "disadvantage",
 description: "MR kann durch diesen Nachteil um bis zu 3 Punkte gesenkt werden. MR darf nicht unter 0 sinken.",
 passiveNote: "MR –1 je Punkt (max. –3 MR). Nicht unter 0. (System: MR automatisch reduziert.)"
 },

 "Pechmagnet": {
 type: "disadvantage",
 description: "Meister darf bei Zufallswürfen den Held deutlich benachteiligen. Pro Spielabend darf der Meister einen Würfelwurf zum Misserfolg erklären. Dramaturgischer Nachteil; nur für erfahrene Gruppen.",
 passiveNote: "Meister: 1× pro Abend Wurf zum Misserfolg. Zufallswürfe benachteiligend."
 },

 "Platzangst": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Beklemmung durch große offene Flächen (Meer, Steppe, Eis).",
 passiveNote: "Schlechte Eigenschaft: Beklemmung bei großen offenen Flächen."
 },

 "Prinzipientreue": {
 type: "disadvantage",
 description: "Moralische Grundsätze aus eigener Überzeugung oder Ausbildung. Bruch führt zu Gewissensbissen (Schlechte-Eigenschaft-Wirkung). Typische Formen: Ehrenkodex, Ordensvorschriften, religiöse Gebote.",
 passiveNote: "Moralische Pflichten; Bruch: Schlechte-Eigenschaft-Wirkung."
 },

 "Rachsucht": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Muss unbedingt und ohne Rücksicht auf Verluste Rache nehmen, wenn er sich schlecht behandelt fühlt. Im Gegensatz zu Jähzorn auch langfristige geplante 'kalte Rache'.",
 passiveNote: "Schlechte Eigenschaft: Zwang zu Rache, auch langfristig geplant."
 },

 "Randgruppe": {
 type: "disadvantage",
 description: "Angehöriger einer kleinen, suspekten Kultur. SO max. 8. Gesellschaftliche Proben können erschwert sein. Im Extremfall droht Lynchjustiz.",
 passiveNote: "SO max. 8. Gesellschaftl. Proben möglicherw. erschwert. Misstrauen/Feindseligkeit."
 },

 "Raubtiergeruch": {
 type: "disadvantage",
 description: "Typischer Raubtiergeruch löst Aggressions- oder Fluchtreaktionen bei Tieren aus. Abrichten und Reiten-Proben +5 erschwert. Unter Regen/Wasser wirkungslos, nicht abwaschbar.",
 passiveNote: "Abrichten/Reiten +5 erschwert. Nicht abwaschbar. Unter Regen/Wasser kein Effekt."
 },

 "Raumangst": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Beklemmung durch enge Räume, niedrige Decken, schmale Tunnel. Zwang, enge Räume schnell zu verlassen.",
 passiveNote: "Schlechte Eigenschaft: Beklemmung in engen Räumen / Tunneln."
 },

 "Rückschlag": {
 type: "disadvantage",
 description: "Magischer Nachteil: Misslungene Sprüche (auch positive) fallen mit halber Stärke auf den Zauberer zurück; Patzer mit voller Wirkung (keine MR). Gilt nur für Spruchzauberei. Nicht mit Feste Matrix.",
 passiveNote: "Misslungene Sprüche: ½ Wirkung auf Anwender. Patzer: volle Wirkung (keine MR)."
 },

 "Schlafstörungen": {
 type: "disadvantage",
 description: "I: ¼ der Nächte gestört; LeP/AsP-Regen 1W6–1, AU auf ¾, alle Proben +3 für 4 Std. nach Aufwachen. II: ½ der Nächte gestört; gleiche Wirkung + Einschlafprobe SE+7 nötig.",
 passiveNote: "Störung ¼ (I) oder ½ (II) der Nächte. LeP/AsP-Regen 1W6–1. Proben +3 morgens."
 },

 "Schlafwandler": {
 type: "disadvantage",
 description: "Neigt zum Schlafwandeln (~1/4 Nächte, W20 1–5). Kann gefährliche Aktionen ausführen. Bei Wecken: KL/IN –3, teils aggressiv. Längere Wanderungen: Regen –1 in dieser Nacht.",
 passiveNote: "~¼ Nächte Schlafwandeln (1–5 auf W20). Geweckt: KL/IN –3. Regen –1."
 },

 "Schlechte Eigenschaft": {
 type: "disadvantage",
 description: "Unkontrollierbare Ängste, Zwangsvorstellungen u.ä. (Raumangst, Höhenangst, Goldgier, Jähzorn, Neugier usw.). Wirkung: Proben erschwert oder Probe auf die Eigenschaft. Startwert 5–12. Abbaupfad im Spiel möglich.",
 passiveNote: "Unkontrollierbare Einschränkung. Proben erschwert oder Eigenschaftsprobe. Startwert 5–12."
 },

 "Schlechte Regeneration": {
 type: "disadvantage",
 description: "Regeneriert nur 1W6–1 LeP pro Ruhephase. KO-Würfe zur Wundheilung +2 erschwert. Nicht kombinierbar mit Schneller Heilung.",
 passiveNote: "LeP-Regen nur 1W6–1/Ruhephase. KO-Heilungswürfe +2 erschwert. (System: LeP-Regenerationsmalus automatisch eingerechnet.)"
 },

 "Schlechter Ruf": {
 type: "disadvantage",
 description: "Berüchtigt für negative Charakterzüge. –1 auf gesellschaftliche Proben. Je nach Situation SO entsprechend gemindert. Gilt in eigener Kultur.",
 passiveNote: "–1 gesellschaftliche Proben. SO teils gemindert. Eigene Kultur."
 },

 "Schneller Alternd": {
 type: "disadvantage",
 description: "Altert schneller als Rassegenossen. Altersschwellen bereits bei 2/3 der üblichen Jahreszahl. Nicht für Elfen/Zwerge; nicht mit Altersresistenz.",
 passiveNote: "Altersschwellen bei ⅔ der üblichen Zeit. Nicht für Elfen/Zwerge."
 },

 "Schulden": {
 type: "disadvantage",
 description: "Schulden für Ausbildung, Erstausstattung o.ä. Rückzahlung 1/10 pro Jahr (mit Zinsen). Flucht = Gesucht II. Kein Kredit mehr möglich. Nur für SO ≥7.",
 passiveNote: "Schulden (1/10 je Jahr zurückzahlen). Flucht = Gesucht II. Kein neuer Kredit."
 },

 "Schwache Ausstrahlung": {
 type: "disadvantage",
 description: "Magischer Nachteil: Alle Zauber-/Ritualproben mit CH-Teilprobe um Wert (max. 5) erschwert. Doppelt-CH-Zauber: doppelter Malus + eine Spalte teurer. Aura leichter zu tarnen: SCHLEIER um Wert erleichtert. Nur Spruchzauberer.",
 passiveNote: "Zauber mit CH-Probe –[Wert] (max. 5). SCHLEIER +[Wert] erleichtert."
 },

 "Schwacher Astralkörper": {
 type: "disadvantage",
 description: "Magischer Nachteil: Pro 12 AsP in Zauber eingesetzt: zusätzlich 1W3 AsP unwillentlich verloren. Gilt auch bei Nähe zu mächtigen Auren, bei profitierendem/schädigendem Zauber.",
 passiveNote: "Pro 12 AsP in Zauber: +1W3 AsP Verlust unwillentlich. Auch bei fremder Magie."
 },

 "Schwanzlos": {
 type: "disadvantage",
 description: "Nur für beschwänzte Rassen (z.B. Achaz). GE-Proben und GE-Teilproben bei Körpertalenten +1 erschwert. Kein Schwanzangriff. Balance reduziert sich.",
 passiveNote: "GE-Proben +1. Kein Schwanzangriff. Balance reduziert. Nur beschwänzte Rassen."
 },

 "Seffer Manich": {
 type: "disadvantage",
 description: "Zibilja-Nachteil: Rituale an Seffer Manich (Sippenchronik) und Neroth (Rollsiegel) gebunden. Ohne beide: +12 auf Probe. Fehlt eine: +6. Reisende Zibilja mit Auszügen: grunds. +4 (bis +8/12 bei fehlendem Material).",
 passiveNote: "Rituale ohne Seffer Manich/Neroth: +6–12. Reisend: grunds. +4."
 },

 "Selbstgespräche": {
 type: "disadvantage",
 description: "Murmelt/redet vor sich hin ohne Bewusstsein. Kann Geheimnisse, Pläne oder Meinungen über Mitspieler/NSCs ausplaudern.",
 passiveNote: "Unbewusstes Laut-Denken. Kann Geheimnisse verraten."
 },

 "Sensibler Geruchssinn": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Belästigende Gerüche (Fäulnis, Vergärtes, Kloaken) erfordern Selbstbeherrschungs-Probe (erschwert um Wert), sonst Flucht oder Übergeben. Vor allem bei Elfen.",
 passiveNote: "SE-Probe gegen schlechte Gerüche (erschwert). Sonst Flucht/Übergeben."
 },

 "Sippenlosigkeit": {
 type: "disadvantage",
 description: "Nur für Elfen. Hat Sippe verloren/ist ausgeschlossen. Große Meditation verschlossen. Neue Sippe nötig für Salasandra-SF. Unbekannte Elfenlieder kosten doppelt.",
 passiveNote: "Große Meditation verschlossen. Salasandra-SF neu nötig. Elfenlieder 2× AP. Nur Elfen."
 },

 "Sonnensucht": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft (nur für Wesen mit Kältestarre): Abzüge, wenn keine 2 Stunden direktes Sonnenlicht pro Tag möglich.",
 passiveNote: "Abzüge ohne 2 Std. Sonnenlicht täglich. Nur für Kältestarre-Wesen."
 },

 "Speisegebote": {
 type: "disadvantage",
 description: "Religiöse/kulturelle Einschränkung der Nahrung (kein Feuer-Kochen, kein Fleisch, Ungläubiger-Zubereitung meiden o.ä.). Gezwungener Bruch: Schlechte-Eigenschaft-Wirkung mit Wert 5. Variante von Prinzipientreue.",
 passiveNote: "Eingeschränkte Nahrungsauswahl. Bruch: SE-Wirkung mit 5. Prinzipientreue-Variante."
 },

 "Spielsucht": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Verlangen nach Wetten und Glücksspielen. Aufhören erfordert Selbstbeherrschungs-Probe (erschwert um Wert der Eigenschaft).",
 passiveNote: "Schlechte Eigenschaft: Zwang zu Glücksspielen. SE-Probe zum Aufhören (erschwert)."
 },

 "Sprachfehler": {
 type: "disadvantage",
 description: "Stottern, Lispeln oder Nuscheln. Gesellschaftliche Proben mit aktiver Sprache (Überreden, Lehren, Betören) +3 erschwert. Verbale Zauber +3. Kein Rufen, kein Taktik im Kampf.",
 passiveNote: "Gesellschaftl./verbale Proben +3. Verbale Zauber +3. Kein Rufen/Taktik."
 },

 "Spruchhemmung": {
 type: "disadvantage",
 description: "Magischer Nachteil: ~1/7 der Zauberproben scheitern, wenn zwei (oder drei) W20 dieselbe Zahl zeigen (verpufft trotz Erfolg, kostet volle AsP). Wiederholung +3 erschwert. Mehrfach-1 trotzdem Kritiker, Mehrfach-20 Patzer.",
 passiveNote: "~1/7 der Zauber verpufft (gleiche Augenzahl auf 2+ W20). Voll AsP-Kosten."
 },

 "Stigma": {
 type: "disadvantage",
 description: "Dauerhaftes, übernatürliches Körpermerkmal (grünes Haar, Katzenaugen, dämonische Wundnarben). Gesellschaftliche Proben ~3 Punkte erschwert, wenn sichtbar. Sehr schwer loszuwerden. Je nach Stärke unterschiedlich.",
 passiveNote: "Übernatürl. Merkmal: gesellschaftl. Proben ~3 erschwert wenn sichtbar."
 },

 "Streitsucht": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Sieht Streit als Machtbeweis, vertritt oft Gegenpositionen, um Konflikte zu provozieren.",
 passiveNote: "Schlechte Eigenschaft: Provokativer Widerspruch, Streithändel."
 },

 "Stubenhocker": {
 type: "disadvantage",
 description: "Jugend in Bibliotheken/Studierstuben. Keine körperl./Kampftalente >+2 bei Generierung. Max. 5 körperl./Kampftalente aufwertbar. Spätere Steigerung 1 Kategorie teurer. GE/KK/KO max. 11 zu Spielbeginn. Abbau möglich (300–500 AP/Woche körperliche Aktivität).",
 passiveNote: "Körperl. Talente max. +2, 1 Kat. teurer. GE/KK/KO max. 11. Abbau möglich."
 },

 "Sucht": {
 type: "disadvantage",
 description: "Körperliche Abhängigkeit von einer Droge (Giftstufe bedingt Dauer bis Entzug). Ohne Droge: kein Regen, Erschöpfung Drogenstufe/3, Proben Drogenstufe/3 erschwert. Bei längerem Entzug: Schaden.",
 passiveNote: "Tägl. Dosis nötig. Entzug: kein Regen, Erschöpfung + Proben Stufe/3 erschwert."
 },

 "Thesisgebunden": {
 type: "disadvantage",
 description: "Magischer Nachteil: Muss Thesisobjekt (Blatt, Kristall) für den Zauber bei sich haben und ansehen. Ohne: Spontanmodifikation (7 ZfP Aufwand, +3 Aktionen, keine weiteren Spontanmod.). Nur Gildenmagier, Hexen der Schwesternschaft des Wissens, Kristallomanten, Scharlatane.",
 passiveNote: "Thesis-Objekt nötig. Ohne: 7 ZfP Aufwand, +3 Aktionen, keine Spontanmod."
 },

 "Tollpatsch": {
 type: "disadvantage",
 description: "Talentproben sind Patzer wenn 2 Würfel 19+ zeigen. Eigenschafts-/AT-/PA-Proben: 19 oder 20 = Patzer. Gilt nicht für Zauberei. Nicht mit Feste Matrix oder Wilder Magie.",
 passiveNote: "Talentpatzer bei 2× 19+. Eig./AT/PA: 19–20 = Patzer. Nicht für Zauberei. (System + Modul: Patzerbedingung auf 19/20 bei AT/PA/Eigenschaftsproben automatisch angewendet.)"
 },

 "Totenangst": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Angst vor allem Todesassoziierten (Untote, Gräber, Boron-Geweihte).",
 passiveNote: "Schlechte Eigenschaft: Angst vor Untoten, Gräbern, Boron-Geweihten."
 },

 "Übler Geruch": {
 type: "disadvantage",
 description: "Riecht dauerhaft schlecht (nicht durch Baden behebbar). Gesellschaftliche/CH-Proben in Riechweite –2. Wesen mit ausgeprägtem Geruchssinn: –4. Kann Tierproben beeinflussen. Nur teure Duftmittel helfen kurzzeitig.",
 passiveNote: "Gesellschaftl./CH-Proben in Riechweite –2. Wesen mit Geruchssinn –4."
 },

 "Unangenehme Stimme": {
 type: "disadvantage",
 description: "Schrille oder unangenehme Stimme. Gesellschaftliche/CH-Proben mit Sprechen –2. Bei Barden/Elfen: –4. Abrichten/Fahrzeug Lenken ebenfalls mit Abzug. Nicht mit Wohlklang.",
 passiveNote: "Gesellschaftl./CH-Proben mit Sprechen –2. Bei Elfen/Barden –4. Abrichten –Abzug."
 },

 "Unansehnlich": {
 type: "disadvantage",
 description: "Unangenehmes, abstoßendes Äußeres. Gesellschaftliche/CH-Proben –2. Einschüchtern CH +1. Beruhigen/Sympathie CH –1. Nicht mit Gut Aussehend oder Widerwärtigem Aussehen.",
 passiveNote: "Gesellschaftl./CH –2. Einschüchtern +1 CH. Beruhigen –1 CH. Nicht mit Gut Aussehend."
 },

 "Unfähigkeit für": {
 type: "disadvantage",
 description: "Kein Zugang zu bestimmten Zauberei-Merkmalen oder Talentgruppen. Merkmale: +1 Spalte teurer + keine Spontanmod. + ZfW-Limit auf schlechteste Eigenschaft. Talentgruppen: Steigerung 1 Spalte teurer.",
 passiveNote: "Zaubermerkmale/Talentgruppe 1 Spalte teurer, keine Spontanmod."
 },

 "Vergesslichkeit": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Der Held vergisst regelmäßig wichtige Informationen, Namen, Absprachen. Unkontrollierbar.",
 passiveNote: "Schlechte Eigenschaft: Regelmäßiges Vergessen wichtiger Details/Namen."
 },

 "Vorurteile": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Vorurteile gegen eine bestimmte Gruppe (Rasse, Geschlecht, Kultur). Einschränkungen bei Interaktionen mit der betroffenen Gruppe.",
 passiveNote: "Schlechte Eigenschaft: Einschränkungen bei Interaktion mit bestimmter Gruppe."
 },

 "Wahnvorstellungen": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Feste, unrealistische Überzeugungen (dämonische Besessenheit der Umwelt, Weltverschwörung u.ä.). Deutlich lockerer Realitätsbezug als bei Einbildungen. Nicht mit Einbildungen kombinierbar.",
 passiveNote: "Schlechte Eigenschaft: Feste unrealistische Überzeugungen. Schwerwiegender als Einbildungen."
 },

 "Wahrer Name": {
 type: "disadvantage",
 description: "Magischer Nachteil: Der Held ist sehr stark mit seinem Wahren Namen verbunden. Wer diesen Namen kennt, kann ihn leicht unter seinen Willen zwingen (Regeln in Wege der Zauberei).",
 passiveNote: "Wahrer Name macht Held anfällig für Beherrschung durch Kenner des Namens."
 },

 "Weltfremd": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft: Naivität gegenüber bestimmten Alltagskonzepten (Religion, Geld, Stadtleben, Adelsherrschaft..). Erschwernis auf passende Proben in Höhe des Werts. Mehrere Bereiche möglich.",
 passiveNote: "Schlechte Eigenschaft: Naivität in gewähltem Bereich, Erschwernis = Wert."
 },

 "Widerwärtiges Aussehen": {
 type: "disadvantage",
 description: "Stärkere Variante von Unansehnlich. Gesellschaftliche/CH-Proben –5. Einschüchtern CH +2, Beruhigen/Sympathie CH –2. In Menge kaum verbergbar. Passanten erinnern sich lange.",
 passiveNote: "Gesellschaftl./CH –5. Einschüchtern +2 CH, Beruhigen –2 CH. Kaum in Menge versteckbar."
 },

 "Wilde Magie": {
 type: "disadvantage",
 description: "Magischer Nachteil: Patzer bereits bei 2× 19 oder 19+20 (~1/30 Proben). Gilt für Sprüche und Rituale. Nicht für Gildenmagier. Nicht mit Feste Matrix oder Tollpatsch.",
 passiveNote: "Patzer bereits bei 2×19 oder 19+20. Sprüche + Rituale. Nicht mit Feste Matrix."
 },

 "Zielschwierigkeiten": {
 type: "disadvantage",
 description: "Magischer Nachteil: Muss bei Zaubern auf Einzelziele aktiv zielen (als würde es sich immer in Reichweite Horizont befinden, auch bei Nahbereich). Entsprechende Erschwernis auf alle Zauberproben auf Einzelziele.",
 passiveNote: "Muss bei Einzelziel-Zaubern immer zielen (wie Horizont). Erschwernis auf Zauberprobe."
 },

 "Zögerlicher Zauberer": {
 type: "disadvantage",
 description: "Magischer Nachteil: Alle Zauber-/Ritualproben mit MU-Teilprobe um Wert (max. 5) erschwert. Doppelt-MU-Zauber: doppelter Malus + eine Spalte teurer. Dämonenbannungen/Austreibungen ebenfalls erschwert. Nur Spruchzauberer.",
 passiveNote: "Zauber mit MU-Probe –[Wert] (max. 5). Dämonen-/Geisterproben –[Wert]."
 },

 "Zwergenwuchs": {
 type: "disadvantage",
 description: "GS –2. Sprungweite/-höhe reduziert. Waffen >1,3 Schritt: –3 AT/PA. Last-BE wird halbiert vor GS-Abzug. Ausweichen +1 erleichtert, Umreißen +2 erleichtert.",
 passiveNote: "GS –2. Waffen >1,30 Schritt –3 AT/PA. BE-Halbierung für GS. Ausweichen +1. (System: GS und BE-Berechnung automatisch angepasst.)"
 },

 "Einbeinig": {
 type: "disadvantage",
 description: "Dem Held fehlt ein Bein. –25 GP. GE –5 (wirkt auch auf Kampfbasiswerte), GS –3 (mindestens 1). Kann im späteren Spielverlauf nicht durch Prothese oder Zauberei ausgeglichen werden. Nicht kombinierbar mit Lahm.",
 passiveNote: "GE –5 (inkl. AT/PA-Basis), GS –3. Dauerhaft, keine Prothesen-Kompensation."
 },

 "Eingeschränkte Elementarnähe": {
 type: "disadvantage",
 description: "Schamanennachteil (H; –3 GP). Jede Schamanentradition pflegt nur Umgang mit 3 der 6 Elemente (je nach Profession angegeben). Die anderen 3 Elemente können weder mit dem Ritual Meister der Elemente noch auf anderem magischen Weg gerufen werden. Kombinierbar mit dem Vorteil Affinität zu Elementaren. Gilt auch für Brobim-Geoden.",
 passiveNote: "Nur 3 von 6 Elementen zugänglich (traditionsabhängig). Andere nicht rufbar."
 },

 "Einhändig": {
 type: "disadvantage",
 description: "Der Held hat eine Hand verloren (linke Hand bei Rechtshändern). –10 GP. Eigenschaftsproben bei Zwei-Hände-Tätigkeiten +3 erschwert, Talentproben +5 erschwert. Bogenschießen und Führen zweihändiger Waffen ohne spezielle Prothese nicht möglich. Dauerhaft, nicht durch Magie kompensierbar. Nicht kombinierbar mit Einarmig.",
 passiveNote: "Zwei-Hände-EigProben +3, TalentProben +5. Bogen/Zweihandwaffen unmöglich."
 },

 "Medium": {
 type: "disadvantage",
 description: "Nachteil (–7 GP). Der Geist des Charakters ist besonders anfällig dafür, von Geistern übernommen zu werden. MR gegen alle Beeinflussungen, Beherrschungen, Hellsichten und Verständigungen von Geistern (inkl. Besessenheit) um 5 Punkte gesenkt. An Orten mit Geisterpräsenz nervös: Probenerschwernisse von +1 bis +7 auf Talent- und Zauberproben (je nach Intensität des Ortes).",
 passiveNote: "MR –5 gegen Geisterwirkungen. An geisterfüllten Orten +1 bis +7 Erschwernisse."
 },

 "Unfrei": {
 type: "disadvantage",
 description: "–5 GP. Der Held ist Leibeigener (Mittelreich, Bornland, Nostria, Andergast, teils Horasreich) oder Sklave (Südliche Stadtstaaten, Tulamidenland). Darf ohne Geleitbrief oder Begleitung seines Herrn nicht reisen. Nicht rechtsfähig. SO-Maximum: 7. Waffenverbot (außer Dolche, Knüppel, waffenfähige Arbeitsgeräte). Verstoß gegen Reise-/Waffenauflage = Gesucht I.",
 passiveNote: "Kein freies Reisen. Nicht rechtsfähig. SO max. 7. Waffenverbot (außer Dolch/Knüppel)."
 },

 "Ungebildet": {
 type: "disadvantage",
 description: "Je 40 Start-AP opfern = 1 GP; maximal 5 GP erreichbar. Die geopferten AP stehen bei der Heldenerstellung nicht zur Verfügung. Nicht kombinierbar mit dem Vorteil Gebildet.",
 passiveNote: "40 Start-AP opfern = 1 GP (max. 5 Stufen/200 AP). Nicht mit Gebildet."
 },

 "Verschwendungssucht": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft (je –1 GP). Der Held hat kein Gespür für Geld und Werte: Er kauft, was ihm gefällt, ohne auf den Preis zu achten, und gibt mit vollen Händen aus. Helden mit hohem SO stellen häufig Schuldscheine aus (was im Nachteil Schulden enden kann). Nicht kombinierbar mit Geiz.",
 passiveNote: "Schlechte Eigenschaft: Unkontrolliertes Geldausgeben. Kombinierbar mit Schulden."
 },

 "Einäugig": {
 type: "disadvantage",
 description: "–5 GP. Der Held hat das Augenlicht eines Auges oder das Auge selbst verloren. Malus von 4 Punkten auf alle Wurfwaffen-Proben und auf Schusswaffen-Proben unter 10 Schritt Entfernung. Der Kontrollbereich ist um die Hälfte eingeschränkt. Einäugige Zauberer erleiden +4 Erschwernis, wenn sie einen Zauber besonders zielen müssen (Reichweite Horizont, Zielschwierigkeiten, Sondersituationen). Dauerhaft — weder durch Magie noch auf andere Weise heilbar.",
 passiveNote: "Wurfwaffen/Schusswaffen (unter 10 Schritt) –4. Kontrollbereich halbiert. Zielen beim Zaubern +4."
 },

 "Eitelkeit": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft (je –1 GP). Ein eitler Held versucht, in jeder Situation gut auszusehen und Eindruck zu schinden. Das macht ihn leichter manipulierbar, da dieses Bedürfnis auch den vernünftigen Rahmen sprengt. Er versucht, Situationen zu meiden, in denen sein Aussehen leiden könnte, und verbraucht viel Zeit mit Körperpflege.",
 passiveNote: "Schlechte Eigenschaft: Leichter manipulierbar. Meidet Situationen die das Aussehen gefährden."
 },

 "Elfische Weltsicht": {
 type: "disadvantage",
 description: "–30 GP; nur Elfen. Elfen erlernen alle Talente und Zauber um eine Spalte erschwert, die nicht zu ihren 'Leittalenten' (L) gehören. Nicht-L-Sonderfertigkeiten kosten 150% der üblichen AP. Automatische Leittalente: Athletik, Körperbeherrschung, Malen/Zeichnen, Musizieren, Orientierung, Schleichen, Singen, Sinnenschärfe, Tanzen, Wettervorhersage sowie alle gewählten Gaben. L-Sonderfertigkeiten sind u.a.: Ausweichen I–III, Elfenlieder, Gefäß der Sterne, Geländekunde (Hauptgelände), Große Meditation, Kulturkunde (eigene), Meisterliche Regeneration, Regeneration I/II, Salasandra, Simultanzaubern, Tierischer Begleiter, Zauberkontrolle.",
 passiveNote: "Nicht-Leittalente/Zauber +1 Spalte erschwert. Nicht-L-SFs zu 150% AP. Leittalente nach Kultur und Profession."
 },

 "Madas Fluch": {
 type: "disadvantage",
 description: "Magischer Nachteil (ZH; –1/–2/–3 GP; typisch für Nivesen-Schamanen). An den drei Tagen vor Vollmond, am Vollmond und an den drei Tagen danach sind alle Zauber- und Ritual-Proben um 1, 2 oder 3 Punkte erschwert (je nach Stärke des Nachteils, sowohl bei Tag als auch nachts). Selten für Nicht-Nivesen; bei Ausdehnung auf weltliche Talente dreifache GP.",
 passiveNote: "ZH. 7 Tage um Vollmond: alle Zauber-/Ritual-Proben um 1/2/3 erschwert."
 },

 "Miserable Eigenschaft": {
 type: "disadvantage",
 description: "–10 GP. Eine Eigenschaft, die der Held bei der Generierung auf einen Wert von 8 gesetzt hat (vor Modifikatoren), wird auf 7 gesenkt. Diese Eigenschaft kann im späteren Spiel nur zu den doppelten Steigerungskosten angehoben werden. Dieser Nachteil kann mehrfach gewählt werden, jedoch für jede Eigenschaft nur einmal.",
 passiveNote: "Eine Eigenschaft von 8 auf 7 senken. Doppelte Steigerungskosten für diese Eigenschaft. Mehrfach wählbar."
 },

 "Unstet": {
 type: "disadvantage",
 description: "–25 GP. Der Charakter kann sich nur schwer langfristig konzentrieren, ist verspielt und launisch. Alle Talentproben, die mehr als sechs Stunden erfordern, sind um 3 Punkte erschwert. Wissens- und Handwerkstalente werden nach Spalte C gesteigert. Nicht kombinierbar mit Begabung Handwerkstalente, Begabung Wissenstalente oder entsprechenden Unfähigkeiten. Bei Zauberern: Sprüche der Komplexität C+ sind betroffen; Ritual-Proben über 1 Stunde +3 erschwert; keine ZfP für Stapeleffekte ansammeln.",
 passiveNote: "Talentproben >6h +3. Wissens-/Handwerkstalente Spalte C. Zauber Kx. C+ und Rituale >1h betroffen."
 },

 "Unverträglichkeit mit verarbeitetem Metall": {
 type: "disadvantage",
 description: "Magischer Nachteil (ZHV; –10 GP). Der Zauberkundige ist stärker durch Eisen und andere verarbeitete Metalle in seinem Kraftfluss beeinträchtigt als andere. Er muss die schweren Auswirkungen des Banns des Eisens tragen (nicht nur die leichten wie bei der Eisenaffinen Aura), was bedeutet, dass er kaum jemals metallene Gegenstände benutzen wird. Druiden und Geoden haben diesen Nachteil automatisch.",
 passiveNote: "Schwere Metallbehinderung beim Zaubern (nicht nur leichte). Kein Gebrauch metallener Gegenstände. Druiden/Geoden automatisch."
 },

 "Verpflichtungen": {
 type: "disadvantage",
 description: "–12 GP. Der Held hat gegenüber einer sozialen, magischen oder religiösen Gruppe oder einer Einzelperson besondere Verpflichtungen eingegangen. Das Brechen dieser Verpflichtungen — auch unwissentlich — hat heftigere Auswirkungen als bei Prinzipientreue und zieht eine konkrete Bestrafung durch die Gruppe nach sich. Typischerweise ist der Held Befehlsempfänger und reist in deren Auftrag. Kombinierbar mit dem Nachteil Schulden.",
 passiveNote: "Bindende Pflichten gegenüber Gruppe/Person. Brechen → konkrete Bestrafung. Stärker als Prinzipientreue."
 },

 "Verwöhnt": {
 type: "disadvantage",
 description: "Schlechte Eigenschaft (je –1 GP). Der Held ist ein angenehmes Leben gewohnt. Kann er nicht in einem Bett unter einem Dach schlafen, ist seine KO-Probe bei der Regeneration um seinen Verwöhnt-Wert erschwert; bei Misserfolg gewinnt er nicht nur keinen LeP, sondern regeneriert sogar –1. Traglastschwelle: KK–2 Stein (statt KK). Isst nicht alles — schlechtere Regeneration ohne passende Kost.",
 passiveNote: "Schlechte Eigenschaft: Regenerations-KO-Probe erschwert ohne Bett. Traglast KK–2 Stein. Wählerisch beim Essen."
 },

};

// ─── Lookup ───────────────────────────────────────────────────────────────────

export function getVNAData(name) {
    if (!name) return null;
    const clean = name.trim();
    if (VNA_DATABASE[clean]) return VNA_DATABASE[clean];
    for (const [key, val] of Object.entries(VNA_DATABASE)) {
        if (clean.startsWith(key)) return { ...val, displayName: clean };
    }
    return null;
}
