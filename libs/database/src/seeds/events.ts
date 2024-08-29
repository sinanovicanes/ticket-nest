import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eventSchema, locationSchema } from '../schemas';
import events from './data/events.json';

export default async function seed(db: NodePgDatabase<Record<string, never>>) {
  const insertable = await Promise.all(
    events.map(async (event) => {
      const results = await db
        .select({ id: locationSchema.id })
        .from(locationSchema)
        .where(eq(locationSchema.name, event.location));
      const location = results.pop();

      if (!location) {
        throw new Error(`Location not found: ${event.location}`);
      }

      return {
        ...event,
        locationId: location.id,
      };
    }),
  );

  await db.insert(eventSchema).values(insertable);
}
