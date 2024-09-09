import { PaymentStatus } from '@app/database';
import {
  IsEmail,
  IsEnum,
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

  @IsUUID()
  ticketSalesId: string;

  @IsEmail()
  email: string;

  @IsInt()
  @Min(0)
  total: number;

  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @IsInt()
  @Min(1)
  ticketCount: number;
}
