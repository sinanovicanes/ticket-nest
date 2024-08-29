import { paymentSchema } from '@app/database/schemas';
import { TableFields } from '@app/database/types';
import { Transform, Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { DiscountSelectFieldsDto } from './discount-select-fields.dto';
import { TicketSelectFieldsDto } from './ticket-select-fields.dto';

export class PaymentSelectFieldsDto
  implements Omit<TableFields<typeof paymentSchema>, 'ticketId' | 'discountId'>
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
  @Type(() => DiscountSelectFieldsDto)
  @Transform(({ value }) =>
    value === true ? new DiscountSelectFieldsDto() : value,
  )
  discount?: DiscountSelectFieldsDto;

  constructor(partial?: Partial<PaymentSelectFieldsDto>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
