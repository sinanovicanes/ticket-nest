import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @IsString()
  @IsNotEmpty()
  ticketSalesId: string;

  @IsString()
  @IsEmail()
  ownerEmail: string;
}
