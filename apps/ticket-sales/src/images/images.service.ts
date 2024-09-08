import { Database, ticketSalesImageSchema, InjectDB } from '@app/database';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class ImagesService {
  constructor(@InjectDB() private readonly db: Database) {}

  async addImage(ticketSalesId: string, url: string) {
    await this.db.insert(ticketSalesImageSchema).values({
      ticketSalesId,
      url,
    });
  }

  async removeImage(url: string) {
    await this.db
      .delete(ticketSalesImageSchema)
      .where(eq(ticketSalesImageSchema.url, url));
  }
}
