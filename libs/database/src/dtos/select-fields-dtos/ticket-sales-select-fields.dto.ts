import { Transform, Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { EventSelectFieldsDto } from './event-select-fields.dto';
import { ticketSales } from '@app/database/schemas';
import { TableFields } from '@app/database/types';

export class TicketSalesSelectFieldsDto
  implements Omit<TableFields<typeof ticketSales>, 'eventId'>
{
  @IsOptional()
  id: boolean;
  @IsOptional()
  name: boolean;
  @IsOptional()
  description: boolean;
  @IsOptional()
  price: boolean;
  @IsOptional()
  quantity: boolean;
  @IsOptional()
  createdAt: boolean;
  @IsOptional()
  updatedAt: boolean;
  @IsOptional()
  @ValidateNested()
  @Type(() => EventSelectFieldsDto)
  @Transform(({ value }) =>
    value === true ? EventSelectFieldsDto.default() : value,
  )
  event: EventSelectFieldsDto;

  static default() {
    return new TicketSalesSelectFieldsDto({
      id: true,
      name: true,
      description: true,
      price: true,
      event: EventSelectFieldsDto.default(),
    });
  }

  constructor(partial: Partial<TicketSalesSelectFieldsDto>) {
    Object.assign(this, partial);
  }
}
