import { desc, relations } from 'drizzle-orm';
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { ticket } from './ticket';

export const event = pgTable('events', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  date: timestamp('date', { mode: 'string' }).notNull(),
  description: varchar('description', { length: 2000 }).notNull(),
  location: varchar('location', { length: 500 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const eventRelations = relations(event, ({ many }) => ({
  tickets: many(ticket),
}));
