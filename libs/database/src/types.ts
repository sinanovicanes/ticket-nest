import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schemas';
import { PgTableWithColumns } from 'drizzle-orm/pg-core';

export type Database = NodePgDatabase<typeof schema>;

export type TableFields<T extends PgTableWithColumns<any>> = {
  [p in keyof T['_']['columns']]: boolean;
};
