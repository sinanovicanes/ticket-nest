import { location } from '@app/database/schemas';
import { TableFields } from '@app/database/types';
import { IsOptional } from 'class-validator';

export class LocationSelectFieldsDto implements TableFields<typeof location> {
  @IsOptional()
  id: boolean;
  @IsOptional()
  name: boolean;
  @IsOptional()
  city: boolean;
  @IsOptional()
  province: boolean;
  @IsOptional()
  address: boolean;
  @IsOptional()
  address2: boolean;
  @IsOptional()
  createdAt: boolean;
  @IsOptional()
  updatedAt: boolean;

  static default(): LocationSelectFieldsDto {
    return new LocationSelectFieldsDto({
      id: true,
      name: true,
      city: true,
      province: true,
      address: true,
      address2: true,
    });
  }

  constructor(partial: Partial<LocationSelectFieldsDto>) {
    Object.assign(this, partial);
  }
}
