import { Event, TicketSales } from '@app/database';

type SelectedTicketSalesFields = Omit<
  TicketSales,
  'createdAt' | 'updatedAt' | 'eventId' | 'sold'
>;

type SelectedEventFields = Pick<Event, 'id' | 'name' | 'date'>;

export type AvailableTicketSales = SelectedTicketSalesFields & {
  event: SelectedEventFields;
};
