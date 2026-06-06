// Berechnet aktuellen Fortschritt für eine Periode
export async function berechnefortschritt(db, bereich, start, ende = null) {
  if (!bereich.zielAnzahl) return { aktuell: 0, prozent: 0 };

  // Datumsfilter: zwischen start und ende (oder unbegrenzt)
  const filter = {
    bereichId: bereich._id,
    datum: ende ? { $gte: start, $lt: ende } : { $gte: start }
  };

  let aktuell = 0;

  if (bereich.zielTyp === 'minuten') {
    const result = await db.collection('eintraege').aggregate([
      { $match: filter },
      { $group: { _id: null, total: { $sum: '$dauer' } } }
    ]).toArray();
    aktuell = result[0]?.total || 0;
    // Wenn Einheit "Std." → Minuten in Stunden umrechnen für Vergleich
    if (bereich.zielEinheit === 'Std.') aktuell = Math.round((aktuell / 60) * 10) / 10;
  } else if (bereich.zielTyp === 'wert') {
    const result = await db.collection('eintraege').aggregate([
      { $match: filter },
      { $group: { _id: null, total: { $sum: '$wert' } } }
    ]).toArray();
    aktuell = result[0]?.total || 0;
  } else {
    aktuell = await db.collection('eintraege').countDocuments(filter);
  }

  const prozent = Math.min(Math.round(aktuell / bereich.zielAnzahl * 100), 100);
  return { aktuell, prozent };
}

// Start der aktuellen Periode
export function zeitraumStart(zeitraum, datum = new Date()) {
  const d = new Date(datum);
  if (zeitraum === 'monat') {
    return new Date(d.getFullYear(), d.getMonth(), 1);
  }
  const start = new Date(d);
  const tag = start.getDay();
  start.setDate(start.getDate() + (tag === 0 ? -6 : 1 - tag));
  start.setHours(0, 0, 0, 0);
  return start;
}

// Ende einer Periode = Start der nächsten Periode
export function zeitraumEnde(start, zeitraum) {
  const ende = new Date(start);
  if (zeitraum === 'monat') {
    ende.setMonth(ende.getMonth() + 1);
  } else {
    ende.setDate(ende.getDate() + 7);
  }
  return ende;
}

// Verlauf der letzten N Perioden berechnen
export async function berechneVerlauf(db, bereich, anzahlPerioden = 6) {
  const verlauf = [];
  const heuteStart = zeitraumStart(bereich.zielZeitraum);

  for (let i = anzahlPerioden - 1; i >= 0; i--) {
    const start = new Date(heuteStart);
    if (bereich.zielZeitraum === 'monat') {
      start.setMonth(start.getMonth() - i);
    } else {
      start.setDate(start.getDate() - (i * 7));
    }
    const ende = zeitraumEnde(start, bereich.zielZeitraum);
    const fortschritt = await berechnefortschritt(db, bereich, start, ende);

    verlauf.push({
      start:    start.toISOString(),
      label:    bereich.zielZeitraum === 'monat'
                  ? start.toLocaleDateString('de-CH', { month: 'short' })
                  : start.toLocaleDateString('de-CH', { day: 'numeric', month: 'numeric' }),
      aktuell:  fortschritt.aktuell,
      prozent:  fortschritt.prozent,
      erreicht: fortschritt.prozent >= 100,
      istAktuell: i === 0
    });
  }

  return verlauf;
}
