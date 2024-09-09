import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateCheckoutDto {
  @IsUUID()
  ticketSalesId: string;

  @IsInt()
  @Min(1)
  quantity: number = 1;

  @IsEmail()
  email: string;
}
