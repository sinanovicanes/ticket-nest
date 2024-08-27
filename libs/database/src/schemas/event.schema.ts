import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { createPgTimestamps } from '../utils';
import { location } from './location.schema';
import { ticket } from './ticket.schema';
import { ticketSales } from './ticket-sales.schema';

export const event = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  date: timestamp('date', { mode: 'string' }).notNull(),
  description: varchar('description', { length: 2000 }).notNull(),
  locationId: uuid('location_id')
    .notNull()
    .references(() => location.id),
  ...createPgTimestamps(),
});

export const eventRelations = relations(event, ({ many, one }) => ({
  location: one(location, {
    fields: [event.locationId],
    references: [location.id],
  }),
  tickets: many(ticket),
  ticketSales: many(ticketSales),
}));
