import { Type } from 'class-transformer';
import { IsInt, Min, ValidateNested } from 'class-validator';
import { CreateTicketDto } from './create-ticket.dto';

export class CreateTicketDuplicatesMessageDto {
  @ValidateNested()
  @Type(() => CreateTicketDto)
  dto: CreateTicketDto;

  @IsInt()
  @Min(1)
  quantity: number;
}
