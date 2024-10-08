import { InferSelectModel, relations } from 'drizzle-orm';
import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { createPgTimestamps } from '../utils';
import { eventSchema } from './event.schema';
import { ticketSchema } from './ticket.schema';

export type TicketSales = InferSelectModel<typeof ticketSalesSchema>;
export const ticketSalesSchema = pgTable('ticket_sales', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventId: uuid('event_id')
    .notNull()
    .references(() => eventSchema.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 2000 }).notNull(),
  quantity: integer('quantity').notNull(),
  sold: integer('sold').notNull(),
  price: integer('price').notNull(),
  ...createPgTimestamps(),
});

export const ticketSalesRelations = relations(
  ticketSalesSchema,
  ({ one, many }) => ({
    event: one(eventSchema, {
      fields: [ticketSalesSchema.eventId],
      references: [eventSchema.id],
    }),
    tickets: many(ticketSchema),
  }),
);
