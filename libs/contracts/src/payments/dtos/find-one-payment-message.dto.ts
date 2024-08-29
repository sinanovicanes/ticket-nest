import { PaymentSelectFieldsDto } from '@app/database';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class FindOnePaymentMessageDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsObject()
  @ValidateNested()
  @Type(() => PaymentSelectFieldsDto)
  selectFields: PaymentSelectFieldsDto;
}
