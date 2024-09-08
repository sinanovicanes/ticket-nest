import { Database, eventImageSchema, InjectDB } from '@app/database';
import { Injectable } from '@nestjs/common';
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

  async removeImage(url: string) {
    await this.db.delete(eventImageSchema).where(eq(eventImageSchema.url, url));
  }
}
