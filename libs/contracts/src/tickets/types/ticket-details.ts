import { EventWithDetails } from '@app/contracts/events/types';
import { Payment, Ticket, TicketSales } from '@app/database';

export interface TicketDetails {
  event: EventWithDetails;
  payment: Payment;
  ticketSales: TicketSales;
}

export type TicketWithDetails = Ticket & TicketDetails;
