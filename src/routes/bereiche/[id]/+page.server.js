import { getDB, ObjectId } from '$lib/server/db.js';
import { berechnefortschritt, zeitraumStart, berechneVerlauf } from '$lib/server/fortschritt.js';
import { error } from '@sveltejs/kit';

export async function load({ params, locals }) {
  const db = await getDB();

  const bereich = await db.collection('bereiche').findOne({
    _id: new ObjectId(params.id),
    userId: new ObjectId(locals.user.id)
  });
  if (!bereich) throw error(404, 'Bereich nicht gefunden.');

  const eintraege = await db.collection('eintraege')
    .find({ bereichId: new ObjectId(params.id) })
    .sort({ datum: -1 }).toArray();

  const start = zeitraumStart(bereich.zielZeitraum || 'woche');
  const fortschritt = await berechnefortschritt(db, bereich, start);
  const verlauf = await berechneVerlauf(db, bereich, 6);

  let wertSumme = 0;
  if (bereich.zielTyp === 'wert') {
    const result = await db.collection('eintraege').aggregate([
      { $match: { bereichId: new ObjectId(params.id) } },
      { $group: { _id: null, total: { $sum: '$wert' } } }
    ]).toArray();
    wertSumme = result[0]?.total || 0;
  }

  const minutenSumme = eintraege.reduce((s, e) => s + (e.dauer || 0), 0);

  return {
    bereich: { ...bereich, _id: bereich._id.toString(), userId: bereich.userId.toString() },
    eintraege: eintraege.map(e => ({
      ...e,
      _id: e._id.toString(),
      bereichId: e.bereichId.toString(),
      userId: e.userId?.toString()
    })),
    fortschritt,
    verlauf,
    stats: {
      wertSumme,
      stundenSumme: Math.round((minutenSumme / 60) * 10) / 10
    }
  };
}
