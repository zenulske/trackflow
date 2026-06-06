export async function berechnefortschritt(db, bereich, start) {
  if (!bereich.zielAnzahl) return { aktuell: 0, prozent: 0 };

  let aktuell = 0;

  if (bereich.zielTyp === 'minuten') {
    // Minuten aus dauer-Feld summieren
    const result = await db.collection('eintraege').aggregate([
      { $match: { bereichId: bereich._id, datum: { $gte: start } } },
      { $group: { _id: null, total: { $sum: '$dauer' } } }
    ]).toArray();
    aktuell = result[0]?.total || 0;

  } else if (bereich.zielTyp === 'wert') {
    // Eigenen Wert (km, Seiten usw.) aus wert-Feld summieren
    const result = await db.collection('eintraege').aggregate([
      { $match: { bereichId: bereich._id, datum: { $gte: start } } },
      { $group: { _id: null, total: { $sum: '$wert' } } }
    ]).toArray();
    aktuell = result[0]?.total || 0;

  } else {
    // Einträge zählen (Standard)
    aktuell = await db.collection('eintraege').countDocuments({
      bereichId: bereich._id,
      datum: { $gte: start }
    });
  }

  const prozent = Math.min(Math.round(aktuell / bereich.zielAnzahl * 100), 100);
  return { aktuell, prozent };
}

export function zeitraumStart(zeitraum) {
  const jetzt = new Date();
  if (zeitraum === 'monat') {
    return new Date(jetzt.getFullYear(), jetzt.getMonth(), 1);
  }
  const start = new Date(jetzt);
  const tag = start.getDay();
  start.setDate(start.getDate() + (tag === 0 ? -6 : 1 - tag));
  start.setHours(0, 0, 0, 0);
  return start;
}
