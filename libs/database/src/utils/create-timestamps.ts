import { timestamp } from 'drizzle-orm/pg-core';

export function createPgTimestamps() {
  return {
    createdAt: timestamp('created_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date().toISOString()),
  };
}
