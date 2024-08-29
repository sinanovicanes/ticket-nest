import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateDiscountDto } from './update-discount.dto';

export class UpdateDiscountMessageDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsObject()
  @ValidateNested()
  @Type(() => UpdateDiscountDto)
  dto: UpdateDiscountDto;
}
