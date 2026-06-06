# Projektdokumentation - TrackFlow

## Inhaltsverzeichnis

1. [Ausgangslage](#1-ausgangslage)
2. [Lösungsidee](#2-lösungsidee)
3. [Vorgehen & Artefakte](#3-vorgehen--artefakte)
    1. [Understand & Define](#31-understand--define)
    2. [Sketch](#32-sketch)
    3. [Decide](#33-decide)
    4. [Prototype](#34-prototype)
    5. [Validate](#35-validate)
4. [Erweiterungen](#4-erweiterungen)
5. [Projektorganisation](#5-projektorganisation)
6. [KI-Deklaration](#6-ki-deklaration)
7. [Anhang](#7-anhang)

---

## 1. Ausgangslage

- **Problem:** Viele Studierende und Berufseinsteiger setzen sich persönliche Ziele in verschiedenen Lebensbereichen — Sport, Lernen, Karriere oder Hobbies — verlieren aber schnell den Überblick darüber, wie konsequent sie ihre Vorhaben tatsächlich umsetzen. Bestehende Lösungen sind entweder zu spezifisch (nur Fitness, nur Lernen) oder zu komplex (umfangreiche Habit-Tracker mit steiler Lernkurve). Eine einfache, anpassbare Lösung für persönliches Fortschritts-Tracking fehlt.

- **Ziele:**
  - Übersicht über persönliche Fortschritte in beliebig vielen Lebensbereichen
  - Schnelles Erfassen von Aktivitäten ohne lange Konfiguration
  - Klare visuelle Rückmeldung über erreichte und nicht erreichte Wochen-/Monatsziele
  - Flexible Anpassung an verschiedene Mess-Arten (Anzahl, Zeit, Distanz, Seiten etc.)

- **Primäre Zielgruppe:** Studierende und IT-Berufseinsteiger, die ihren persönlichen Fortschritt strukturiert verfolgen möchten — ohne sich mit überladenen Tools auseinandersetzen zu müssen.

- **Weitere Stakeholder:** Personen, die sich Ziele in mehreren Lebensbereichen gleichzeitig setzen (Sport + Lernen + Hobby), und besonderen Wert auf eine einfache, visuelle Übersicht legen.

---

## 2. Lösungsidee

TrackFlow ist eine Web-Applikation, in der Nutzer beliebige **Bereiche** (z.B. "Sport", "Lernen", "Lesen") anlegen, individuelle **Wochen- oder Monatsziele** definieren und **Einträge** erfassen, die zum Ziel beitragen. Die App zeigt den aktuellen Fortschritt in Echtzeit als Fortschrittsbalken sowie einen Verlauf der letzten Wochen/Monate als Balkendiagramm.

- **Kernfunktionalität:**
  - **Bereich erstellen:** Name, Icon, Farbe, Ziel (Wert + Einheit + Zeitraum), Mess-Typ (Einträge / Zeit / Eigener Wert)
  - **Eintrag erfassen:** Titel, Datum, Dauer/Wert, Notizen — Formular passt sich automatisch dem Mess-Typ des gewählten Bereichs an
  - **Fortschritt visualisieren:** Fortschrittsbalken pro Bereich, Detailseite mit Verlaufs-Chart über 6 Perioden
  - **Verwalten:** Bereiche und Einträge können bearbeitet und gelöscht werden, Profil-Daten und Passwort selbst verwalten

- **Annahmen:**
  - Nutzer setzen sich Ziele lieber für die Woche oder den Monat als für das ganze Jahr
  - Visualisierung des Fortschritts motiviert mehr als reine Zahlenlisten
  - Drei verschiedene Mess-Typen (Anzahl, Zeit, Eigener Wert) decken die meisten Tracking-Bedürfnisse ab

- **Abgrenzung:**
  - Kein Social-Feature (keine geteilten Bereiche, kein Vergleich mit anderen Nutzern)
  - Keine Benachrichtigungen / Push-Erinnerungen
  - Keine Integration in externe Fitness-/Health-Apps (Apple Health, Google Fit etc.)
  - Keine Multi-Device-Synchronisation in nativer App — reine Web-App

---

## 3. Vorgehen & Artefakte

Das Projekt wurde entlang der vorgegebenen fünf Phasen durchgeführt. Die wichtigsten Artefakte sind in dieser Dokumentation und im Repository abgelegt.

### 3.1 Understand & Define

- **Zielgruppenverständnis:** Die primäre Zielgruppe sind Studierende und Berufseinsteiger im IT-Bereich, die in mehreren Lebensbereichen Ziele verfolgen. Charakteristisch ist, dass diese Personengruppe technikaffin ist, aber wenig Zeit für komplexe Tools hat. Die Recherche hat ergeben, dass viele bestehende Tracker entweder thematisch zu eng (z.B. reine Fitness-Apps) oder funktional überladen sind (vollständige Lebens-Planer mit hoher Einstiegshürde).

- **Wesentliche Erkenntnisse:**
  - Nutzer wollen ihre eigenen Bereiche definieren können — vorgegebene Kategorien sind oft nicht passend
  - Die Möglichkeit, verschiedene Mess-Arten (Anzahl Trainings, gelaufene km, gelesene Seiten) zu kombinieren, ist zentral
  - Visueller Fortschritt motiviert stärker als reine Tabellen oder Listen
  - Wochenziele werden als realistischer empfunden als Tages- oder Jahresziele

### 3.2 Sketch

- **Variantenüberblick:** Es wurden drei Lösungsvarianten skizziert:
  - **Variante A — Dashboard mit Karten:** Jeder Bereich als grosse Karte mit Icon, aktuellem Fortschritt und Detailseite per Klick
  - **Variante B — Listen-Ansicht mit Inline-Bearbeitung:** Bereiche als kompakte Liste, Einträge direkt einklappbar in der Liste
  - **Variante C — Kalender-zentriert:** Hauptansicht ist ein Kalender, Einträge werden direkt im Kalender platziert

- **Skizzen:** Die wesentlichen Unterschiede:
  - **A** legt den Fokus auf den aktuellen Status und macht den Vergleich mehrerer Bereiche einfach
  - **B** ist platzsparend, eignet sich aber weniger für visuelle Motivation
  - **C** ist gut für tagesgenaues Tracking, aber zu komplex für unsere Anwendungsfälle

### 3.3 Decide

- **Gewählte Variante & Begründung:** Variante **A (Dashboard mit Karten)** wurde gewählt. Kriterien:
  - Visuelle Übersicht aller Bereiche auf einen Blick — entspricht dem Hauptbedürfnis "Fortschritt sehen"
  - Klare Trennung von Übersicht (Dashboard) und Detail (Bereichsseite)
  - Bestes Verhältnis zwischen Klarheit und Funktionsumfang im Rahmen des Semesterprojekts
  - Skaliert gut: Auch mit 8-10 Bereichen bleibt die Übersicht klar

- **End-to-End-Ablauf:**
  1. **Registrierung / Login** → Dashboard erscheint (leer beim ersten Mal)
  2. **Bereich anlegen** → Name, Icon, Farbe, Ziel (Typ + Wert + Einheit + Zeitraum) festlegen
  3. **Eintrag erfassen** → Bereich wählen, Aktivität benennen, Wert/Dauer eingeben
  4. **Fortschritt sehen** → Dashboard zeigt aktualisierten Fortschrittsbalken; Detailseite zeigt zusätzlich Verlauf der letzten 6 Perioden

- **Mockup:** HTML-Mockup wurde als interaktiver Prototyp in `docs/mockup.html` erstellt und mit den späteren Implementierungs-Entscheidungen abgeglichen.

### 3.4 Prototype

#### 3.4.1. Entwurf (Design)

- **Informationsarchitektur:**
  - **Sidebar (immer sichtbar):** Logo, Dashboard-Link, dynamische Liste der Bereiche, "+ Bereich hinzufügen", primärer "+ Eintrag hinzufügen" Button, User-Avatar/Profil-Link, Abmelden
  - **Hauptbereich:** Wechselt je nach Route — Dashboard, Bereich-Detail, Formulare, Profil

- **User Interface Design:**
  - **Dashboard:** Header mit Titel, Karten-Grid (1-3 Spalten responsiv), letzte Aktivitäten als Liste darunter
  - **Bereich-Detailseite:** Header mit Icon/Name/Ziel + Aktions-Buttons, Fortschrittsbalken, Verlaufs-Chart (6 Perioden), Stats-Karten (Einträge total, diese Woche/Monat, Stunden/Wert total), Liste aller Einträge mit Bearbeiten/Löschen-Buttons
  - **Formulare:** Card-basiert, maximal 520px Breite, klare Pflichtfeld-Markierungen, Live-Vorschau beim Bereich-Erstellen (Icon + Farbe + Name)
  - **Modale Dialoge:** Bestätigungen für Löschen mit klarem Hinweis auf Konsequenzen (z.B. "Alle 5 Einträge werden ebenfalls gelöscht")

- **Designentscheidungen:**
  - **Bootstrap 5.3 via CDN** statt eigenes CSS — pragmatische Entscheidung für ein Schulprojekt mit Zeitdruck
  - **Drei Zieltypen (Einträge / Zeit / Eigener Wert)** — basierend auf Erkenntnissen aus der Define-Phase: ein einziger Mess-Typ deckt nicht alle Anwendungsfälle ab
  - **Modal statt Inline-Bestätigung** beim Löschen — klarer und versehentlich-sicherer
  - **Drei Stat-Karten kontextabhängig** — bei `Eigener Wert`-Bereichen wird "km total" statt "Stunden total" angezeigt
  - **Verlaufs-Chart immer sichtbar** — auch ohne definiertes Ziel, damit Nutzer ihre Aktivität immer sehen können
  - **Aktive Periode hervorgehoben** im Chart — visueller Anker

#### 3.4.2. Umsetzung (Technik)

- **Technologie-Stack:**
  - **Frontend:** SvelteKit mit Svelte 5 (Runes Mode — `$state`, `$derived`, `$effect`, `$props`)
  - **UI:** Bootstrap 5.3 + Bootstrap Icons via CDN
  - **Backend:** SvelteKit Server-Routes (`+page.server.js`, `+server.js`)
  - **Datenbank:** MongoDB Atlas mit dem `mongodb` npm-Package
  - **Auth:** Eigene Session-basierte Auth mit `bcryptjs`, Sessions in MongoDB, Session-Cookie
  - **Deployment:** Netlify mit `@sveltejs/adapter-netlify`
  - **Build-Tool:** Vite ^8.0.0

- **Tooling:**
  - **IDE:** Visual Studio Code mit Svelte- und MongoDB-Erweiterungen
  - **Versionsverwaltung:** Git + GitHub
  - **Lokale Tools:** Node.js, npm, MongoDB Compass für DB-Inspektion
  - **Cloud-Tools:** MongoDB Atlas (Datenbank), Netlify (Hosting + Deployment), GitHub (Repo)
  - Der Einsatz von KI ist im Kapitel **KI-Deklaration** detailliert beschrieben

- **Struktur & Komponenten:**

```
src/
├── app.html                       # Bootstrap CDN
├── hooks.server.js                # Auth-Middleware
├── lib/
│   ├── server/
│   │   ├── db.js                  # MongoDB Connection
│   │   └── fortschritt.js         # Fortschritts- & Verlaufs-Berechnung
│   └── components/
│       ├── Sidebar.svelte         # Navigation mit Bereichen
│       └── BereichKarte.svelte    # Karte für Dashboard
└── routes/
    ├── +layout.server.js          # User + Bereiche laden
    ├── +layout.svelte             # Sidebar conditional
    ├── login/                     # Login-Seite
    ├── register/                  # Registrierung
    ├── logout/                    # Logout-Action
    ├── dashboard/                 # Übersichts-Seite
    ├── profil/                    # Profil bearbeiten
    ├── bereiche/
    │   ├── neu/                   # Bereich erstellen
    │   └── [id]/
    │       ├── +page.svelte       # Detailseite
    │       └── bearbeiten/        # Bereich bearbeiten
    ├── eintrag/
    │   ├── neu/                   # Eintrag erfassen
    │   └── [id]/bearbeiten/       # Eintrag bearbeiten
    └── api/
        ├── bereiche/              # POST, DELETE Bereiche
        └── eintraege/             # DELETE Einträge
```

- **Daten & Schnittstellen:**

  **MongoDB-Collections:**
  - `users`: `{ _id, name, email, passwortHash }`
  - `sessions`: `{ sessionId, userId, name, email, erstellt }`
  - `bereiche`: `{ _id, userId, name, icon, farbe, farbeHell, zielAnzahl, zielZeitraum, zielTyp, zielEinheit, erstellt }`
  - `eintraege`: `{ _id, userId, bereichId, titel, datum, dauer, wert, notizen, erstellt }`

  Alle Bereiche und Einträge werden strikt nach `userId` gefiltert — saubere Multi-User-Trennung. ObjectId-Felder werden vor der Übergabe ans Frontend mit `.toString()` umgewandelt, um Serialisierungsfehler zu vermeiden.

- **Deployment:** [(https://flourishing-strudel-74d68c.netlify.app/login)]

- **Besondere Entscheidungen:**
  - **Svelte 5 Runes Mode:** Komplette Umstellung auf neue Reaktivitäts-Primitives. Beim Submit von Formularen mit hidden inputs gab es initial Probleme — gelöst durch expliziten `formData.set()` Aufruf im `use:enhance`-Callback
  - **`berechnefortschritt()` als zentrale Helper-Funktion:** Behandelt alle drei Zieltypen einheitlich (countDocuments für Einträge, $sum für Dauer/Wert), wird sowohl für aktuelle Periode als auch für Verlaufs-Chart verwendet
  - **Bootstrap via CDN** statt npm-Install: vermeidet zusätzliche Build-Schritte und Tailwind/Bootstrap-Konflikte
  - **Eigener Wert-Feld erscheint nur bei zielTyp === 'wert':** Die Form passt sich dynamisch dem gewählten Bereich an

### 3.5 Validate

- **URL der getesteten Version:** [(https://flourishing-strudel-74d68c.netlify.app/login)]

- **Ziele der Prüfung:**
  - Verstehen Nutzer ohne Erklärung den Hauptworkflow?
  - Sind die Begriffe ("Bereich", "Eintrag", "Ziel") verständlich?
  - Wird der Unterschied zwischen den drei Zieltypen klar?
  - Ist die Fortschrittsanzeige aussagekräftig?

- **Vorgehen:** Moderierter on-site Test mit zwei Mitstudierenden. Thinking-Aloud-Methode: Testperson liest die Aufgabe und denkt während der Bedienung laut. Tester beobachtet still und protokolliert mit FeedbackGrid (Plus/Delta/Ideen/Fragen).

- **Stichprobe:** 2 Mitstudierende des IT-Studiengangs — **Emmanuel Walter** und **Andi Kadolli**. Beide technikaffin, aber TrackFlow noch nicht bekannt.

- **Aufgaben/Szenarien:** Fünf szenario-basierte Aufgaben in neutraler Sprache (ohne App-Begriffe):
  1. **Registrierung:** *"Du hast von einer App gehört, mit der du deinen persönlichen Fortschritt verfolgen kannst. Du öffnest die App zum ersten Mal und möchtest sie ausprobieren."*
  2. **Bereich erstellen:** *"Du hast dir vorgenommen, diesen Monat regelmässiger Sport zu treiben. Du möchtest deinen Fortschritt irgendwo festhalten, damit du weisst, wie gut du dein Vorhaben umsetzt."*
  3. **Eintrag erfassen:** *"Du warst heute Morgen 45 Minuten laufen. Du möchtest das festhalten, damit es in deiner Übersicht berücksichtigt wird."*
  4. **Fortschritt prüfen:** *"Du fragst dich, wie gut du diese Woche dein Sportziel erfüllt hast. Du möchtest dir einen Überblick verschaffen."*
  5. **Zweiten Bereich hinzufügen:** *"Neben dem Sport möchtest du auch deine Lernzeit für die Uni verfolgen. Du hast dir vorgenommen, mindestens 8 Stunden pro Woche zu lernen und willst das ebenfalls in der App abbilden."*

- **Kennzahlen & Beobachtungen:**

  | Metrik | Wert |
  |---|---|
  | Aufgaben gesamt | 5 |
  | Erfolgsquote | **10/10 erfolgreich** (5 × 2 Testpersonen) |
  | Durchschnittliche Bearbeitungszeit pro Aufgabe | ~1.5 Minuten |
  | Durchschnittliche Schwierigkeit (1-5) | **1.8 / 5** |
  | Abbrüche | 0 |

  **Positive Findings (von beiden Testpersonen genannt):**
  - Saubere, aufgeräumte UI — wirkt fokussiert, nicht überladen
  - Klare Übersicht im Dashboard
  - Einfache Navigation zwischen Übersicht und Detail
  - Fortschrittsbalken mit Prozentanzeige — sofort verständlich, motivierender Gamification-Touch
  - Drei flexible Mess-Arten (Anzahl / Zeit / Eigener Wert)
  - Modal-Warnung beim Löschen mit Anzahl betroffener Einträge

  **Identifizierte Probleme (priorisiert):**

  🔴 **Hoch:**
  - **P1 (Emmanuel):** Profil-Update funktioniert nicht klar — keine Erfolgsmeldung beim Speichern
  - **P2 (Emmanuel):** Es können mehr Einträge erfasst werden als das definierte Ziel — unklar ob das gewünscht ist

  🟡 **Mittel:**
  - **P3 (Andi):** Begriff "Bereich" wirkt technisch — "Kategorie" oder "Thema" wäre intuitiver
  - **P4 (Andi):** Unterschied zwischen Zieltypen "Einträge" und "Zeit" beim ersten Mal nicht klar; "Eigener Wert" verwirrend
  - **P5 (Andi):** Erfolgsmeldung nach Speichern eines Eintrags fehlt (z.B. Toast)
  - **P6 (Emmanuel):** Lösch-Button bei Bereichen/Einträgen nicht klar beschriftet

  🟢 **Niedrig:**
  - **P7 (Emmanuel):** Bei vielen Bereichen wirkt das Dashboard schnell überladen — Filter/Gruppierung gewünscht
  - **P8 (Andi):** "+ Eintrag erfassen" Button auf der Bereich-Detailseite zuerst gesucht, erst spät in der Sidebar entdeckt
  - **P9 (Andi):** Pflichtfelder bei "Eigener Wert" könnten klarer markiert sein

- **Zusammenfassung der Resultate:** Der Hauptworkflow von TrackFlow funktioniert grundsätzlich sehr gut — beide Testpersonen konnten alle Aufgaben selbständig lösen, ohne dass eine Erklärung notwendig war. Das visuelle Design und die Fortschrittsanzeige wurden durchgehend positiv bewertet. Die wichtigsten Verbesserungspotenziale liegen in klareren Beschriftungen, besseren Erfolgsmeldungen nach dem Speichern und einer klareren Kommunikation der Zieltypen.

- **Abgeleitete Verbesserungen (priorisiert) — was wurde direkt im Prototyp umgesetzt?**

  | Problem | Massnahme | Status |
  |---------|-----------|:------:|
  | P6 — Lösch-Button unklar | Beschriftung "Löschen" hinzugefügt | ✅ |
  | P8 — Schnellzugriff fehlt | "+ Eintrag" auf Bereich-Detailseite ergänzt | ✅ |
  | P9 — Pflichtfelder unklar | Sternchen + Validierungsmeldungen (Plan A Validierung) | ✅ |
  | P4 — Zieltyp-Auswahl unklar | Beispiel-Platzhalter und Live-Vorschau im Formular | 🟡 teilweise |
  | P5 — Erfolgsmeldung nach Save | Aktuell Redirect ohne Toast | ❌ offen |
  | P1 — User-Update Feedback | Erfolgsmeldung beim Profil-Speichern | ❌ offen |
  | P3 — Begriff "Bereich" | Refactoring würde grössere Code-Änderungen verlangen | ❌ offen |
  | P7 — Dashboard-Filter | Sortier/Filter-Funktion im Dashboard | ❌ offen |
  | P2 — Überfüllung von Zielen | Klare Visualisierung bei >100% Zielerfüllung | ❌ offen |

  Die als ✅ markierten Verbesserungen wurden direkt aus den Tests abgeleitet und sind in Kap. 4 als Erweiterungen 4.7, 4.8 und 4.9 dokumentiert. Die offenen Punkte sind als Backlog für eine nächste Iteration festgehalten.

  Detaillierte Auswertung beider Tests siehe `docs/usability-feedback.md`.

---

## 4. Erweiterungen

Folgende Erweiterungen wurden über den Mindestumfang hinaus implementiert.

### 4.1 Drei verschiedene Zieltypen (Einträge / Zeit / Eigener Wert)

- **Beschreibung & Nutzen:** Statt nur Einträge zu zählen, kann der Nutzer beim Erstellen eines Bereichs zwischen drei Mess-Typen wählen — *Einträge* (z.B. 5 Trainings/Woche), *Zeit* (z.B. 120 Min/Woche, optional in Stunden), oder *Eigener Wert* (z.B. 30 km/Woche, 200 Seiten/Monat). Die Form passt sich dynamisch an, beim Erfassen eines Eintrags erscheint je nach Typ ein anderes Eingabefeld.
- **Wo umgesetzt:**
  - **Frontend:** Buttons in `src/routes/bereiche/neu/+page.svelte` und dynamische Felder in `src/routes/eintrag/neu/+page.svelte`
  - **Backend:** Zieltyp wird in `src/routes/api/bereiche/+server.js` gespeichert
  - **Datenbank:** Neue Felder `zielTyp`, `zielEinheit`, `wert` (auf Eintrag) im MongoDB-Schema
  - **Helper:** Berechnung in `src/lib/server/fortschritt.js` — entweder `countDocuments`, `$sum: '$dauer'` oder `$sum: '$wert'` je nach Typ
- **Referenz:** Beschreibung der Mess-Arten in Kap. 2 und 3.4.1
- **Aus Evaluation abgeleitet?:** Nein — aus eigener Recherche heraus implementiert, um die Flexibilität deutlich zu erhöhen

### 4.2 Verlaufs-Chart über 6 Perioden

- **Beschreibung & Nutzen:** Auf der Bereich-Detailseite wird der Fortschritt der letzten sechs Wochen (oder Monate, je nach Zeitraum) als Balken-Diagramm dargestellt. Der Nutzer sieht sofort, ob er sein Ziel über die Zeit erreicht hat oder nicht. Die Ziel-Linie wird als gestrichelte Linie quer durch das Diagramm gezogen. Aktuelle Periode wird visuell hervorgehoben.
- **Wo umgesetzt:**
  - **Frontend:** CSS-basiertes Balken-Diagramm in `src/routes/bereiche/[id]/+page.svelte` (Styles im `<style>`-Block)
  - **Backend:** `berechneVerlauf()` in `src/lib/server/fortschritt.js` berechnet die Werte pro Periode
- **Referenz:** Screenshot der Detailseite im Anhang
- **Aus Evaluation abgeleitet?:** Nein

### 4.3 Eintrag bearbeiten

- **Beschreibung & Nutzen:** Bereits erfasste Einträge können nachträglich bearbeitet werden (Titel, Datum, Dauer, Wert, Notizen). Der zugehörige Bereich kann beim Bearbeiten nicht geändert werden — Einträge gehören fest zu ihrem Bereich.
- **Wo umgesetzt:**
  - **Frontend:** Neue Route `src/routes/eintrag/[id]/bearbeiten/+page.svelte` mit dynamischer Form
  - **Backend:** Form-Action in `src/routes/eintrag/[id]/bearbeiten/+page.server.js` mit Ownership-Check
- **Referenz:** "Bearbeiten"-Button neben jedem Eintrag auf der Bereich-Detailseite
- **Aus Evaluation abgeleitet?:** Nein

### 4.4 Eintrag löschen mit Bestätigungs-Modal

- **Beschreibung & Nutzen:** Einzelne Einträge können gelöscht werden. Ein zentrales Modal mit klarer Beschreibung verhindert versehentliches Löschen. Schliessen via ESC oder Klick auf den Hintergrund.
- **Wo umgesetzt:**
  - **Frontend:** Modal mit Animation in `src/routes/bereiche/[id]/+page.svelte`
  - **Backend:** DELETE-Endpoint in `src/routes/api/eintraege/[id]/+server.js` mit Ownership-Check
- **Referenz:** Lösch-Button neben jedem Eintrag
- **Aus Evaluation abgeleitet?:** Nein

### 4.5 Bereich bearbeiten

- **Beschreibung & Nutzen:** Alle Bereich-Eigenschaften (Name, Icon, Farbe, Zieltyp, Zielwert, Einheit, Zeitraum) können nachträglich geändert werden. So kann der Nutzer sein Ziel anpassen, ohne den Bereich neu erstellen zu müssen.
- **Wo umgesetzt:**
  - **Frontend:** Neue Route `src/routes/bereiche/[id]/bearbeiten/+page.svelte`
  - **Backend:** Form-Action mit `use:enhance`-Callback (Svelte 5 Workaround für hidden inputs)
- **Referenz:** "Bearbeiten"-Button im Header der Bereich-Detailseite
- **Aus Evaluation abgeleitet?:** Nein

### 4.6 Profil-Verwaltung mit automatischem Logout bei Passwort-Wechsel

- **Beschreibung & Nutzen:** Nutzer können ihren Namen, ihre E-Mail und ihr Passwort selbst ändern. Bei einem Passwort-Wechsel werden alle Sessions des Users gelöscht und er wird automatisch zurück zum Login geleitet — eine Sicherheitsmassnahme falls jemand anderes Zugriff auf ein Gerät hatte.
- **Wo umgesetzt:**
  - **Frontend:** `src/routes/profil/+page.svelte` mit zwei separaten Formularen
  - **Backend:** `src/routes/profil/+page.server.js` mit zwei Actions (`updateProfil`, `updatePasswort`)
  - **Datenbank:** `deleteMany({ userId })` auf sessions-Collection beim Passwort-Wechsel
- **Referenz:** Avatar-Link in der Sidebar führt zum Profil
- **Aus Evaluation abgeleitet?:** Nein

### 4.7 Lösch-Button mit klarer Beschriftung

- **Beschreibung & Nutzen:** Ursprünglich waren die Lösch-Aktionen nur als Icon dargestellt — Testperson Emmanuel Walter bemängelte dies. Lösch-Buttons sind nun durchgehend mit dem Text "Löschen" beschriftet und farblich rot markiert. Das macht die Aktion sofort erkennbar und reduziert versehentliches Klicken.
- **Wo umgesetzt:**
  - **Frontend:** Buttons auf der Bereich-Detailseite (für Bereich und einzelne Einträge)
- **Referenz:** Kap. 3.5 — Issue P6
- **Aus Evaluation abgeleitet?:** **Ja**, direkt aus Issue P6 (Emmanuel Walter)

### 4.8 "+ Eintrag" Schnellzugriff auf Bereich-Detailseite

- **Beschreibung & Nutzen:** Testperson Andi Kadolli suchte nach einem "+ Eintrag erfassen" Button direkt auf der Bereich-Detailseite, bevor sie den globalen in der Sidebar entdeckte. Auf der Detailseite gibt es jetzt zwei prominent platzierte Buttons im Header und einen weiteren über der Einträge-Liste, die direkt zum Eintrag-Formular führen.
- **Wo umgesetzt:**
  - **Frontend:** Header und Einträge-Liste auf der Bereich-Detailseite (`src/routes/bereiche/[id]/+page.svelte`)
- **Referenz:** Kap. 3.5 — Issue P8
- **Aus Evaluation abgeleitet?:** **Ja**, direkt aus Issue P8 (Andi Kadolli)

### 4.9 Pflichtfeld-Markierung und Validierung (Plan A)

- **Beschreibung & Nutzen:** Testperson Andi Kadolli bemängelte, dass nicht klar ist welche Felder beim Erstellen eines Bereichs Pflicht sind. Pflichtfelder werden jetzt mit rotem `*` markiert und das Formular validiert vor dem Submit. Wenn ein Zieltyp "Zeit" oder "Eigener Wert" gewählt wird, sind Zielwert (und bei "Eigener Wert" auch die Einheit) Pflicht. Andernfalls erscheint eine klare Fehlermeldung statt eines fehlerhaften Datensatzes in der DB.
- **Wo umgesetzt:**
  - **Frontend:** Validierungs-Logik in `bereiche/neu/+page.svelte` und `bereiche/[id]/bearbeiten/+page.svelte`
  - **Backend:** Zusätzliche Validierung auch in `+page.server.js` der Bearbeiten-Action
- **Referenz:** Kap. 3.5 — Issue P9
- **Aus Evaluation abgeleitet?:** **Ja**, direkt aus Issue P9 (Andi Kadolli)

---

## 5. Projektorganisation

- **Repository & Struktur:** [(https://github.com/zenulske/trackflow)]. Klare Trennung in `src/routes` (Seiten), `src/lib/components` (UI-Komponenten), `src/lib/server` (Server-Logik). Die `docs/` enthält Mockup, Workflow-Diagramme und Usability-Test-Dokumente.

- **Issue-Management:** Da das Projekt in Einzelarbeit umgesetzt wurde, wurde auf ein formales Issue-Board verzichtet. Stattdessen wurde eine priorisierte Feature-Liste geführt und nach jedem Schritt der Status festgehalten.

- **Commit-Praxis:** Sprechende Commit-Nachrichten auf Deutsch im Imperativ ("Eintrag löschen mit Bestätigungs-Modal hinzufügen", "Reaktivität in Eintrag-Form fixen"). Pro Feature ein oder mehrere fokussierte Commits, keine "Mega-Commits" mit vermischten Änderungen.

---

## 6. KI-Deklaration

### 6.1 KI-Tools

- **Eingesetzte Tools:** Anthropic Claude (verschiedene Modelle, hauptsächlich über die Web-Oberfläche) wurde während des gesamten Projekts intensiv eingesetzt. Zusätzlich wurde GitHub Copilot bei Bedarf für lokale Code-Vervollständigung verwendet.

- **Zweck & Umfang:**
  - **Code-Generierung:** Erste Implementierungen vieler Komponenten (SvelteKit-Routes, Server-Actions, MongoDB-Queries) wurden mit Claude entworfen. Die ZIP-basierte Datei-Ausgabe wurde genutzt, um zusammenhängende Features in einem Schritt zu erhalten.
  - **Fehlerbehebung:** Bei Build-Fehlern, Runtime-Errors und unerwartetem Verhalten wurde Claude beigezogen, um den Fehler zu analysieren und zu fixen. Besonders bei Svelte 5 Runes Mode (`$state`, `$derived`, `$effect`) gab es mehrere Lernschritte.
  - **Architektur-Beratung:** Entscheidungen über Datenmodell, Routen-Struktur und Komponenten-Aufteilung wurden mit Claude diskutiert.
  - **Dokumentations-Vorlagen:** Erste Entwürfe für Designentscheide, Workflow-Diagramme, Testdokumente (Aufgabenblatt, FeedbackGrid, Nachbefragung) und diese Projektdokumentation wurden mit Claude vorbereitet.
  - **UI-Design:** Bootstrap-basierte Layouts, Farb- und Icon-Auswahl, Modal-Komponenten.

- **Eigene Leistung (Abgrenzung):**
  - **Projektidee, Zielgruppen-Definition und Anforderungen** wurden vollständig eigenständig erarbeitet
  - **Alle inhaltlichen Entscheidungen** (drei Zieltypen, Wochen-/Monatsziele, Mess-Modus etc.) wurden von mir getroffen
  - **Bug-Diagnose im Browser** (was funktioniert nicht, wie reproduziere ich es) erfolgte selbstständig — Claude wurde dann mit klaren Beschreibungen/Screenshots gefüttert
  - **Integration der KI-generierten Code-Schnipsel** ins lokale Projekt, Anpassungen, Testen
  - **MongoDB-Setup** auf Atlas, Netlify-Deployment, GitHub-Repository
  - **Durchführung der Usability-Tests** mit echten Testpersonen (Emmanuel Walter, Andi Kadolli), Auswertung
  - **Finale Code-Reviews und Refactorings**
  - **Diese Projektdokumentation** — der erste Entwurf wurde mit Claude erstellt, aber inhaltlich vollständig überarbeitet und an die tatsächliche Umsetzung angepasst

### 6.2 Prompt-Vorgehen

Beim Prompting wurde versucht, Claude immer **maximalen Kontext** zu geben — Stack, aktuelle Datei-Struktur, vorherige Entscheidungen, konkrete Fehler-Outputs. Anfangs wurde versucht mit kurzen Prompts zu arbeiten, was zu vielen Iterationen führte. Im Verlauf des Projekts wurde das Prompting strukturierter:

- **Aufgaben-Prompts:** Immer mit dem konkreten Ziel, den betroffenen Files und den Constraints (z.B. "Verwende Bootstrap, deutsche Variablennamen, Svelte 5 Runes")
- **Fehler-Prompts:** Komplette Fehler-Ausgabe inkl. Stacktrace, ggf. Screenshot des Browsers, betroffene Datei-Inhalte
- **Vergleichs-Prompts:** Bei Architektur-Entscheidungen wurde Claude gebeten, zwei Varianten zu vergleichen mit Pro/Contra

Bei längeren Sessions wurde regelmässig ein **Kontext-Prompt** erstellt — eine strukturierte Zusammenfassung des aktuellen Standes, der für eine Fortsetzung in einer neuen Chat-Session genutzt werden konnte.

**Beispiel-Prompt** (vereinfacht):
> "Ich nutze SvelteKit mit Svelte 5 Runes Mode + MongoDB Atlas + Bootstrap. Implementiere bitte das Feature: Eintrag bearbeiten. Constraints: Der Bereich darf nicht geändert werden, alle State-Variablen mit `$state()`, deutsche Variablennamen. Hier die aktuelle Struktur von bereiche/[id]/+page.svelte: ..."

**Urheberrecht:** Es wurde darauf geachtet, keine fremden Inhalte (Icons, Texte, Code-Snippets aus dem Web) ohne Lizenz zu übernehmen. Die genutzten Emojis sind Unicode-Standard, Bootstrap und Bootstrap Icons stehen unter der MIT-Lizenz.

### 6.3 Reflexion

**Nutzen:** Claude hat das Tempo des Projekts deutlich beschleunigt — insbesondere bei wiederkehrenden Mustern wie Form-Handling, MongoDB-Queries oder UI-Komponenten. Bei Designentscheidungen und beim Strukturieren von Dokumenten konnte ich auf solide Grundgerüste aufsetzen.

**Grenzen:** Claude hat im Verlauf des Projekts mehrfach Code generiert, der **nicht** funktioniert hat — besonders bei Svelte 5 Runes Mode. Die hidden-input-Reaktivität in Formularen war ein wiederkehrendes Problem, das mehrere Iterationen brauchte. Hier musste ich selbst debuggen, in der Browser-Console nachschauen und Claude mit klaren Fehler-Outputs füttern, bis das Problem endgültig gelöst war.

**Risiken / Qualitätssicherung:**
- **Code blind übernehmen:** Anfangs habe ich KI-generierten Code manchmal direkt eingebaut, ohne ihn vollständig zu verstehen. Das hat sich bei Bugs gerächt. Im späteren Verlauf habe ich jeden Code-Schnipsel kurz mental durchgegangen.
- **Halluzinationen:** Claude hat manchmal Bibliotheks-APIs oder Svelte-Features beschrieben, die so nicht existieren. Bei jeder ungewohnten Funktion wurde in der offiziellen Dokumentation gegengeprüft.
- **Konsistenz:** Da Claude keine Session-Persistenz zwischen verschiedenen Chats hat, musste der Kontext regelmässig neu aufgebaut werden — was zu kleinen Inkonsistenzen im Code führen konnte. Diese wurden bei der Code-Review behoben.

Insgesamt war Claude ein wertvoller Werkzeug-Partner, ersetzt aber nicht das eigene Verständnis der Architektur und der Problemstellung. Das Endprodukt ist das Resultat eines Dialogs zwischen meinen Anforderungen und KI-generierten Vorschlägen, mit klarer eigener Verantwortung für alle finalen Entscheidungen.

---

## 7. Anhang

- **Quellen:**
  - Bootstrap 5.3 (MIT License) — https://getbootstrap.com
  - Bootstrap Icons (MIT License) — https://icons.getbootstrap.com
  - SvelteKit (MIT License) — https://kit.svelte.dev
  - MongoDB Node.js Driver (Apache 2.0) — https://www.mongodb.com/docs/drivers/node
  - bcryptjs (MIT License) — https://www.npmjs.com/package/bcryptjs

- **Testskript & Materialien:**
  - `docs/usability-test-aufgaben.html` — Aufgabenblatt für Testpersonen
  - `docs/feedbackgrid.html` — FeedbackGrid (2 Stück, druckfertig)

- **Testergebnisse:**
  - `docs/emmanuel-walter-feedback.md` — Bewertung von Emmanuel Walter
  - `docs/andi-kadolli-feedback.md` — Bewertung von Andi Kadolli
  - `docs/usability-feedback.md` — Konsolidierte Auswertung beider Tests
