import { IsOptional, ValidateNested } from 'class-validator';
import { LocationSelectFieldsDto } from './location-select-fields.dto';
import { Transform, Type } from 'class-transformer';
import { event } from '@app/database/schemas';
import { TableFields } from '@app/database/types';

export class EventSelectFieldsDto
  implements Omit<TableFields<typeof event>, 'locationId'>
{
  @IsOptional()
  id: boolean;
  @IsOptional()
  name: boolean;
  @IsOptional()
  description: boolean;
  @IsOptional()
  date: boolean;
  @IsOptional()
  createdAt: boolean;
  @IsOptional()
  updatedAt: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationSelectFieldsDto)
  @Transform(({ value }) =>
    value === true ? LocationSelectFieldsDto.default() : value,
  )
  location: LocationSelectFieldsDto;

  static default(): EventSelectFieldsDto {
    return new EventSelectFieldsDto({
      id: true,
      name: true,
      description: true,
      date: true,
    });
  }

  constructor(partial: Partial<EventSelectFieldsDto>) {
    Object.assign(this, partial);
  }
}
