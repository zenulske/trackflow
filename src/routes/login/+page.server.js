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
    const email    = form.get('email')?.toString().trim().toLowerCase();
    const passwort = form.get('passwort')?.toString();

    if (!email || !passwort) {
      return fail(400, { fehler: 'Bitte alle Felder ausfüllen.' });
    }

    const db = await getDB();
    const user = await db.collection('users').findOne({ email });

    const passwortKorrekt = user && await bcrypt.compare(passwort, user.passwortHash);
    if (!user || !passwortKorrekt) {
      return fail(400, { fehler: 'E-Mail oder Passwort falsch.' });
    }

    // Session erstellen
    const sessionId = randomBytes(32).toString('hex');
    await db.collection('sessions').insertOne({
      sessionId,
      userId: user._id,
      name:   user.name,
      email:  user.email,
      erstellt: new Date()
    });

    cookies.set('session', sessionId, {
      path:     '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge:   60 * 60 * 24 * 7  // 7 Tage
    });

    throw redirect(303, '/dashboard');
  }
};
