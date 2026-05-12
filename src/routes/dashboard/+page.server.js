import { getDB } from '$lib/server/db.js';

export async function load() {
  const db = await getDB();
  const bereiche = await db.collection('bereiche').find().toArray();
  const eintraege = await db.collection('eintraege')
    .find().sort({ datum: -1 }).limit(10).toArray();

  return {
    bereiche: bereiche.map(b => ({ ...b, _id: b._id.toString() })),
    eintraege: eintraege.map(e => ({ ...e, _id: e._id.toString(), bereichId: e.bereichId?.toString() }))
  };
}
