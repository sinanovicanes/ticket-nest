import { integer, pgTable, serial } from 'drizzle-orm/pg-core';
import { ticket } from './ticket.schema';
import { createPgTimestamps } from '../utils';
import { relations } from 'drizzle-orm';
import { discountCode } from './discount-code.schema';

export const payment = pgTable('payments', {
  id: serial('id').primaryKey(),
  ticketId: integer('ticket_id')
    .notNull()
    .references(() => ticket.id),
  default_price: integer('default_price').notNull(),
  // TODO: Add discountId
  // discountId: integer('discount_id').references(() => .id),
  payment: integer('payment').notNull(),
  ...createPgTimestamps(),
});

export const paymentRelations = relations(payment, ({ one, many }) => ({
  ticket: one(ticket, {
    fields: [payment.ticketId],
    references: [ticket.id],
  }),
  discountCode: one(discountCode, {
    fields: [payment.id],
    references: [discountCode.id],
  }),
}));
