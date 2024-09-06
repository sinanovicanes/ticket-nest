import { IsNotEmpty, IsString } from 'class-validator';

export class FindOnePaymentMessageDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
