import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class StripeCheckoutDto {
  @IsUUID()
  ticketSalesId: string;

  @IsInt()
  @Min(1)
  quantity: number = 1;

  @IsOptional()
  @IsString()
  discountCode?: string;

  @IsEmail()
  email: string;
}
