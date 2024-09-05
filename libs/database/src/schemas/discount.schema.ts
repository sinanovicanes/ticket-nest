import { InferSelectModel, relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { createPgTimestamps } from '../utils';
import { discountKind } from './enums';
import { paymentSchema } from './payment.schema';
import { ticketSalesSchema } from './ticket-sales.schema';

export type Discount = InferSelectModel<typeof discountSchema>;
export const discountSchema = pgTable('discounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  ticketSalesId: uuid('ticket_sales_id')
    .notNull()
    .references(() => ticketSalesSchema.id),
  kind: discountKind('kind').notNull(),
  amount: integer('amount').notNull(),
  code: varchar('code', { length: 255 }).notNull(),
  used: integer('used').notNull(),
  maxUsage: integer('max_usage').notNull(),
  expiresAt: timestamp('expires_at', { mode: 'string' }),
  ...createPgTimestamps(),
});

export const discountRelations = relations(discountSchema, ({ one, many }) => ({
  ticketSales: one(ticketSalesSchema, {
    fields: [discountSchema.ticketSalesId],
    references: [ticketSalesSchema.id],
  }),
  payments: many(paymentSchema),
}));
