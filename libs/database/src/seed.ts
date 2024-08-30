import 'dotenv/config';
import { getTableName, sql, Table } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { PgTable } from 'drizzle-orm/pg-core';
import { Client } from 'pg';
import * as schemas from './schemas';
import * as seeds from './seeds';

const getDatabaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.DATABASE_URL;
  }

  return process.env.DATABASE_URL.replace(
    process.env.DATABASE_HOST,
    'localhost',
  );
};

const client = new Client({
  connectionString: getDatabaseUrl(),
});

const db = drizzle(client);

async function resetTable(table: Table) {
  if (table instanceof PgTable) {
    return db.execute(
      sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`),
    );
  }
}

async function resetTables() {
  console.log('Resetting tables...');
  for (const schema of Object.values(schemas)) {
    for (const table of Object.values(schema)) {
      await resetTable(table);
    }
  }
  console.log('Tables reset.');
}

async function seed() {
  console.log('Seeding tables...');

  await seeds.locations(db);
  await seeds.events(db);
  await seeds.ticketSales(db);
  await seeds.payments(db);
  await seeds.tickets(db);

  console.log('Tables seeded.');
}

async function startSeed() {
  await client.connect();
  await resetTables();
  await seed();
  await client.end();
}

startSeed();
