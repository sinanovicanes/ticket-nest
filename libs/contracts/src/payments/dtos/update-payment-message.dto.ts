import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdatePaymentDto } from './update-payment.dto';

export class UpdatePaymentMessageDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsObject()
  @ValidateNested()
  @Type(() => UpdatePaymentDto)
  dto: UpdatePaymentDto;
}
