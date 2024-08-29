import { relations } from 'drizzle-orm';
import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { createPgTimestamps } from '../utils';
import { ticketStatus } from './enums';
import { eventSchema } from './event.schema';
import { paymentSchema } from './payment.schema';
import { ticketSalesSchema } from './ticket-sales.schema';
import { TicketStatus } from '../enums';

export const ticketSchema = pgTable('tickets', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventId: uuid('event_id')
    .notNull()
    .references(() => eventSchema.id),
  ticketSalesId: uuid('ticket_sales_id')
    .notNull()
    .references(() => ticketSalesSchema.id),
  ownerEmail: varchar('owner_email', { length: 255 }).notNull(),
  status: ticketStatus('status').notNull().default(TicketStatus.RESERVED),
  ...createPgTimestamps(),
});

export const ticketRelations = relations(ticketSchema, ({ one }) => ({
  event: one(eventSchema, {
    fields: [ticketSchema.eventId],
    references: [eventSchema.id],
  }),
  ticketSales: one(ticketSalesSchema, {
    fields: [ticketSchema.ticketSalesId],
    references: [ticketSalesSchema.id],
  }),
  payment: one(paymentSchema, {
    fields: [ticketSchema.id],
    references: [paymentSchema.ticketId],
  }),
}));
