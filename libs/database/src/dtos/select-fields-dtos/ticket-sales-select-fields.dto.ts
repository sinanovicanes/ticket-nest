import { Transform, Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { EventSelectFieldsDto } from './event-select-fields.dto';
import { ticketSales } from '@app/database/schemas';
import { TableFields } from '@app/database/types';

export class TicketSalesSelectFieldsDto
  implements Partial<Omit<TableFields<typeof ticketSales>, 'eventId'>>
{
  @IsOptional()
  id?: boolean;
  @IsOptional()
  name?: boolean;
  @IsOptional()
  description?: boolean;
  @IsOptional()
  price?: boolean;
  @IsOptional()
  quantity?: boolean;
  @IsOptional()
  createdAt?: boolean;
  @IsOptional()
  updatedAt?: boolean;
  @IsOptional()
  @ValidateNested()
  @Type(() => EventSelectFieldsDto)
  @Transform(({ value }) =>
    value === true ? new EventSelectFieldsDto() : value,
  )
  event?: EventSelectFieldsDto;

  constructor(partial?: Partial<TicketSalesSelectFieldsDto>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
