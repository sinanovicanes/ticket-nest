import { IsEmail, IsString, IsUUID } from 'class-validator';

export class CreateTicketDto {
  @IsUUID()
  eventId: string;

  @IsUUID()
  ticketSalesId: string;

  @IsString()
  @IsEmail()
  ownerEmail: string;
}
