import { ticket } from '@app/database/schemas';
import { TableFields } from '@app/database/types';
import { Transform, Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { TicketSalesSelectFieldsDto } from './ticket-sales-select-fields.dto';
import { EventSelectFieldsDto } from './event-select-fields.dto';

export class TicketSelectFieldsDto
  implements Omit<TableFields<typeof ticket>, 'eventId' | 'ticketSalesId'>
{
  @IsOptional()
  id: boolean;
  @IsOptional()
  ownerEmail: boolean;
  @IsOptional()
  status: boolean;
  @IsOptional()
  createdAt: boolean;
  @IsOptional()
  updatedAt: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => TicketSalesSelectFieldsDto)
  @Transform(({ value }) =>
    value === true ? TicketSalesSelectFieldsDto.default() : value,
  )
  ticketSales: TicketSalesSelectFieldsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => EventSelectFieldsDto)
  @Transform(({ value }) =>
    value === true ? EventSelectFieldsDto.default() : value,
  )
  event: EventSelectFieldsDto;

  static default(): TicketSelectFieldsDto {
    return new TicketSelectFieldsDto({
      id: true,
      ownerEmail: true,
      status: true,
      event: EventSelectFieldsDto.default(),
      ticketSales: TicketSalesSelectFieldsDto.default(),
    });
  }

  constructor(partial: Partial<TicketSelectFieldsDto>) {
    Object.assign(this, partial);
  }
}
