import { DiscountKind } from '@app/database';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateDiscountDto {
  @IsUUID()
  ticketSalesId: string;

  @IsEnum(DiscountKind)
  kind: DiscountKind;

  @IsInt()
  @Min(0)
  amount: number;

  @IsInt()
  @Min(1)
  maxUsage: number;

  @IsDateString()
  expiresAt: string;

  @IsString()
  code: string;
}
