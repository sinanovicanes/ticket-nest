import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { createPgTimestamps } from '../utils';
import { discountKind } from './enums';
import { payment } from './payment.schema';
import { ticketSales } from './ticket-sales.schema';

export const discountCode = pgTable('discount_codes', {
  id: uuid('id').primaryKey().defaultRandom(),
  ticketSalesId: uuid('ticket_sales_id')
    .notNull()
    .references(() => ticketSales.id),
  kind: discountKind('kind').notNull(),
  amount: integer('amount').notNull(),
  code: varchar('code', { length: 255 }).notNull(),
  maxUsage: integer('max_usage').notNull(),
  expiresAt: timestamp('expires_at', { mode: 'string' }),
  ...createPgTimestamps(),
});

export const discountCodeRelations = relations(
  discountCode,
  ({ one, many }) => ({
    ticketSales: one(ticketSales, {
      fields: [discountCode.ticketSalesId],
      references: [ticketSales.id],
    }),
    payments: many(payment),
  }),
);
