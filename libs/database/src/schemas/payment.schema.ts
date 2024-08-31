import { relations } from 'drizzle-orm';
import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { createPgTimestamps } from '../utils';
import { discountSchema } from './discount.schema';
import { ticketSchema } from './ticket.schema';
import { paymentStatus } from './enums';
import { PaymentStatus } from '../enums';
import { ticketSalesSchema } from './ticket-sales.schema';

export const paymentSchema = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  checkoutSessionId: varchar('checkout_session_id').notNull().unique(),
  ticketSalesId: uuid('ticket_sales_id')
    .notNull()
    .references(() => ticketSalesSchema.id),
  discountId: uuid('discount_id').references(() => discountSchema.id),
  total: integer('total').notNull(),
  email: varchar('owner_email').notNull(),
  status: paymentStatus('status').notNull().default(PaymentStatus.PENDING),
  ticketCount: integer('ticket_count').notNull(),
  ...createPgTimestamps(),
});

export const paymentRelations = relations(paymentSchema, ({ one, many }) => ({
  ticket: many(ticketSchema),
  ticketSales: one(ticketSalesSchema, {
    fields: [paymentSchema.ticketSalesId],
    references: [ticketSalesSchema.id],
  }),
  discount: one(discountSchema, {
    fields: [paymentSchema.id],
    references: [discountSchema.id],
  }),
}));
