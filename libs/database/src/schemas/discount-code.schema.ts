import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { ticketsForSale } from './tickets-for-sale.schema';
import { discountType } from './enums';
import { createPgTimestamps } from '../utils';
import { payment } from './payment.schema';

export const discountCode = pgTable('discount_codes', {
  id: serial('id').primaryKey(),
  ticketSaleId: integer('ticket_sale_id')
    .notNull()
    .references(() => ticketsForSale.id),
  discountType: discountType('discount_type').notNull(),
  amount: integer('amount').notNull(),
  code: varchar('code', { length: 255 }).notNull(),
  maxUsage: integer('max_usage').notNull(),
  expiresAt: timestamp('expires_at', { mode: 'string' }),
  ...createPgTimestamps(),
});

export const discountCodeRelations = relations(
  discountCode,
  ({ one, many }) => ({
    ticketsForSale: one(ticketsForSale, {
      fields: [discountCode.ticketSaleId],
      references: [ticketsForSale.id],
    }),
    payments: many(payment),
  }),
);
