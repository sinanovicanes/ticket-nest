import { location } from '@app/database/schemas';
import { TableFields } from '@app/database/types';
import { IsBoolean, IsOptional } from 'class-validator';

export class LocationSelectFieldsDto
  implements Partial<TableFields<typeof location>>
{
  @IsOptional()
  @IsBoolean()
  id?: boolean;
  @IsOptional()
  @IsBoolean()
  name?: boolean;
  @IsOptional()
  @IsBoolean()
  city?: boolean;
  @IsOptional()
  @IsBoolean()
  province?: boolean;
  @IsOptional()
  @IsBoolean()
  address?: boolean;
  @IsOptional()
  @IsBoolean()
  address2?: boolean;
  @IsOptional()
  @IsBoolean()
  createdAt?: boolean;
  @IsOptional()
  @IsBoolean()
  updatedAt?: boolean;

  constructor(partial?: Partial<LocationSelectFieldsDto>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
