import { TicketSalesSelectFieldsDto } from '@app/database';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class FindOneTicketSalesMessageDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsObject()
  @ValidateNested()
  @Type(() => TicketSalesSelectFieldsDto)
  selectFields: TicketSalesSelectFieldsDto;
}
