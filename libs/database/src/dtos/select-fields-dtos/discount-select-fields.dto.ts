import { discountSchema } from '@app/database/schemas';
import { TableFields } from '@app/database/types';
import { Transform, Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { TicketSalesSelectFieldsDto } from './ticket-sales-select-fields.dto';

export class DiscountSelectFieldsDto
  implements Omit<TableFields<typeof discountSchema>, 'ticketSalesId'>
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

  constructor(partial?: Partial<DiscountSelectFieldsDto>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
