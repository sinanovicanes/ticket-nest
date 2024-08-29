import { relations } from 'drizzle-orm';
import { integer, pgTable, uuid } from 'drizzle-orm/pg-core';
import { createPgTimestamps } from '../utils';
import { discountCodeSchema } from './discount-code.schema';
import { ticketSchema } from './ticket.schema';

export const paymentSchema = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  ticketId: uuid('ticket_id')
    .notNull()
    .references(() => ticketSchema.id),
  defaultPrice: integer('default_price').notNull(),
  discountId: integer('discount_id').references(() => discountCodeSchema.id),
  payment: integer('payment').notNull(),
  ...createPgTimestamps(),
});

export const paymentRelations = relations(paymentSchema, ({ one, many }) => ({
  ticket: one(ticketSchema, {
    fields: [paymentSchema.ticketId],
    references: [ticketSchema.id],
  }),
  discountCode: one(discountCodeSchema, {
    fields: [paymentSchema.id],
    references: [discountCodeSchema.id],
  }),
}));
