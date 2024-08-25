import { relations } from 'drizzle-orm';
import { pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { ticket } from './ticket';

export const event = pgTable('events', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const eventRelations = relations(event, ({ many }) => ({
  tickets: many(ticket),
}));
