import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateEventDto {
  @IsUUID()
  locationId: string;
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
}
