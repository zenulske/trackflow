import { json } from '@sveltejs/kit';
import { getDB, ObjectId } from '$lib/server/db.js';

// GET /api/bereiche – nur Bereiche des eingeloggten Users
export async function GET({ locals }) {
  if (!locals.user) return json({ fehler: 'Nicht eingeloggt.' }, { status: 401 });

  const db = await getDB();
  const bereiche = await db.collection('bereiche')
    .find({ userId: new ObjectId(locals.user.id) }).toArray();

  return json(bereiche.map(b => ({ ...b, _id: b._id.toString() })));
}

// POST /api/bereiche – neuen Bereich mit userId erstellen
export async function POST({ request, locals }) {
  if (!locals.user) return json({ fehler: 'Nicht eingeloggt.' }, { status: 401 });

  const body = await request.json();
  if (!body.name?.trim()) {
    return json({ fehler: 'Name ist erforderlich.' }, { status: 400 });
  }

  const db = await getDB();
  const bereich = {
    userId:    new ObjectId(locals.user.id),   // 1:N Verknüpfung
    name:      body.name.trim(),
    icon:      body.icon      || '🎯',
    farbe:     body.farbe     || '#534AB7',
    farbeHell: body.farbeHell || '#EEEDFE',
    ziel:      body.ziel      || '—',
    erstellt:  new Date()
  };

  const result = await db.collection('bereiche').insertOne(bereich);
  return json({ ...bereich, _id: result.insertedId.toString(), userId: locals.user.id }, { status: 201 });
}
