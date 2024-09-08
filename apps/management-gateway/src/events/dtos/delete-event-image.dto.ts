import { IsUrl } from 'class-validator';

export class DeleteEventImageDto {
  @IsUrl()
  url: string;
}
