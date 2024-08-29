import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eventSchema, ticketSalesSchema, ticketSchema } from '../schemas';
import tickets from './data/tickets.json';

export default async function seed(db: NodePgDatabase<Record<string, never>>) {
  const insterable = await Promise.all(
    tickets.map(async (ticket) => {
      const events = await db
        .select({ id: eventSchema.id })
        .from(eventSchema)
        .where(eq(eventSchema.name, ticket.event));
      const event = events.pop();

      if (!event) {
        throw new Error(`Event not found: ${ticket.event}`);
      }

      const ticketSales = await db
        .select({ id: ticketSalesSchema.id })
        .from(ticketSalesSchema)
        .where(eq(ticketSalesSchema.name, ticket.ticketSales));
      const sales = ticketSales.pop();

      if (!sales) {
        throw new Error(`Ticket sales not found: ${ticket.ticketSales}`);
      }

      return {
        ...ticket,
        eventId: event.id,
        ticketSalesId: sales.id,
      };
    }),
  );

  await db.insert(ticketSchema).values(insterable);
}
