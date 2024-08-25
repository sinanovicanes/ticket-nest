import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Client } from 'pg';

async function startMigration() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();

  const db = drizzle(client);

  await migrate(db, { migrationsFolder: './drizzle' });

  await client.end();
}

startMigration();
