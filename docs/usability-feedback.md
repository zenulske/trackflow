# Usability-Test Auswertung — TrackFlow

**Datum der Tests:** 06.06.2026  
**Anzahl Testpersonen:** 2 (Emmanuel Walter, Andi Kadolli)  
**Methode:** Moderierter on-site Test, Thinking-Aloud-Methode  
**Ziel:** Validierung des Hauptworkflows, Identifikation von Usability-Problemen und Verbesserungspotenzialen

---

## 1. Ablauf

Beide Testpersonen haben dieselben fünf Aufgaben in **szenariobasierter Sprache** bekommen — ohne App-spezifische Begriffe ("Bereich", "Eintrag"), damit nicht die App-Sprache vorgegeben wird, sondern die intuitive Bedienung getestet werden kann.

**Aufgaben:**
1. Registrierung — App das erste Mal öffnen und ausprobieren
2. Bereich erstellen — Sport-Ziele für den Monat festhalten
3. Eintrag erfassen — 45 Min. Laufen heute Morgen dokumentieren
4. Fortschritt prüfen — Wie weit ist man diese Woche?
5. Zweiten Bereich hinzufügen — Lernzeit (8h/Woche)

Während der Bedienung wurde nach Thinking-Aloud-Methode laut gedacht. Beobachtungen wurden mit FeedbackGrid (Plus / Delta / Ideen / Fragen) festgehalten.

---

## 2. Resultate im Überblick

### 2.1 Quantitative Auswertung

| Metrik | Wert |
|---|---|
| Aufgaben gesamt | 5 |
| Erfolgsquote | **10/10 erfolgreich** (5 × 2 Testpersonen) |
| Durchschnittliche Bearbeitungszeit pro Aufgabe | ~1.5 Minuten |
| Durchschnittliche Schwierigkeit (1-5) | **1.8 / 5** |
| Abbrüche | 0 |

### 2.2 Was hat funktioniert (Plus)

Beide Testpersonen hoben folgende Punkte positiv hervor:

- **Saubere, aufgeräumte UI** — wirkt fokussiert, nicht überladen
- **Klare Übersicht** im Dashboard
- **Einfache Navigation** zwischen Übersicht und Detail
- **Fortschrittsbalken mit Prozentanzeige** — sofort verständlich, motivierender Gamification-Touch
- **Drei flexible Mess-Arten** (Anzahl / Zeit / Eigener Wert)
- **Modal-Warnung beim Löschen** mit Anzahl betroffener Einträge

---

## 3. Gefundene Probleme — priorisiert

Die untenstehende Liste konsolidiert die Beobachtungen beider Testpersonen.

### 🔴 Priorität HOCH

#### P1 — User-Update funktioniert nicht korrekt *(Emmanuel)*
**Beobachtung:** Beim Ändern von Profil-Daten erscheint kein klares Feedback ob die Änderung wirklich gespeichert wurde. Emmanuel vermutete einen Bug ("Keine Kopie vom User sehr wahrscheinlich").  
**Massnahme:** Erfolgsmeldung beim Profil-Update einbauen (Toast oder Alert). Zusätzlich prüfen ob die Session korrekt mit den neuen Daten aktualisiert wird.

#### P2 — Mehr Einträge als Zielwert möglich *(Emmanuel)*
**Beobachtung:** Wenn das Wochenziel z.B. 5 Trainings ist, kann der User trotzdem 8 erfassen. Das Verhalten ist nicht unbedingt falsch (Übererfüllung möglich), aber war für Emmanuel unklar.  
**Massnahme:** Klarstellen durch UI — z.B. "Ziel übererfüllt!" Anzeige statt nur 100% am Maximum.

### 🟡 Priorität MITTEL

#### P3 — Begriff "Bereich" wirkt technisch *(Andi)*
**Beobachtung:** "Bereich" wirkt eher abstrakt. Bessere Alternativen: "Kategorie", "Thema", "Ziel-Kategorie".  
**Massnahme:** Refactoring-Aufwand abschätzen — falls vertretbar, "Bereich" durch "Kategorie" ersetzen (UI + interne Code-Sprache).

#### P4 — Zieltyp-Auswahl beim ersten Mal unklar *(Andi)*
**Beobachtung:** Unterschied zwischen "Einträge" und "Zeit" war nicht sofort verständlich. Auch "Eigener Wert" hat Verwirrung gestiftet — was ist gemeint?  
**Massnahme:** Tooltip oder kurze Beispiel-Texte unter jedem Button:
- "Einträge: z.B. 5 Trainings pro Woche"
- "Zeit: z.B. 8 Stunden Lernzeit pro Woche"
- "Eigener Wert: z.B. 30 km Laufen pro Woche"

#### P5 — Fehlende Erfolgsmeldung nach Speichern *(Andi)*
**Beobachtung:** Nach dem Erfassen eines Eintrags wird man direkt weitergeleitet, ohne visuelle Bestätigung. Andi war kurz unsicher ob der Eintrag wirklich gespeichert wurde.  
**Massnahme:** Toast-Notification oder kurze Erfolgsmeldung ("Eintrag gespeichert ✓") nach jedem Save.

