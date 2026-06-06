import { getDB, ObjectId } from '$lib/server/db.js';
import { error, fail, redirect } from '@sveltejs/kit';

export async function load({ params, locals }) {
  const db = await getDB();

  const eintrag = await db.collection('eintraege').findOne({
    _id:    new ObjectId(params.id),
    userId: new ObjectId(locals.user.id)
  });
  if (!eintrag) throw error(404, 'Eintrag nicht gefunden.');

  // Bereich des Eintrags laden (für Anzeige + Formlogik)
  const bereich = await db.collection('bereiche').findOne({
    _id:    eintrag.bereichId,
    userId: new ObjectId(locals.user.id)
  });
  if (!bereich) throw error(404, 'Bereich nicht gefunden.');

  return {
    eintrag: {
      ...eintrag,
      _id:       eintrag._id.toString(),
      bereichId: eintrag.bereichId.toString(),
      userId:    eintrag.userId.toString(),
      datum:     eintrag.datum ? new Date(eintrag.datum).toISOString().split('T')[0] : ''
    },
    bereich: {
      ...bereich,
      _id:    bereich._id.toString(),
      userId: bereich.userId.toString()
    }
  };
}

export const actions = {
  default: async ({ params, request, locals }) => {
    const db   = await getDB();
    const form = await request.formData();

    const titel   = form.get('titel')?.toString().trim();
    const datum   = form.get('datum')?.toString();
    const dauer   = form.get('dauer')?.toString();
    const wert    = form.get('wert')?.toString();
    const notizen = form.get('notizen')?.toString().trim() || '';

    const fehler = {};
    if (!titel) fehler.titel = 'Titel ist erforderlich.';
    if (Object.keys(fehler).length > 0) {
      return fail(400, { fehler, werte: { titel, datum, dauer, wert, notizen } });
    }

    // Eintrag laden (Ownership-Check) — bereichId KOMMT NICHT aus Form, kann nicht geändert werden
    const eintrag = await db.collection('eintraege').findOne({
      _id:    new ObjectId(params.id),
      userId: new ObjectId(locals.user.id)
    });
    if (!eintrag) throw error(404, 'Eintrag nicht gefunden.');

    const bereich = await db.collection('bereiche').findOne({
      _id: eintrag.bereichId,
      userId: new ObjectId(locals.user.id)
    });
    if (!bereich) throw error(404, 'Bereich nicht gefunden.');

    // Validierung Wert bei zielTyp === 'wert'
    if (bereich.zielTyp === 'wert' && bereich.zielAnzahl && !wert) {
      return fail(400, {
        fehler: { wert: `Bitte einen Wert in ${bereich.zielEinheit || 'Einheit'} eingeben.` },
        werte:  { titel, datum, dauer, wert, notizen }
      });
    }

    await db.collection('eintraege').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: {
        titel,
        datum:        datum ? new Date(datum) : new Date(),
        dauer:        dauer ? parseInt(dauer)  : null,
        wert:         wert  ? parseFloat(wert) : null,
        notizen,
        aktualisiert: new Date()
      }}
    );

    // Zurück zur selben Bereichs-Detailseite
    throw redirect(303, `/bereiche/${eintrag.bereichId.toString()}`);
  }
};
