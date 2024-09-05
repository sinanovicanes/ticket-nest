import { Event, Location, TicketSales } from '@app/database';

type SelectedTicketSalesFields = Omit<
  TicketSales,
  'updatedAt' | 'eventId' | 'sold'
>;

type SelectedEventFields = Pick<Event, 'id' | 'name' | 'date' | 'description'>;
type SelectedLocationFields = Pick<
  Location,
  'id' | 'name' | 'address' | 'address2' | 'city' | 'province'
>;

export type TicketSalesWithEventDetails = SelectedTicketSalesFields & {
  event: SelectedEventFields;
  location: SelectedLocationFields;
};
