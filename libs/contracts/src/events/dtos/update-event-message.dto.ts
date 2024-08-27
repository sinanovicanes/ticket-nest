import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateEventDto } from './update-event.dto';
import { Type } from 'class-transformer';

export class UpdateEventMessageDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsObject()
  @ValidateNested()
  @Type(() => UpdateEventDto)
  dto: UpdateEventDto;
}
