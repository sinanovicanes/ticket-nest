import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Client } from 'pg';
import { MIGRATIONS_FOLDER } from './constants';

const getDatabaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.DATABASE_URL;
  }

  return process.env.DATABASE_URL.replace(
    process.env.DATABASE_HOST,
    'localhost',
  );
};

async function startMigration() {
  const client = new Client({
    connectionString: getDatabaseUrl(),
  });

  await client.connect();

  const db = drizzle(client);

  await migrate(db, { migrationsFolder: MIGRATIONS_FOLDER });

  await client.end();
}

startMigration();
