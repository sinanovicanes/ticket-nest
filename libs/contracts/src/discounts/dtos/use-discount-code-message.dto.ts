import { IsInt, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';

export class UseDiscountCodeMessageDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsUUID()
  salesId: string;

  @IsInt()
  @Min(0)
  price: number;
}
