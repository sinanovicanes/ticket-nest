import {
  sql,
  type AnyColumn,
  type SQL,
  type InferSelectModel,
  is,
  arrayContained,
  GetColumnData,
  and,
} from 'drizzle-orm';
import {
  type SelectedFields,
  type PgTable,
  type TableConfig,
  PgTimestampString,
} from 'drizzle-orm/pg-core';
import { type SelectResultFields } from 'node_modules/drizzle-orm/query-builders/select.types';

export function jsonBuildObject<T extends SelectedFields>(shape: T) {
  const chunks: SQL[] = [];

  Object.entries(shape).forEach(([key, value]) => {
    if (chunks.length > 0) {
      chunks.push(sql.raw(`,`));
    }

    chunks.push(sql.raw(`'${key}',`));

    // json_build_object formats to ISO 8601 ...
    if (is(value, PgTimestampString)) {
      chunks.push(sql`timezone('UTC', ${value})`);
    } else {
      chunks.push(sql`${value}`);
    }
  });

  return sql<SelectResultFields<T>>`json_build_object(${sql.join(chunks)})`;
}

export function jsonAggBuildObject<
  T extends SelectedFields,
  Column extends AnyColumn,
>(
  shape: T,
  options?: { orderBy?: { colName: Column; direction: 'ASC' | 'DESC' } },
) {
  return sql<SelectResultFields<T>[]>`coalesce(
    json_agg(${jsonBuildObject(shape)}
    ${
      options?.orderBy
        ? sql`ORDER BY ${options.orderBy.colName} ${sql.raw(
            options.orderBy.direction,
          )}`
        : undefined
    })
    FILTER (WHERE ${and(
      sql.join(
        Object.values(shape).map((value) => sql`${sql`${value}`} IS NOT NULL`),
        sql` AND `,
      ),
    )})
    ,'${sql`[]`}')`;
}

// Sometimes you want an array and not a json
export function arrayAgg<Column extends AnyColumn>(column: Column) {
  return sql<
    GetColumnData<Column, 'raw'>[]
  >`array_agg(distinct ${sql`${column}`}) filter (where ${column} is not null)`;
}

// To be completed
type PGCastTypes = 'uuid' | 'uuid[]' | 'text' | 'text[]';

type PGArrayCastTypes = {
  [P in PGCastTypes]: P extends `${infer _T}[]` ? P : never;
}[PGCastTypes];

// Transform an array of values (from a function params) into a postgres array
export function toArray<Values>(values: Values[], cast: PGArrayCastTypes) {
  const chunks: SQL[] = [];

  values.forEach((column) => {
    if (chunks.length > 0) {
      chunks.push(sql.raw(`,`));
    }

    chunks.push(sql`${column}`);
  });

  return sql`array[${sql.join(chunks)}]::${sql.raw(cast)}`;
}
