import { IsOptional, ValidateNested } from 'class-validator';
import { LocationSelectFieldsDto } from './location-select-fields.dto';
import { Transform, Type } from 'class-transformer';
import { discountCode, event } from '@app/database/schemas';
import { TableFields } from '@app/database/types';
import { TicketSalesSelectFieldsDto } from './ticket-sales-select-fields.dto';

export class DiscountCodeSelectFieldsDto
  implements Omit<TableFields<typeof discountCode>, 'ticketSalesId'>
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
    value === true ? TicketSalesSelectFieldsDto.default() : value,
  )
  ticketSales: TicketSalesSelectFieldsDto;

  static default(): DiscountCodeSelectFieldsDto {
    return new DiscountCodeSelectFieldsDto({
      id: true,
      kind: true,
      amount: true,
      code: true,
      maxUsage: true,
      expiresAt: true,
      ticketSales: TicketSalesSelectFieldsDto.default(),
    });
  }

  constructor(partial: Partial<DiscountCodeSelectFieldsDto>) {
    Object.assign(this, partial);
  }
}
