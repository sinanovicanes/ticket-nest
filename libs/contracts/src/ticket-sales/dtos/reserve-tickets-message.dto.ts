import { IsInt, IsUUID, Min } from 'class-validator';

export class ReserveTicketsMessageDto {
  @IsUUID()
  id: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
