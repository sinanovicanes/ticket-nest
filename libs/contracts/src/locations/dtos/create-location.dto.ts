import { IsOptional, IsString, Length } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @Length(3, 255)
  name: string;

  @IsString()
  @Length(3, 255)
  city: string;

  @IsString()
  @Length(3, 255)
  province: string;

  @Length(3, 500)
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  @Length(3, 500)
  address2?: string;
}
