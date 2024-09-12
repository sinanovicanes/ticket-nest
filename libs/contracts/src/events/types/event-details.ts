import { Event, Location } from '@app/database';

export interface EventDetails {
  location: Location;
}

export type EventWithDetails = Event & EventDetails;
