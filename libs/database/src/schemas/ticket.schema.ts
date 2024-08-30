import { relations } from 'drizzle-orm';
import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { TicketStatus } from '../enums';
import { createPgTimestamps } from '../utils';
import { ticketStatus } from './enums';
import { eventSchema } from './event.schema';
import { paymentSchema } from './payment.schema';
import { ticketSalesSchema } from './ticket-sales.schema';

export const ticketSchema = pgTable('tickets', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventId: uuid('event_id')
    .notNull()
    .references(() => eventSchema.id),
  ticketSalesId: uuid('ticket_sales_id')
    .notNull()
    .references(() => ticketSalesSchema.id),
  paymentId: uuid('payment_id').references(() => paymentSchema.id),
  status: ticketStatus('status').notNull().default(TicketStatus.ACTIVE),
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
    fields: [ticketSchema.paymentId],
    references: [paymentSchema.id],
  }),
}));
