import {
  CreateEventDto,
  FindEventsOptionsDto,
  UpdateEventDto,
} from '@app/contracts/events';
import { Database, eventSchema, InjectDB, locationSchema } from '@app/database';
import { Injectable } from '@nestjs/common';
import { asc, between, desc, eq, ilike, or } from 'drizzle-orm';

@Injectable()
export class EventsService {
  @InjectDB() private readonly db: Database;

  async findOne(id: string) {
    const results = await this.db
      .select()
      .from(eventSchema)
      .where(eq(eventSchema.id, id));
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
        id: eventSchema.id,
        name: eventSchema.name,
        description: eventSchema.description,
        date: eventSchema.date,
        createdAt: eventSchema.createdAt,
        updatedAt: eventSchema.updatedAt,
        location: {
          name: locationSchema.name,
          city: locationSchema.city,
          province: locationSchema.province,
          address: locationSchema.address,
          address2: locationSchema.address2,
        },
      })
      .from(eventSchema)
      .leftJoin(locationSchema, eq(eventSchema.locationId, locationSchema.id))
      .offset(offset)
      .limit(limit);

    if (startDate && endDate) {
      dbQuery.where(between(eventSchema.date, startDate, endDate));
    }

    if (search) {
      const searchConditions = searchFields.map((field) =>
        ilike(eventSchema[field], `%${search}%`),
      );

      dbQuery.where(or(...searchConditions));
    }

    const orderByColumns = orderByFields.map((orderBy) =>
      order == 'ASC' ? asc(eventSchema[orderBy]) : desc(eventSchema[orderBy]),
    );

    dbQuery.orderBy(...orderByColumns);

    return await dbQuery;
  }

  async create(dto: CreateEventDto) {
    return await this.db.insert(eventSchema).values(dto).returning();
  }

  async updateOne(id: string, dto: UpdateEventDto) {
    const results = await this.db
      .update(eventSchema)
      .set(dto)
      .where(eq(eventSchema.id, id))
      .returning();

    return results.pop() ?? null;
  }

  async delete(id: string) {
    const result = await this.db
      .delete(eventSchema)
      .where(eq(eventSchema.id, id))
      .returning()[0];
    return result ?? null;
  }
}
