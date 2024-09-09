import {
  Database,
  InjectDB,
  TicketSalesImage,
  ticketSalesImageSchema,
} from '@app/database';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
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

  async removeImage(imageId: string): Promise<TicketSalesImage> {
    const results = await this.db
      .delete(ticketSalesImageSchema)
      .where(eq(ticketSalesImageSchema.id, imageId))
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
    await this.db
      .delete(ticketSalesImageSchema)
      .where(eq(ticketSalesImageSchema.url, url));
  }
}
