import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { locationSchema } from '../schemas';
import locations from './data/locations.json';

export default async function seed(db: NodePgDatabase<Record<string, never>>) {
  await db.insert(locationSchema).values(locations);
}
