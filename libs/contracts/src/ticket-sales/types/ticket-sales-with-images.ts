import { TicketSales, TicketSalesImage } from '@app/database';

type Image = Pick<TicketSalesImage, 'id' | 'url'>;

export interface TicketSalesWithImages extends TicketSales {
  images: Image[];
}
