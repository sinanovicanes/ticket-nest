import { InferSelectModel, relations } from 'drizzle-orm';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { createPgTimestamps } from '../utils';
import { ticketSalesSchema } from './ticket-sales.schema';

export type TicketSalesImage = InferSelectModel<typeof ticketSalesImageSchema>;
export const ticketSalesImageSchema = pgTable('ticket_sales_images', {
  url: varchar('url', { length: 255 }).primaryKey(),
  ticketSalesId: uuid('ticket_sales_is')
    .notNull()
    .references(() => ticketSalesSchema.id),
  ...createPgTimestamps(),
});

export const ticketSalesImageRelations = relations(
  ticketSalesImageSchema,
  ({ one }) => ({
    event: one(ticketSalesSchema, {
      fields: [ticketSalesImageSchema.ticketSalesId],
      references: [ticketSalesSchema.id],
    }),
  }),
);
