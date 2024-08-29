import { IsInt, IsOptional, IsUUID, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsUUID()
  ticketId: string;

  @IsOptional()
  @IsUUID()
  discountId?: string;

  @IsInt()
  @Min(0)
  defaultPrice: number;

  @IsInt()
  @Min(0)
  payment: number;
}
