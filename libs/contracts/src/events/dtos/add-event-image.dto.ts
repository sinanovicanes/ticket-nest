import { IsUrl, IsUUID } from 'class-validator';

export class AddEventImageDto {
  @IsUUID()
  eventId: string;

  @IsUrl()
  url: string;
}
