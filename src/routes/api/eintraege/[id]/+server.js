import { json } from '@sveltejs/kit';
import { getDB, ObjectId } from '$lib/server/db.js';

export async function DELETE({ params, locals }) {
  if (!locals.user) {
    return json({ fehler: 'Nicht eingeloggt.' }, { status: 401 });
  }

  const db = await getDB();

  // Ownership-Check: Eintrag muss dem User gehören
  const result = await db.collection('eintraege').deleteOne({
    _id:    new ObjectId(params.id),
    userId: new ObjectId(locals.user.id)
  });

  if (result.deletedCount === 0) {
    return json({ fehler: 'Eintrag nicht gefunden.' }, { status: 404 });
  }

  return json({ erfolg: true });
}
