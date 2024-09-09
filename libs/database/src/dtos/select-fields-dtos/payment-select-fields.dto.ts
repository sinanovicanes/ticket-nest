import { paymentSchema } from '@app/database/schemas';
import { TableFields } from '@app/database/types';
import { IsOptional } from 'class-validator';

export class PaymentSelectFieldsDto
  implements Partial<TableFields<typeof paymentSchema>>
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

  constructor(partial?: Partial<PaymentSelectFieldsDto>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
