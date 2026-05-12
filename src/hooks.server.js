import { getDB } from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';

const oeffentlicheRouten = ['/login', '/register'];

export async function handle({ event, resolve }) {
  const sessionId = event.cookies.get('session');

  if (sessionId) {
    try {
      const db = await getDB();
      const session = await db.collection('sessions').findOne({ sessionId });
      if (session) {
        event.locals.user = {
          id:    session.userId.toString(),
          name:  session.name,
          email: session.email
        };
      }
    } catch (e) {
      console.error('Session-Fehler:', e);
    }
  }

  const istOeffentlich = oeffentlicheRouten.some(r => event.url.pathname.startsWith(r));

  if (!event.locals.user && !istOeffentlich) {
    throw redirect(303, '/login');
  }

  if (event.locals.user && istOeffentlich) {
    throw redirect(303, '/dashboard');
  }

  return resolve(event);
}