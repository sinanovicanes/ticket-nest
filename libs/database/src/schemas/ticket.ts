import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  serial,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core';
import { event } from './event';

export const ticket = pgTable(
  'tickets',
  {
    id: serial('id').primaryKey(),
    number: serial('number'),
    eventId: integer('event_id')
      .notNull()
      .references(() => event.id),
    createdAt: timestamp('created_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    eventIdNumber: unique('event_id_number').on(table.eventId, table.number),
  }),
);

export const ticketRelations = relations(ticket, ({ one }) => ({
  event: one(event, {
    fields: [ticket.eventId],
    references: [event.id],
  }),
}));
