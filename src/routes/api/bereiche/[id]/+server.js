import { json } from '@sveltejs/kit';
import { getDB, ObjectId } from '$lib/server/db.js';

// Hilfsfunktion: Prüfen ob Bereich dem User gehört
async function pruefeEigentuemer(db, id, userId) {
  return await db.collection('bereiche').findOne({
    _id:    new ObjectId(id),
    userId: new ObjectId(userId)
  });
}

export async function PUT({ params, request, locals }) {
  if (!locals.user) return json({ fehler: 'Nicht eingeloggt.' }, { status: 401 });

  const db = await getDB();
  const bereich = await pruefeEigentuemer(db, params.id, locals.user.id);
  if (!bereich) return json({ fehler: 'Nicht gefunden.' }, { status: 404 });

  const body = await request.json();
  if (!body.name?.trim()) return json({ fehler: 'Name ist erforderlich.' }, { status: 400 });

  await db.collection('bereiche').updateOne(
    { _id: new ObjectId(params.id) },
    { $set: { name: body.name.trim(), icon: body.icon, farbe: body.farbe, farbeHell: body.farbeHell, ziel: body.ziel } }
  );
  return json({ erfolg: true });
}

export async function DELETE({ params, locals }) {
  if (!locals.user) return json({ fehler: 'Nicht eingeloggt.' }, { status: 401 });

  const db = await getDB();
  const bereich = await pruefeEigentuemer(db, params.id, locals.user.id);
  if (!bereich) return json({ fehler: 'Nicht gefunden.' }, { status: 404 });

  await db.collection('bereiche').deleteOne({ _id: new ObjectId(params.id) });
  await db.collection('eintraege').deleteMany({ bereichId: new ObjectId(params.id) });
  return json({ erfolg: true });
}
