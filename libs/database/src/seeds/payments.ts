import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { paymentSchema } from '../schemas';
import payments from './data/payments.json';

export default async function seed(db: NodePgDatabase<Record<string, never>>) {
  await db.insert(paymentSchema).values(payments);
}
