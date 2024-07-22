
import { config } from 'dotenv';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

config({ path: '.env.local' });

const client = new Client({
  connectionString: process.env.DATABASE_URL as string,
});

// (async () => {
//   await client.connect();
//   try {
//     const results = await client.query('SELECT * from users');
//     console.log(results);
//   } catch (err) {
//     console.error('error executing query:', err);
//   } 
// })();
client.connect();
export const db = drizzle(client, {schema, logger: true});
