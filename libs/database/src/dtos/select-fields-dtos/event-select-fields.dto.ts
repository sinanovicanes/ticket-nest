import { IsOptional, ValidateNested } from 'class-validator';
import { LocationSelectFieldsDto } from './location-select-fields.dto';
import { Transform, Type } from 'class-transformer';
import { event } from '@app/database/schemas';
import { TableFields } from '@app/database/types';

export class EventSelectFieldsDto
  implements Partial<Omit<TableFields<typeof event>, 'locationId'>>
{
  @IsOptional()
  id?: boolean;
  @IsOptional()
  name?: boolean;
  @IsOptional()
  description?: boolean;
  @IsOptional()
  date?: boolean;
  @IsOptional()
  createdAt?: boolean;
  @IsOptional()
  updatedAt?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationSelectFieldsDto)
  @Transform(({ value }) =>
    value === true ? new LocationSelectFieldsDto() : value,
  )
  location?: LocationSelectFieldsDto;

  constructor(partial?: Partial<EventSelectFieldsDto>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
