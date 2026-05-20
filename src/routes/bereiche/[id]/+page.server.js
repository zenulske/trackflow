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

  return {
    bereich: {
      ...bereich,
      _id:    bereich._id.toString(),
      userId: bereich.userId.toString()
    },
    eintraege: eintraege.map(e => ({
      ...e,
      _id:       e._id.toString(),
      bereichId: e.bereichId.toString(),
      userId:    e.userId?.toString()
    }))
  };
}
