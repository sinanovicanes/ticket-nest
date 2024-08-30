import {
  IsDate,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
export class CreateStripeCheckoutDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @Min(0)
  unitPrice: number;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, string>;
}
