import { json } from '@sveltejs/kit';
import { getDB } from '$lib/server/db.js';

// GET /api/bereiche – alle Bereiche laden
export async function GET() {
  const db = await getDB();
  const bereiche = await db.collection('bereiche').find().toArray();
  return json(bereiche.map(b => ({ ...b, _id: b._id.toString() })));
}

// POST /api/bereiche – neuen Bereich erstellen
export async function POST({ request }) {
  const db = await getDB();
  const body = await request.json();

  // Validierung
  if (!body.name?.trim()) {
    return json({ fehler: 'Name ist erforderlich.' }, { status: 400 });
  }

  const bereich = {
    name:      body.name.trim(),
    icon:      body.icon      || '🎯',
    farbe:     body.farbe     || '#534AB7',
    farbeHell: body.farbeHell || '#EEEDFE',
    ziel:      body.ziel      || '—',
    erstellt:  new Date()
  };

  const result = await db.collection('bereiche').insertOne(bereich);
  return json({ ...bereich, _id: result.insertedId.toString() }, { status: 201 });
}
