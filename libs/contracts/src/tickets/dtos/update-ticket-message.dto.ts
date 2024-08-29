import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateTicketDto } from './update-ticket.dto';

export class UpdateTicketMessageDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsObject()
  @ValidateNested()
  @Type(() => UpdateTicketDto)
  dto: UpdateTicketDto;
}
