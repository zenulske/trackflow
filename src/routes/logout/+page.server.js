import { redirect } from '@sveltejs/kit';
import { getDB } from '$lib/server/db.js';

export const actions = {
  default: async ({ cookies }) => {
    const sessionId = cookies.get('session');
    if (sessionId) {
      const db = await getDB();
      await db.collection('sessions').deleteOne({ sessionId });
      cookies.delete('session', { path: '/' });
    }
    throw redirect(303, '/login');
  }
};
