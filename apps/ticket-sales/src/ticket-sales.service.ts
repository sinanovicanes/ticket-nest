import {
  CreateTicketSalesDto,
  FindTicketSalesOptionsDto,
  UpdateTicketSalesDto,
} from '@app/contracts/ticket-sales';
import {
  Database,
  eventSchema,
  InjectDB,
  SelectFieldsFactory,
  ticketSalesSchema,
  locationSchema,
  TicketSalesSelectFieldsDto,
} from '@app/database';
import { Injectable } from '@nestjs/common';
import { asc, between, desc, eq, gte, ilike, lte, or } from 'drizzle-orm';

@Injectable()
export class TicketSalesService {
  @InjectDB() private readonly db: Database;

  async findOne(id: string, selectFields: TicketSalesSelectFieldsDto) {
    const fields = SelectFieldsFactory.createFromDto(
      selectFields,
      ticketSalesSchema,
      {
        event: eventSchema,
        location: locationSchema,
      },
    );

    const query = this.db
      .select(fields)
      .from(ticketSalesSchema)
      .where(eq(ticketSalesSchema.id, id));

    if (selectFields.event) {
      query.leftJoin(
        eventSchema,
        eq(ticketSalesSchema.eventId, eventSchema.id),
      );
    }

    if (selectFields.event.location) {
      query.leftJoin(
        locationSchema,
        eq(eventSchema.locationId, locationSchema.id),
      );
    }

    const results = await query;

    return results.pop() ?? null;
  }

  async findMany(options: FindTicketSalesOptionsDto) {
    const {
      page,
      limit,
      startDate,
      endDate,
      order,
      orderByFields,
      search,
      searchFields,
      minPrice,
      maxPrice,
      eventId,
      selectFields,
    } = options;
    const offset = (page - 1) * limit;

    const fields = SelectFieldsFactory.createFromDto(
      selectFields,
      ticketSalesSchema,
      {
        event: eventSchema,
        location: locationSchema,
      },
    );

    const dbQuery = this.db
      .select(fields)
      .from(ticketSalesSchema)
      .leftJoin(eventSchema, eq(ticketSalesSchema.eventId, eventSchema.id))
      .leftJoin(locationSchema, eq(eventSchema.locationId, locationSchema.id))
      .offset(offset)
      .limit(limit);

    if (eventId) {
      dbQuery.where(eq(ticketSalesSchema.eventId, eventId));
    } else {
      // Only filter by date if eventId is not provided
      if (!eventId && startDate && endDate) {
        dbQuery.where(between(eventSchema.date, startDate, endDate));
      }
    }

    if (minPrice && maxPrice) {
      dbQuery.where(between(ticketSalesSchema.price, minPrice, maxPrice));
    } else if (minPrice) {
      dbQuery.where(gte(ticketSalesSchema.price, minPrice));
    } else if (maxPrice) {
      dbQuery.where(lte(ticketSalesSchema.price, maxPrice));
    }

    if (search) {
      const searchConditions = searchFields.map((field) =>
        ilike(ticketSalesSchema[field], `%${search}%`),
      );

      dbQuery.where(or(...searchConditions));
    }

    const orderByColumns = orderByFields.map((orderBy) =>
      order == 'ASC'
        ? asc(ticketSalesSchema[orderBy])
        : desc(ticketSalesSchema[orderBy]),
    );

    dbQuery.orderBy(...orderByColumns);

    return await dbQuery;
  }

  async create(dto: CreateTicketSalesDto) {
    return await this.db.insert(ticketSalesSchema).values(dto).returning();
  }

  async updateOne(id: string, dto: UpdateTicketSalesDto) {
    const results = await this.db
      .update(ticketSalesSchema)
      .set(dto)
      .where(eq(ticketSalesSchema.id, id))
      .returning();

    return results.pop() ?? null;
  }

  async delete(id: string) {
    const results = await this.db
      .delete(ticketSalesSchema)
      .where(eq(ticketSalesSchema.id, id))
      .returning();

    return results.pop() ?? null;
  }
}
