import {
  CreateEventDto,
  FindEventsOptionsDto,
  UpdateEventDto,
} from '@app/contracts/events';
import { Database, event, InjectDB, location } from '@app/database';
import { Injectable } from '@nestjs/common';
import { asc, between, desc, eq, ilike, or } from 'drizzle-orm';

@Injectable()
export class EventsService {
  @InjectDB() private readonly db: Database;

  async findOne(id: string) {
    const results = await this.db.select().from(event).where(eq(event.id, id));
    return results[0];
  }

  async findMany(options: FindEventsOptionsDto) {
    const {
      page,
      limit,
      startDate,
      endDate,
      order,
      orderByFields,
      search,
      searchFields,
    } = options;
    const offset = (page - 1) * limit;

    const dbQuery = this.db
      .select({
        id: event.id,
        name: event.name,
        description: event.description,
        date: event.date,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
        location: {
          name: location.name,
          city: location.city,
          province: location.province,
          address: location.address,
          address2: location.address2,
        },
      })
      .from(event)
      .leftJoin(location, eq(event.locationId, location.id))
      .offset(offset)
      .limit(limit);

    if (startDate && endDate) {
      dbQuery.where(between(event.date, startDate, endDate));
    }

    if (search) {
      const searchConditions = searchFields.map((field) =>
        ilike(event[field], `%${search}%`),
      );

      dbQuery.where(or(...searchConditions));
    }

    const orderByColumns = orderByFields.map((orderBy) =>
      order == 'ASC' ? asc(event[orderBy]) : desc(event[orderBy]),
    );

    dbQuery.orderBy(...orderByColumns);

    return await dbQuery;
  }

  async create(dto: CreateEventDto) {
    return await this.db.insert(event).values(dto).returning();
  }

  async updateOne(id: string, dto: UpdateEventDto) {
    const results = await this.db
      .update(event)
      .set(dto)
      .where(eq(event.id, id))
      .returning();

    return results.pop() ?? null;
  }

  async delete(id: string) {
    const result = await this.db
      .delete(event)
      .where(eq(event.id, id))
      .returning()[0];
    return result ?? null;
  }
}
