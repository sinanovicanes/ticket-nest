import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ValidateDiscountCodeMessageDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsUUID()
  salesId: string;
}
