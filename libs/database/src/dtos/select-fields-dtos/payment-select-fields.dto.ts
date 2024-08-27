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
    value === true ? TicketSelectFieldsDto.default() : value,
  )
  ticket: TicketSelectFieldsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DiscountCodeSelectFieldsDto)
  @Transform(({ value }) =>
    value === true ? DiscountCodeSelectFieldsDto.default() : value,
  )
  discountCode: DiscountCodeSelectFieldsDto;

  static default(): PaymentSelectFieldsDto {
    return new PaymentSelectFieldsDto({
      id: true,
      defaultPrice: true,
      payment: true,
      ticket: TicketSelectFieldsDto.default(),
      discountCode: DiscountCodeSelectFieldsDto.default(),
    });
  }

  constructor(partial: Partial<PaymentSelectFieldsDto>) {
    Object.assign(this, partial);
  }
}
