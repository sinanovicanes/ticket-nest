import { TicketSelectFieldsDto } from '@app/database';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class FindOneTicketMessageDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsObject()
  @ValidateNested()
  @Type(() => TicketSelectFieldsDto)
  selectFields: TicketSelectFieldsDto;
}
