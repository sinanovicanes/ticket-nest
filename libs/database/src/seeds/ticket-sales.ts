import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eventSchema, ticketSalesSchema } from '../schemas';
import ticketSales from './data/ticket-sales.json';

export default async function seed(db: NodePgDatabase<Record<string, never>>) {
  const insterable = await Promise.all(
    ticketSales.map(async (sales) => {
      const results = await db
        .select({ id: eventSchema.id })
        .from(eventSchema)
        .where(eq(eventSchema.name, sales.event));
      const event = results.pop();

      if (!event) {
        throw new Error(`Event not found: ${sales.event}`);
      }

      return {
        ...sales,
        eventId: event.id,
      };
    }),
  );

  await db.insert(ticketSalesSchema).values(insterable);
}
