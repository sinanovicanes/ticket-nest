import { InferSelectModel, relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { createPgTimestamps } from '../utils';
import { locationSchema } from './location.schema';
import { ticketSalesSchema } from './ticket-sales.schema';
import { ticketSchema } from './ticket.schema';

export type Event = InferSelectModel<typeof eventSchema>;
export const eventSchema = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  date: timestamp('date', { mode: 'string' }).notNull(),
  description: varchar('description', { length: 2000 }).notNull(),
  locationId: uuid('location_id')
    .notNull()
    .references(() => locationSchema.id),
  ...createPgTimestamps(),
});

export const eventRelations = relations(eventSchema, ({ many, one }) => ({
  location: one(locationSchema, {
    fields: [eventSchema.locationId],
    references: [locationSchema.id],
  }),
  tickets: many(ticketSchema),
  ticketSales: many(ticketSalesSchema),
}));
