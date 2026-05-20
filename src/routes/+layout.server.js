import { getDB, ObjectId } from '$lib/server/db.js';

export async function load({ locals }) {
  if (!locals.user) {
    return { user: null, bereiche: [] };
  }

  const db = await getDB();
  const bereiche = await db.collection('bereiche')
    .find({ userId: new ObjectId(locals.user.id) })
    .toArray();

  return {
    user: locals.user,
    bereiche: bereiche.map(b => ({
      ...b,
      _id:    b._id.toString(),
      userId: b.userId.toString()
    }))
  };
}
