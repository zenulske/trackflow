import { getDB, ObjectId } from '$lib/server/db.js';
import { error } from '@sveltejs/kit';

export async function load({ params, locals }) {
  const db = await getDB();

  const bereich = await db.collection('bereiche').findOne({
    _id:    new ObjectId(params.id),
    userId: new ObjectId(locals.user.id)
  });
  if (!bereich) throw error(404, 'Bereich nicht gefunden.');

  const eintraege = await db.collection('eintraege')
    .find({ bereichId: new ObjectId(params.id) })
    .sort({ datum: -1 }).toArray();

  // Fortschritt für aktuellen Zeitraum berechnen
  let aktuell = 0, prozent = 0;
  if (bereich.zielAnzahl) {
    const jetzt = new Date();
    let start;
    if (bereich.zielZeitraum === 'monat') {
      start = new Date(jetzt.getFullYear(), jetzt.getMonth(), 1);
    } else {
      start = new Date(jetzt);
      const tag = start.getDay();
      start.setDate(start.getDate() + (tag === 0 ? -6 : 1 - tag));
      start.setHours(0, 0, 0, 0);
    }
    aktuell = await db.collection('eintraege').countDocuments({
      bereichId: new ObjectId(params.id),
      datum: { $gte: start }
    });
    prozent = Math.min(Math.round(aktuell / bereich.zielAnzahl * 100), 100);
  }

  return {
    bereich: { ...bereich, _id: bereich._id.toString(), userId: bereich.userId.toString() },
    eintraege: eintraege.map(e => ({
      ...e,
      _id:       e._id.toString(),
      bereichId: e.bereichId.toString(),
      userId:    e.userId?.toString()
    })),
    fortschritt: { aktuell, prozent }
  };
}
