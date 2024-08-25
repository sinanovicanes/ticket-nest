import { IsDateString, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  name: string;
  @IsString()
  @IsNotEmpty()
  @Length(3, 2000)
  description: string;
  @IsDateString()
  date: string;
  @IsString()
  @IsNotEmpty()
  @Length(5, 500)
  location: string;
}
