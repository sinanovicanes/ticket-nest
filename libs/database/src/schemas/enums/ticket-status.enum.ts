import { TicketStatus } from '@app/database/enums';
import { pgEnum } from 'drizzle-orm/pg-core';

export const ticketStatus = pgEnum('ticket_status', [
  TicketStatus.ACTIVE,
  TicketStatus.DEACTIVE,
  TicketStatus.USED,
  TicketStatus.CANCELLED,
]);
