import { getDB, ObjectId } from '$lib/server/db.js';

export async function load({ locals }) {
  const db = await getDB();

  const bereiche = await db.collection('bereiche')
    .find({ userId: new ObjectId(locals.user.id) })
    .toArray();

  const eintraege = await db.collection('eintraege')
    .find({ userId: new ObjectId(locals.user.id) })
    .sort({ datum: -1 }).limit(10).toArray();

  // Zeitraum-Grenzen berechnen
  const jetzt = new Date();

  const wochenstart = new Date(jetzt);
  const tag = wochenstart.getDay();
  const diffMontag = (tag === 0 ? -6 : 1 - tag); // Montag als Wochenstart
  wochenstart.setDate(wochenstart.getDate() + diffMontag);
  wochenstart.setHours(0, 0, 0, 0);

  const monatsstart = new Date(jetzt.getFullYear(), jetzt.getMonth(), 1);

  // Fortschritt pro Bereich berechnen
  const fortschritt = {};
  for (const b of bereiche) {
    if (!b.zielAnzahl) {
      fortschritt[b._id.toString()] = { aktuell: 0, prozent: 0 };
      continue;
    }

    const start = b.zielZeitraum === 'monat' ? monatsstart : wochenstart;
    const aktuell = await db.collection('eintraege').countDocuments({
      bereichId: b._id,
      datum: { $gte: start }
    });

    fortschritt[b._id.toString()] = {
      aktuell,
      prozent: Math.min(Math.round(aktuell / b.zielAnzahl * 100), 100)
    };
  }

  return {
    bereiche: bereiche.map(b => ({
      ...b,
      _id:    b._id.toString(),
      userId: b.userId.toString()
    })),
    eintraege: eintraege.map(e => ({
      ...e,
      _id:       e._id.toString(),
      bereichId: e.bereichId?.toString(),
      userId:    e.userId?.toString()
    })),
    fortschritt
  };
}
