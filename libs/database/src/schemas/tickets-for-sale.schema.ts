import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { event } from './event.schema';
import { relations } from 'drizzle-orm';
import { createPgTimestamps } from '../utils';
import { discountCode } from './discount-code.schema';
import { ticket } from './ticket.schema';

export const ticketsForSale = pgTable('tickets_for_sale', {
  id: serial('id').primaryKey(),
  eventId: integer('event_id')
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
