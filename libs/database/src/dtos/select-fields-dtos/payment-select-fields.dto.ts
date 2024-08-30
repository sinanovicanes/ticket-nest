import { paymentSchema } from '@app/database/schemas';
import { TableFields } from '@app/database/types';
import { Transform, Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { DiscountSelectFieldsDto } from './discount-select-fields.dto';

export class PaymentSelectFieldsDto
  implements Partial<Omit<TableFields<typeof paymentSchema>, 'discountId'>>
{
  @IsOptional()
  id?: boolean;

  @IsOptional()
  total?: boolean;

  @IsOptional()
  email?: boolean;

  @IsOptional()
  status?: boolean;

  @IsOptional()
  ticketCount?: boolean;

  @IsOptional()
  checkoutSessionId?: boolean;

  @IsOptional()
  createdAt?: boolean;

  @IsOptional()
  updatedAt?: boolean;

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
