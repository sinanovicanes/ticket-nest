import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindByDiscountCodeMessageDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsUUID()
  salesId: string;
}
