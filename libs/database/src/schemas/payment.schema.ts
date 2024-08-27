import { relations } from 'drizzle-orm';
import { integer, pgTable, uuid } from 'drizzle-orm/pg-core';
import { createPgTimestamps } from '../utils';
import { discountCode } from './discount-code.schema';
import { ticket } from './ticket.schema';

export const payment = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  ticketId: uuid('ticket_id')
    .notNull()
    .references(() => ticket.id),
  defaultPrice: integer('default_price').notNull(),
  discountId: integer('discount_id').references(() => discountCode.id),
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
