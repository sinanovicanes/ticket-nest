import { AnyColumn, sql } from 'drizzle-orm';

export const decrement = (column: AnyColumn, amount = 1) =>
  sql`${column} - ${amount}`;
