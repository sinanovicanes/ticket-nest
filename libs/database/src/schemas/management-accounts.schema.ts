import { InferSelectModel } from 'drizzle-orm';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { createPgTimestamps } from '../utils';

export type ManagementAccount = InferSelectModel<
  typeof managementAccountSchema
>;
export const managementAccountSchema = pgTable('management_accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  ...createPgTimestamps(),
});
