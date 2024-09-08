import { IsUrl, IsUUID } from 'class-validator';

export class AddTicketSalesImageDto {
  @IsUUID()
  ticketSalesId: string;

  @IsUrl()
  url: string;
}
