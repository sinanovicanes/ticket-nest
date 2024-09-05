import { TicketSales } from '@app/database';

export type ReleaseTicketSalesResponse = Pick<TicketSales, 'sold'>;
