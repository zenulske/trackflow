import { getDB, ObjectId } from '$lib/server/db.js';
import { error, fail, redirect } from '@sveltejs/kit';

export async function load({ params, locals }) {
  const db = await getDB();
  const bereich = await db.collection('bereiche').findOne({
    _id: new ObjectId(params.id),
    userId: new ObjectId(locals.user.id)
  });
  if (!bereich) throw error(404, 'Bereich nicht gefunden.');
  return {
    bereich: { ...bereich, _id: bereich._id.toString(), userId: bereich.userId.toString() }
  };
}

export const actions = {
  default: async ({ params, request, locals }) => {
    const db = await getDB();
    const form = await request.formData();

    const name = form.get('name')?.toString().trim();
    const icon = form.get('icon')?.toString();
    const farbe = form.get('farbe')?.toString();
    const farbeHell = form.get('farbeHell')?.toString();
    const zielAnzahl = form.get('zielAnzahl')?.toString();
    const zielZeitraum = form.get('zielZeitraum')?.toString();
    const zielTyp = form.get('zielTyp')?.toString();
    const zielEinheit = form.get('zielEinheit')?.toString().trim();

    if (!name) return fail(400, { fehler: 'Name ist erforderlich.' });

    const bereich = await db.collection('bereiche').findOne({
      _id: new ObjectId(params.id),
      userId: new ObjectId(locals.user.id)
    });
    if (!bereich) throw error(404, 'Bereich nicht gefunden.');

    await db.collection('bereiche').updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          name,
          icon,
          farbe,
          farbeHell,
          zielAnzahl: zielAnzahl ? parseInt(zielAnzahl) : null,
          zielZeitraum: zielZeitraum || 'woche',
          zielTyp: zielTyp || 'eintraege',
          zielEinheit: zielEinheit || (zielTyp === 'minuten' ? 'Min.' : 'Einträge')
        }
      }
    );

    throw redirect(303, `/bereiche/${params.id}`);
  }
};
