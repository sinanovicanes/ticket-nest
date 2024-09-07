import { IsObject, IsUUID } from 'class-validator';

export class UploadEventImageDto {
  @IsUUID()
  eventId: string;

  @IsObject()
  file: Express.Multer.File;
}
