import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { createPgTimestamps } from '../utils';
import { discountType } from './enums';
import { payment } from './payment.schema';
import { ticketsForSale } from './tickets-for-sale.schema';

export const discountCode = pgTable('discount_codes', {
  id: uuid('id').primaryKey().defaultRandom(),
  ticketSaleId: uuid('ticket_sale_id')
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
