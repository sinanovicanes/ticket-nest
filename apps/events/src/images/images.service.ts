import {
  Database,
  EventImage,
  eventImageSchema,
  InjectDB,
} from '@app/database';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { eq } from 'drizzle-orm';

@Injectable()
export class ImagesService {
  constructor(@InjectDB() private readonly db: Database) {}

  async addImage(eventId: string, url: string) {
    await this.db.insert(eventImageSchema).values({
      eventId,
      url,
    });
  }

  async removeImage(imageId: string): Promise<EventImage> {
    const results = await this.db
      .delete(eventImageSchema)
      .where(eq(eventImageSchema.id, imageId))
      .returning();
    const result = results.pop();

    if (!result) {
      throw new RpcException(
        new NotFoundException(`Image with id ${imageId} not found`),
      );
    }

    return result;
  }

  async removeImageByURL(url: string) {
    await this.db.delete(eventImageSchema).where(eq(eventImageSchema.url, url));
  }
}
