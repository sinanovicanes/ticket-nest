import { IsUrl } from 'class-validator';

export class DeleteTicketSalesImageDto {
  @IsUrl()
  url: string;
}
