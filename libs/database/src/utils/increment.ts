import { AnyColumn, sql } from 'drizzle-orm';

export const increment = (column: AnyColumn, amount = 1) =>
  sql`${column} + ${amount}`;
