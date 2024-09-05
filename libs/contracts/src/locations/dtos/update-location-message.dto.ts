import { Type } from 'class-transformer';
import { IsUUID, ValidateNested } from 'class-validator';
import { UpdateLocationDto } from './update-location.dto';

export class UpdateLocationMessageDto {
  @IsUUID()
  id: string;

  @ValidateNested()
  @Type(() => UpdateLocationDto)
  dto: UpdateLocationDto;
}
