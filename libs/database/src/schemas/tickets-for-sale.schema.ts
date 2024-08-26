import { relations } from 'drizzle-orm';
import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { createPgTimestamps } from '../utils';
import { discountCode } from './discount-code.schema';
import { event } from './event.schema';
import { ticket } from './ticket.schema';

export const ticketsForSale = pgTable('tickets_for_sale', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventId: uuid('event_id')
    .notNull()
    .references(() => event.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 2000 }).notNull(),
  quantity: integer('quantity').notNull(),
  price: integer('price').notNull(),
  ...createPgTimestamps(),
});

export const ticketsForSaleRelations = relations(
  ticketsForSale,
  ({ one, many }) => ({
    event: one(event, {
      fields: [ticketsForSale.eventId],
      references: [event.id],
    }),
    discountCodes: many(discountCode),
    tickets: many(ticket),
  }),
);
