import { TicketSalesSelectFieldsDto } from '@app/database/dtos';
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
  status = 'status',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

export class FindTicketsOptionsDto {
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
  orderByFields: OrderByFields[] = [OrderByFields.status];

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
  paymentId?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  maxPrice?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => TicketSalesSelectFieldsDto)
  selectFields: TicketSalesSelectFieldsDto = new TicketSalesSelectFieldsDto();
}
