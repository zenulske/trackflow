import { getDB, ObjectId } from '$lib/server/db.js';
import { fail } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
  return { user: locals.user };
}

export const actions = {

  // Name & E-Mail aktualisieren
  updateProfil: async ({ request, locals }) => {
    const db = await getDB();
    const form = await request.formData();
    const name = form.get('name')?.toString().trim();
    const email = form.get('email')?.toString().trim().toLowerCase();

    const fehler = {};
    if (!name) fehler.name = 'Name ist erforderlich.';
    if (!email) fehler.email = 'E-Mail ist erforderlich.';
    if (Object.keys(fehler).length) return fail(400, { aktion: 'profil', fehler });

    // Prüfen ob E-Mail schon von anderem User verwendet wird
    const exists = await db.collection('users').findOne({
      email, _id: { $ne: new ObjectId(locals.user.id) }
    });
    if (exists) return fail(400, { aktion: 'profil', fehler: { email: 'E-Mail bereits vergeben.' } });

    await db.collection('users').updateOne(
      { _id: new ObjectId(locals.user.id) },
      { $set: { name, email } }
    );

    // Session aktualisieren
    await db.collection('sessions').updateMany(
      { userId: new ObjectId(locals.user.id) },
      { $set: { name, email } }
    );

    return { aktion: 'profil', erfolg: 'Profil erfolgreich aktualisiert.' };
  },

  // Passwort ändern
  updatePasswort: async ({ request, locals, cookies }) => {
    const db = await getDB();
    const form = await request.formData();
    const aktuell = form.get('aktuell')?.toString();
    const neu = form.get('neu')?.toString();       // ← hier definiert
    const bestaetigung = form.get('bestaetigung')?.toString();

    const fehler = {};
    if (!aktuell) fehler.aktuell = 'Aktuelles Passwort eingeben.';
    if (!neu || neu.length < 8) fehler.neu = 'Neues Passwort mind. 8 Zeichen.';
    if (neu !== bestaetigung) fehler.bestaetigung = 'Passwörter stimmen nicht überein.';
    if (Object.keys(fehler).length) return fail(400, { aktion: 'passwort', fehler });

    const user = await db.collection('users').findOne({ _id: new ObjectId(locals.user.id) });
    const korrekt = await bcrypt.compare(aktuell, user.passwortHash);
    if (!korrekt) return fail(400, { aktion: 'passwort', fehler: { aktuell: 'Aktuelles Passwort falsch.' } });

    const passwortHash = await bcrypt.hash(neu, 12);   // ← neu wird hier verwendet
    await db.collection('users').updateOne(
      { _id: new ObjectId(locals.user.id) },
      { $set: { passwortHash } }
    );

    // Alle Sessions löschen
    await db.collection('sessions').deleteMany({ userId: new ObjectId(locals.user.id) });
    cookies.delete('session', { path: '/' });

    throw redirect(303, '/login?passwort=geaendert');
  }
};
