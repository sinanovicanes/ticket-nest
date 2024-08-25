import { pgEnum } from 'drizzle-orm/pg-core';

export const ticketStatus = pgEnum('ticket_statuses', [
  'SOLD',
  'CANCELLED',
  'RESERVED',
]);
