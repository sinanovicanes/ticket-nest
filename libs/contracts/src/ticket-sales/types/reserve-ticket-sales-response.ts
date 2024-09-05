import { TicketSales } from '@app/database';
import { AvailableTicketSales } from './available-ticket-sales';

export type ReserveTicketSalesResponse = AvailableTicketSales & {
  sold: TicketSales['sold'];
};
