import { getDB } from '$lib/server/db.js';

export async function load() {
  const db = await getDB();
  const bereiche = await db.collection('bereiche').find().toArray();
  return {
    bereiche: bereiche.map(b => ({ ...b, _id: b._id.toString() }))
  };
}
