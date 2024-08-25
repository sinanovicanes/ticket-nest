import { relations } from 'drizzle-orm';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { event } from './event.schema';
import { createPgTimestamps } from '../utils';

export const location = pgTable('locations', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  city: varchar('city', { length: 255 }).notNull(),
  province: varchar('province', { length: 255 }).notNull(),
  fullAddress: varchar('full_address', { length: 500 }).notNull(),
  fullAddress2: varchar('full_address_2', { length: 500 }),
  ...createPgTimestamps(),
});

export const locationRelations = relations(location, ({ many }) => ({
  events: many(event),
}));
