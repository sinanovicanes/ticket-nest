import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  checkoutSessionId: string;

  @IsEmail()
  email: string;

  @IsInt()
  @Min(0)
  total: number;

  @IsInt()
  @Min(1)
  ticketCount: number;

  @IsOptional()
  @IsUUID()
  discountId?: string;
}
