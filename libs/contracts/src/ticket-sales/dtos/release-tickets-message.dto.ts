import { IsInt, IsUUID, Min } from 'class-validator';

export class ReleaseTicketsMessageDto {
  @IsUUID()
  id: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
