import { PgColumn, PgTable } from 'drizzle-orm/pg-core';

type SelectFields = Record<string, PgColumn | Record<string, PgColumn>>;

export class SelectFieldsFactory {
  static createFromDto(
    selectDto: Object,
    table: PgTable,
    tableReferences: Record<string, PgTable> = {},
  ): SelectFields {
    const fields: SelectFields = {};

    // Expected input: {id: true, name: true, event: {id: true, name: true, location: {id: true, address: true, address2: true}}}
    // Output: {id: PgColumn, name: PgColumn, event: {id: PgColumn, name: PgColumn}, location: {id: PgColumn, address: PgColumn, address2: PgColumn}}
    const generateTableFields = (
      [key, value]: [string, boolean | Object],
      referenceKey?: string,
    ) => {
      // If the value is falsy, we don't want to select that key
      if (!value) return;

      // If the value is an object, iterate over its key
      if (typeof value === 'object') {
        // Since value is an object that means it is a reference from another table
        // Check if the nested key exist on the table references
        const reference = tableReferences[key];

        // If the key does not exist on the table references, skip it
        if (!reference) return;

        for (const nestedKey in value) {
          const nestedValue = value[nestedKey];
          // Recursively call this function to unwrap all of the nested references
          generateTableFields([nestedKey, nestedValue], key);
        }
      }

      // If the reference key exist, that means this is a reference from another table
      if (referenceKey) {
        // Check if the key exist on the table references
        // We don't need to check if the reference key exist on the table references because we already checked it on before the previous iteration
        const tableReference = tableReferences[referenceKey];

        // If the key does not exist on the fields object, create an empty object so we can add fields to it
        if (!fields[referenceKey]) {
          fields[referenceKey] = {};
        }

        // If the value is a boolean and the key exist on the table reference, add it to the fields object
        if (typeof value === 'boolean' && tableReference[key]) {
          fields[referenceKey][key] = tableReference[key];
        }
        return;
      }

      // Reference key does not exist, so we are working with the main table
      // If the value is a boolean and the key exist on the table, add it to the fields object
      if (typeof value === 'boolean' && table[key]) {
        fields[key] = table[key];
      }
    };

    for (const key in selectDto) {
      generateTableFields([key, selectDto[key]]);
    }

    return fields;
  }
}
