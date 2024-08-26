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
} from 'class-validator';

enum OrderOptions {
  ASC = 'ASC',
  DESC = 'DESC',
}

enum OrderByFields {
  name = 'name',
  date = 'date',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

enum SearchFields {
  name = 'name',
  date = 'date',
  description = 'description',
}

export class FindEventsOptionsDto {
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

  @IsString()
  @Length(3, 255)
  @IsOptional()
  search?: string;

  // Transform the value to an array if it's not already
  // This is useful when the value is passed as a query parameter
  // e.g. searchFields=name,date
  @Transform(({ value }) => (Array.isArray(value) ? value : value.split(',')))
  @IsOptional()
  @IsEnum(SearchFields, { each: true })
  searchFields: SearchFields[] = [SearchFields.name];

  @IsOptional()
  @IsEnum(OrderOptions)
  order: OrderOptions = OrderOptions.ASC;

  // Transform the value to an array if it's not already
  // This is useful when the value is passed as a query parameter
  // e.g. orderBy=name,date
  @Transform(({ value }) => (Array.isArray(value) ? value : value.split(',')))
  @IsOptional()
  @IsEnum(OrderByFields, { each: true })
  orderByFields: OrderByFields[] = [OrderByFields.date];

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
