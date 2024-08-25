import { CreateEventDto, UpdateEventDto } from '@app/contracts/events';
import { Database, event, InjectDB } from '@app/database';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class EventsService {
  @InjectDB() private readonly db: Database;

  async findOne(id: number) {
    const results = await this.db.select().from(event).where(eq(event.id, id));
    return results[0];
  }

  async findMany(page?: number, limit: number = 10) {
    if (!page) {
      return await this.db.select().from(event);
    }

    const offset = (page - 1) * limit;

    return await this.db.select().from(event).offset(offset).limit(limit);
  }

  async create(dto: CreateEventDto) {
    return await this.db.insert(event).values(dto).returning();
  }

  async update(dto: UpdateEventDto) {
    return await this.db.update(event).set(dto).returning();
  }

  async delete(id: number) {
    const result = await this.db
      .delete(event)
      .where(eq(event.id, id))
      .returning()[0];
    return result ?? null;
  }
}