#### P6 — Lösch-Button nicht beschriftet *(Emmanuel)*
**Beobachtung:** Der Lösch-Button bei Bereichen/Einträgen war anfangs nicht sofort als solcher erkennbar.  
**Massnahme:** ✅ **Bereits umgesetzt** — Lösch-Buttons haben jetzt klare "Löschen"-Beschriftung statt nur ein Icon.

### 🟢 Priorität NIEDRIG

#### P7 — Dashboard wirkt voll bei vielen Bereichen *(Emmanuel)*
**Beobachtung:** Wenn viele Bereiche vorhanden sind, wirkt das Dashboard schnell überladen.  
**Massnahme:** Filter oder Gruppierung im Dashboard ("Diese Woche aktiv", "Nicht erreicht", "Erreicht"). Eventuell auch Sortier-Optionen.

#### P8 — Schnellzugriff "Eintrag erfassen" auf Bereich-Detailseite *(Andi)*
**Beobachtung:** Beide Testpersonen suchten zuerst auf der Bereich-Detailseite einen "+ Eintrag" Button.  
**Massnahme:** ✅ **Bereits umgesetzt** — Der "+ Eintrag" Button ist jetzt auf der Bereich-Detailseite oben prominent platziert.

#### P9 — Pflichtfelder klarer markieren *(Andi)*
**Beobachtung:** Bei "Eigener Wert" war nicht sofort klar dass die Einheit Pflicht ist.  
**Massnahme:** ✅ **Bereits umgesetzt** — Rote Sternchen bei Pflichtfeldern, plus klare Fehlermeldung bei Fehler.

---

## 4. Neue Ideen / Feature-Vorschläge

Diese Vorschläge wurden während der Tests von den Testpersonen genannt — *nicht alle wurden umgesetzt*, dienen aber als Backlog für eine Weiterentwicklung:

| # | Idee | Quelle |
|---|------|--------|
| F1 | Streak-Anzeige ("5 Wochen in Folge Ziel erreicht!") | Andi |
| F2 | Erinnerungsfunktion / Notifications | Andi |
| F3 | Tipp-Texte / Beispiele beim Bereich-Erstellen | Andi |
| F4 | Direkter Eintrag-Button auf jeder Bereichskarte | Andi |
| F5 | Wochenansicht (alle Bereiche im Vergleich) | Andi |
| F6 | Roadmap-Übersicht | Emmanuel |
| F7 | Analyse-Übersicht (z.B. Statistik über alle Bereiche) | Emmanuel |
| F8 | Filter / Unter-Abschnitte für Ziele im Dashboard | Emmanuel |

---

## 5. Abgeleitete Massnahmen — Was wurde aus den Tests umgesetzt?

| Problem | Massnahme | Status |
|---------|-----------|:------:|
| P6 — Lösch-Button unklar | Beschriftung "Löschen" hinzugefügt | ✅ |
| P8 — Schnellzugriff fehlt | "+ Eintrag" auf Bereich-Detailseite ergänzt | ✅ |
| P9 — Pflichtfelder unklar | Sternchen + Validierungsmeldungen | ✅ |
| F4 — Direkter Eintrag-Button | Auf Bereichskarte im Dashboard ergänzt | ✅ |
| P4 — Zieltyp-Auswahl unklar | Beispiel-Platzhalter in den Feldern ergänzt | 🟡 teilweise |
| P3 — Begriff "Bereich" | Refactoring würde grössere Code-Änderungen verlangen | ❌ offen |
| P5 — Erfolgsmeldung nach Save | Aktuell Redirect ohne Toast | ❌ offen für nächste Iteration |
| P1 — User-Update Feedback | Erfolgsmeldung beim Profil-Speichern ergänzen | ❌ offen für nächste Iteration |

---

## 6. Zusammenfassung

Der Hauptworkflow von TrackFlow funktioniert grundsätzlich sehr gut — beide Testpersonen konnten alle Aufgaben selbständig lösen, ohne dass eine Erklärung notwendig war. Das visuelle Design und die Fortschrittsanzeige wurden durchgehend positiv bewertet.

Die wichtigsten Verbesserungspotenziale liegen in der **klareren Kommunikation der Zieltypen** beim Erstellen eines Bereichs, in **klareren Erfolgsmeldungen** nach dem Speichern und im **Wording** ("Bereich" → "Kategorie"). Mehrere kleinere Findings konnten bereits direkt im Prototyp umgesetzt werden (siehe Tabelle in Kap. 5), die übrigen sind als Backlog für die nächste Iteration dokumentiert.

Die Tests haben sich als wertvoll erwiesen — besonders das szenario-basierte Vorgehen (ohne App-Begriffe) hat einige Wording-Probleme aufgedeckt, die mit App-spezifischer Sprache wahrscheinlich übersehen worden wären.
