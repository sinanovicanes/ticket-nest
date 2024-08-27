import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateTicketSalesDto } from './update-ticket-sales.dto';
import { Type } from 'class-transformer';

export class UpdateTicketSalesMessageDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsObject()
  @ValidateNested()
  @Type(() => UpdateTicketSalesDto)
  dto: UpdateTicketSalesDto;
}
