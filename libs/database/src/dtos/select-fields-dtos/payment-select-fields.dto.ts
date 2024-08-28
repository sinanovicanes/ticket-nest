import { payment } from '@app/database/schemas';
import { TableFields } from '@app/database/types';
import { Transform, Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { DiscountCodeSelectFieldsDto } from './discount-code-select-fields.dto';
import { TicketSelectFieldsDto } from './ticket-select-fields.dto';

export class PaymentSelectFieldsDto
  implements Omit<TableFields<typeof payment>, 'ticketId' | 'discountId'>
{
  @IsOptional()
  id: boolean;
  @IsOptional()
  defaultPrice: boolean;
  @IsOptional()
  payment: boolean;

  @IsOptional()
  createdAt: boolean;
  @IsOptional()
  updatedAt: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => TicketSelectFieldsDto)
  @Transform(({ value }) =>
    value === true ? new TicketSelectFieldsDto() : value,
  )
  ticket?: TicketSelectFieldsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DiscountCodeSelectFieldsDto)
  @Transform(({ value }) =>
    value === true ? new DiscountCodeSelectFieldsDto() : value,
  )
  discountCode?: DiscountCodeSelectFieldsDto;

  constructor(partial?: Partial<PaymentSelectFieldsDto>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
