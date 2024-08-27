import { PgColumn, PgTable } from 'drizzle-orm/pg-core';

type SelectFields = Record<string, PgColumn | Record<string, PgColumn>>;

export class SelectFieldsFactory {
  static createFromDto(
    selectDto: Object,
    table: PgTable,
    tableAliases: Record<string, PgTable> = {},
  ): SelectFields {
    const fields: SelectFields = {};

    for (const [key, value] of Object.entries(selectDto)) {
      if (!value) continue;

      if (typeof value === 'object') {
        const tableAlias = tableAliases[key];
        if (tableAlias) {
          fields[key] = this.createFromDto(
            value,
            tableAlias,
            tableAliases,
          ) as Record<string, PgColumn<any>>;
        }
        continue;
      }

      if (table[key] !== undefined) {
        fields[key] = table[key] as PgColumn<any>;
      }
    }

    return fields;
  }
}
