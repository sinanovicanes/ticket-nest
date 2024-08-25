import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { ticketStatus } from './enums';
import { event } from './event.schema';
import { ticketsForSale } from './tickets-for-sale.schema';
import { createPgTimestamps } from '../utils';
import { payment } from './payment.schema';

export const ticket = pgTable('tickets', {
  id: serial('id').primaryKey(),
  uuid: varchar('uuid', { length: 255 }).notNull().unique(),
  eventId: integer('event_id')
    .notNull()
    .references(() => event.id),
  ticketSaleId: integer('ticket_sale_id')
    .notNull()
    .references(() => ticketsForSale.id),
  ownerEmail: varchar('owner_email', { length: 255 }).notNull(),
  status: ticketStatus('status').notNull().default('RESERVED'),
  ...createPgTimestamps(),
});

export const ticketRelations = relations(ticket, ({ one }) => ({
  event: one(event, {
    fields: [ticket.eventId],
    references: [event.id],
  }),
  ticketForSale: one(ticketsForSale, {
    fields: [ticket.ticketSaleId],
    references: [ticketsForSale.id],
  }),
  payment: one(payment, {
    fields: [ticket.id],
    references: [payment.ticketId],
  }),
}));
