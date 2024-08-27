import { TicketStatus } from '@app/database/enums';
import { pgEnum } from 'drizzle-orm/pg-core';

export const ticketStatus = pgEnum('ticket_statuses', [
  TicketStatus.SOLD,
  TicketStatus.RESERVED,
  TicketStatus.CANCELLED,
]);
