export enum TicketSalesMessagePatterns {
  CREATE = 'ticket-sales.create',
  UPDATE = 'ticket-sales.update',
  DELETE = 'ticket-sales.delete',
  FIND_MANY = 'ticket-sales.findMany',
  FIND_ONE = 'ticket-sales.findOne',
  FIND_BY_ID_IF_AVAILABLE = 'ticket-sales.findByIdIfAvailable',
  RESERVE_TICKETS = 'ticket-sales.reserveTickets',
  RELEASE_TICKETS = 'ticket-sales.releaseTickets',
}
