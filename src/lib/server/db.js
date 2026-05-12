import { MongoClient, ObjectId } from 'mongodb';
import { MONGODB_URI, DB_NAME } from '$env/static/private';

let client;

export async function getDB() {
  if (!client) {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
  }
  return client.db(DB_NAME || 'trackflow');
}

// ObjectId-Hilfsfunktion für ID-Konvertierung
export { ObjectId };
