import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';

export class CreateTicketSalesDto {
  @IsString()
  @IsNotEmpty()
  eventId: string;
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  name: string;
  @IsString()
  @IsNotEmpty()
  @Length(3, 2000)
  description: string;
  @IsInt()
  @Min(1)
  @Max(1000000)
  quantity: number;
  @IsInt()
  @Min(1)
  @Max(1000000)
  price: number;
}
