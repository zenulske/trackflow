import { getDB, ObjectId } from '$lib/server/db.js';

export async function load({ locals }) {
  const db = await getDB();

  const bereiche = await db.collection('bereiche')
    .find({ userId: new ObjectId(locals.user.id) })
    .toArray();

  const eintraege = await db.collection('eintraege')
    .find({ userId: new ObjectId(locals.user.id) })
    .sort({ datum: -1 }).limit(10).toArray();

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
    }))
  };
}
