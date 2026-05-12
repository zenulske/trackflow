import { getDB } from '$lib/server/db.js';
import { redirect, fail } from '@sveltejs/kit';

export async function load() {
  const db = await getDB();
  const bereiche = await db.collection('bereiche').find().toArray();
  return { bereiche: bereiche.map(b => ({ ...b, _id: b._id.toString() })) };
}

export const actions = {
  default: async ({ request }) => {
    const db = await getDB();
    const form = await request.formData();

    const titel     = form.get('titel')?.toString().trim();
    const bereichId = form.get('bereichId')?.toString();
    const datum     = form.get('datum')?.toString();
    const dauer     = form.get('dauer')?.toString();
    const notizen   = form.get('notizen')?.toString().trim() || '';

    // Validierung
    const fehler = {};
    if (!titel)     fehler.titel     = 'Titel ist erforderlich.';
    if (!bereichId) fehler.bereichId = 'Bitte einen Bereich wählen.';
    if (Object.keys(fehler).length > 0) return fail(400, { fehler, werte: { titel, bereichId, datum, dauer, notizen } });

    const { ObjectId } = await import('mongodb');
    await db.collection('eintraege').insertOne({
      titel, bereichId: new ObjectId(bereichId),
      datum: datum ? new Date(datum) : new Date(),
      dauer: dauer ? parseInt(dauer) : null,
      notizen, erstellt: new Date()
    });

    throw redirect(303, '/dashboard');
  }
};
