import { IsOptional, ValidateNested } from 'class-validator';
import { LocationSelectFieldsDto } from './location-select-fields.dto';
import { Transform, Type } from 'class-transformer';
import { discountCodeSchema, eventSchema } from '@app/database/schemas';
import { TableFields } from '@app/database/types';
import { TicketSalesSelectFieldsDto } from './ticket-sales-select-fields.dto';

export class DiscountCodeSelectFieldsDto
  implements Omit<TableFields<typeof discountCodeSchema>, 'ticketSalesId'>
{
  @IsOptional()
  id: boolean;
  @IsOptional()
  kind: boolean;
  @IsOptional()
  amount: boolean;
  @IsOptional()
  code: boolean;
  @IsOptional()
  maxUsage: boolean;
  @IsOptional()
  expiresAt: boolean;
  @IsOptional()
  createdAt: boolean;
  @IsOptional()
  updatedAt: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => TicketSalesSelectFieldsDto)
  @Transform(({ value }) =>
    value === true ? new TicketSalesSelectFieldsDto() : value,
  )
  ticketSales?: TicketSalesSelectFieldsDto;

  constructor(partial?: Partial<DiscountCodeSelectFieldsDto>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
