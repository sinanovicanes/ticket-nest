import {
  PaymentSelectFieldsDto,
  TicketSalesSelectFieldsDto,
} from '@app/database/dtos';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

enum OrderOptions {
  ASC = 'ASC',
  DESC = 'DESC',
}

enum OrderByFields {
  payment = 'payment',
  defaultPrice = 'defaultPrice',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

export class FindPaymentOptionsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @IsOptional()
  @IsEnum(OrderOptions)
  order: OrderOptions = OrderOptions.ASC;

  // Transform the value to an array if it's not already
  // This is useful when the value is passed as a query parameter
  // e.g. orderByFields=name,date
  @Transform(({ value }) => (Array.isArray(value) ? value : value.split(',')))
  @IsOptional()
  @IsEnum(OrderByFields, { each: true })
  orderByFields: OrderByFields[] = [OrderByFields.payment];

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  eventId?: string;

  @IsOptional()
  @IsString()
  salesId?: string;

  @IsOptional()
  @IsString()
  ticketId?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  minPayment?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  maxPayment?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => PaymentSelectFieldsDto)
  selectFields: PaymentSelectFieldsDto = new PaymentSelectFieldsDto();
}
