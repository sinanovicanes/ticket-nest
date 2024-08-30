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

  @IsDate()
  @IsOptional()
  expiresAt?: number = Math.floor(Date.now() / 1000) + 30 * 60 * 24;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
