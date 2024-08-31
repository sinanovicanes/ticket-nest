import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { paymentSchema, ticketSalesSchema } from '../schemas';
import payments from './data/payments.json';

export default async function seed(db: NodePgDatabase<Record<string, never>>) {
  const insertable = await Promise.all(
    payments.map(async (payment) => {
      const results = await db
        .select({ id: ticketSalesSchema.id })
        .from(ticketSalesSchema)
        .where(eq(ticketSalesSchema.name, payment.ticketSales));
      const ticketSales = results.pop();

      if (!ticketSales) {
        throw new Error(
          `Ticket sales not found for payment ${payment.ticketSales}`,
        );
      }

      return {
        ...payment,
        ticketSalesId: ticketSales.id,
      };
    }),
  );

  await db.insert(paymentSchema).values(insertable);
}
