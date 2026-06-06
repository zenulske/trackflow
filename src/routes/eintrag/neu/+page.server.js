import { getDB, ObjectId } from '$lib/server/db.js';
import { redirect, fail } from '@sveltejs/kit';

export async function load({ locals }) {
  const db = await getDB();
  const bereiche = await db.collection('bereiche')
    .find({ userId: new ObjectId(locals.user.id) }).toArray();
  return {
    bereiche: bereiche.map(b => ({
      ...b,
      _id:    b._id.toString(),
      userId: b.userId.toString()
    }))
  };
}

export const actions = {
  default: async ({ request, locals }) => {
    const db   = await getDB();
    const form = await request.formData();

    const titel     = form.get('titel')?.toString().trim();
    const bereichId = form.get('bereichId')?.toString();
    const datum     = form.get('datum')?.toString();
    const dauer     = form.get('dauer')?.toString();
    const wert      = form.get('wert')?.toString();
    const notizen   = form.get('notizen')?.toString().trim() || '';

    const fehler = {};
    if (!titel)     fehler.titel     = 'Titel ist erforderlich.';
    if (!bereichId) fehler.bereichId = 'Bitte einen Bereich wählen.';
    if (Object.keys(fehler).length > 0) {
      return fail(400, { fehler, werte: { titel, bereichId, datum, dauer, wert, notizen } });
    }

    // Ownership-Check
    const bereich = await db.collection('bereiche').findOne({
      _id:    new ObjectId(bereichId),
      userId: new ObjectId(locals.user.id)
    });
    if (!bereich) return fail(403, { fehler: { bereichId: 'Ungültiger Bereich.' } });

    // wert-Validierung: wenn zielTyp === 'wert' und kein Wert angegeben
    if (bereich.zielTyp === 'wert' && bereich.zielAnzahl && !wert) {
      return fail(400, {
        fehler: { wert: `Bitte einen Wert in ${bereich.zielEinheit || 'Einheit'} eingeben.` },
        werte:  { titel, bereichId, datum, dauer, wert, notizen }
      });
    }

    await db.collection('eintraege').insertOne({
      userId:    new ObjectId(locals.user.id),
      titel,
      bereichId: new ObjectId(bereichId),
      datum:     datum ? new Date(datum) : new Date(),
      dauer:     dauer ? parseInt(dauer)   : null,
      wert:      wert  ? parseFloat(wert)  : null,
      notizen,
      erstellt:  new Date()
    });

    throw redirect(303, `/bereiche/${bereichId}`);
  }
};
