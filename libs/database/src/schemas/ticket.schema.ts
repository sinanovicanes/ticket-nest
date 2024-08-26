import { relations } from 'drizzle-orm';
import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { createPgTimestamps } from '../utils';
import { ticketStatus } from './enums';
import { event } from './event.schema';
import { payment } from './payment.schema';
import { ticketsForSale } from './tickets-for-sale.schema';

export const ticket = pgTable('tickets', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventId: uuid('event_id')
    .notNull()
    .references(() => event.id),
  ticketSaleId: uuid('ticket_sale_id')
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
