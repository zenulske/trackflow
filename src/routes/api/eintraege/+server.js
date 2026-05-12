import { json } from '@sveltejs/kit';
import { getDB, ObjectId } from '$lib/server/db.js';

// GET /api/eintraege?bereichId=xxx
export async function GET({ url }) {
  const db = await getDB();
  const bereichId = url.searchParams.get('bereichId');
  const filter = bereichId ? { bereichId: new ObjectId(bereichId) } : {};
  const eintraege = await db.collection('eintraege')
    .find(filter).sort({ datum: -1 }).toArray();
  return json(eintraege.map(e => ({
    ...e, _id: e._id.toString(), bereichId: e.bereichId?.toString()
  })));
}

// POST /api/eintraege – neuen Eintrag erstellen
export async function POST({ request }) {
  const db = await getDB();
  const body = await request.json();

  // Validierung
  if (!body.titel?.trim()) return json({ fehler: 'Titel ist erforderlich.' }, { status: 400 });
  if (!body.bereichId)      return json({ fehler: 'Bereich ist erforderlich.' }, { status: 400 });

  const eintrag = {
    titel:     body.titel.trim(),
    bereichId: new ObjectId(body.bereichId),
    datum:     body.datum ? new Date(body.datum) : new Date(),
    dauer:     body.dauer ? parseInt(body.dauer) : null,
    notizen:   body.notizen?.trim() || '',
    erstellt:  new Date()
  };

  const result = await db.collection('eintraege').insertOne(eintrag);
  return json({ ...eintrag, _id: result.insertedId.toString(), bereichId: body.bereichId }, { status: 201 });
}
