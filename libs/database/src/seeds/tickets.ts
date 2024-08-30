import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import {
  eventSchema,
  paymentSchema,
  ticketSalesSchema,
  ticketSchema,
} from '../schemas';
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

      const payments = await db
        .select({ id: paymentSchema.id })
        .from(paymentSchema)
        .where(eq(paymentSchema.checkoutSessionId, ticket.paymentSessionId));
      const payment = payments.pop();

      if (!payment) {
        throw new Error(`Payment not found: ${ticket.paymentSessionId}`);
      }

      return {
        ...ticket,
        eventId: event.id,
        ticketSalesId: sales.id,
        paymentId: payment.id,
      };
    }),
  );

  await db.insert(ticketSchema).values(insterable);
}
