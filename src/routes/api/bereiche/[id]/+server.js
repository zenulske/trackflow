import { json } from '@sveltejs/kit';
import { getDB, ObjectId } from '$lib/server/db.js';

// PUT /api/bereiche/:id – Bereich bearbeiten
export async function PUT({ params, request }) {
  const db = await getDB();
  const body = await request.json();

  if (!body.name?.trim()) {
    return json({ fehler: 'Name ist erforderlich.' }, { status: 400 });
  }

  await db.collection('bereiche').updateOne(
    { _id: new ObjectId(params.id) },
    { $set: {
        name:      body.name.trim(),
        icon:      body.icon,
        farbe:     body.farbe,
        farbeHell: body.farbeHell,
        ziel:      body.ziel
    }}
  );
  return json({ erfolg: true });
}

// DELETE /api/bereiche/:id – Bereich löschen
export async function DELETE({ params }) {
  const db = await getDB();
  await db.collection('bereiche').deleteOne({ _id: new ObjectId(params.id) });
  await db.collection('eintraege').deleteMany({ bereichId: new ObjectId(params.id) });
  return json({ erfolg: true });
}
