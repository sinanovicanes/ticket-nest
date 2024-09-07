import { Database, eventImageSchema, InjectDB } from '@app/database';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';

@Injectable()
export class ImagesService {
  constructor(@InjectDB() private readonly db: Database) {}

  async generateUUID(): Promise<string> {
    const uuid = randomUUID();
    const results = await this.db
      .select({ id: eventImageSchema.id })
      .from(eventImageSchema)
      .where(eq(eventImageSchema.id, uuid));
    const isExist = results.length > 0;

    if (isExist) {
      return this.generateUUID();
    }

    return uuid;
  }

  async saveImageWithId(id: string, eventId: string, url: string) {
    await this.db.insert(eventImageSchema).values({
      id,
      eventId,
      url,
    });
  }

  async deleteImageByURL(url: string) {
    await this.db.delete(eventImageSchema).where(eq(eventImageSchema.url, url));
  }
}
