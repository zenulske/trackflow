import { fail, redirect } from '@sveltejs/kit';
import { getDB } from '$lib/server/db.js';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

export async function load() {
  return {};
}

export const actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const name     = form.get('name')?.toString().trim();
    const email    = form.get('email')?.toString().trim().toLowerCase();
    const passwort = form.get('passwort')?.toString();

    // Validierung
    const fehler = {};
    if (!name)                        fehler.name     = 'Name ist erforderlich.';
    if (!email)                       fehler.email    = 'E-Mail ist erforderlich.';
    if (!passwort || passwort.length < 8) fehler.passwort = 'Passwort mind. 8 Zeichen.';
    if (Object.keys(fehler).length)   return fail(400, { fehler, werte: { name, email } });

    const db = await getDB();

    // Prüfen ob E-Mail schon existiert
    const exists = await db.collection('users').findOne({ email });
    if (exists) return fail(400, { fehler: { email: 'E-Mail bereits registriert.' }, werte: { name, email } });

    // User erstellen
    const passwortHash = await bcrypt.hash(passwort, 12);
    const result = await db.collection('users').insertOne({
      name, email, passwortHash, erstellt: new Date()
    });

    // Session erstellen
    const sessionId = randomBytes(32).toString('hex');
    await db.collection('sessions').insertOne({
      sessionId,
      userId: result.insertedId,
      name, email,
      erstellt: new Date()
    });

    cookies.set('session', sessionId, {
      path:     '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge:   60 * 60 * 24 * 7
    });

    throw redirect(303, '/dashboard');
  }
};
