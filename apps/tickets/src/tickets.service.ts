import {
  CreateTicketDto,
  FindTicketOptionsDto,
  UpdateTicketDto,
} from '@app/contracts/tickets';
import {
  Database,
  eventSchema,
  InjectDB,
  locationSchema,
  SelectFieldsFactory,
  ticketSalesSchema,
  ticketSchema,
  TicketSelectFieldsDto,
} from '@app/database';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { asc, between, desc, eq, gte, lte } from 'drizzle-orm';

@Injectable()
export class TicketsService {
  @InjectDB() private readonly db: Database;

  async findOne(id: string, selectFields: TicketSelectFieldsDto) {
    const fields = SelectFieldsFactory.createFromDto(
      selectFields,
      ticketSchema,
      {
        event: eventSchema,
        sales: ticketSalesSchema,
        location: locationSchema,
      },
    );
    const query = this.db
      .select(fields)
      .from(ticketSchema)
      .where(eq(ticketSchema.id, id));

    if (selectFields.event) {
      query.leftJoin(eventSchema, eq(ticketSchema.eventId, eventSchema.id));
      if (selectFields.event.location) {
        query.leftJoin(
          locationSchema,
          eq(eventSchema.locationId, locationSchema.id),
        );
      }
    }

    if (selectFields.ticketSales) {
      query.leftJoin(
        ticketSalesSchema,
        eq(ticketSchema.ticketSalesId, ticketSalesSchema.id),
      );
    }

    const results = await query;
    const ticket = results.pop();

    // TODO: Add error handling
    if (!ticket) {
      return null;
    }

    return ticket;
  }

  async findMany(options: FindTicketOptionsDto) {
    const {
      page,
      limit,
      order,
      orderByFields,
      eventId,
      salesId,
      selectFields,
      startDate,
      endDate,
      minPrice,
      maxPrice,
    } = options;
    const offset = (page - 1) * limit;
    const fields = SelectFieldsFactory.createFromDto(
      selectFields,
      ticketSchema,
      {
        event: eventSchema,
        sales: ticketSalesSchema,
        location: locationSchema,
      },
    );

    const dbQuery = this.db
      .select(fields)
      .from(ticketSalesSchema)
      .leftJoin(eventSchema, eq(ticketSchema.eventId, eventSchema.id))
      .offset(offset)
      .limit(limit);

    if (eventId) {
      dbQuery.where(eq(ticketSchema.eventId, eventId));
    } else {
      // Only filter by date if eventId is not provided
      if (!eventId && startDate && endDate) {
        dbQuery.where(between(eventSchema.date, startDate, endDate));
      }
    }

    if (salesId) {
      dbQuery.where(eq(ticketSchema.ticketSalesId, salesId));

      if (minPrice && maxPrice) {
        dbQuery.where(between(ticketSalesSchema.price, minPrice, maxPrice));
      } else if (minPrice) {
        dbQuery.where(gte(ticketSalesSchema.price, minPrice));
      } else if (maxPrice) {
        dbQuery.where(lte(ticketSalesSchema.price, maxPrice));
      }
    }

    const orderByColumns = orderByFields.map((orderBy) =>
      order == 'ASC' ? asc(ticketSchema[orderBy]) : desc(ticketSchema[orderBy]),
    );

    dbQuery.orderBy(...orderByColumns);

    return await dbQuery;
  }

  async create(dto: CreateTicketDto) {
    const results = await this.db.insert(ticketSchema).values(dto).returning();
    const result = results.pop();

    if (!result) {
      throw new RpcException('Failed to create ticket');
    }

    return result;
  }

  async createMany(dtos: CreateTicketDto[]): Promise<string[]> {
    const results = await this.db
      .insert(ticketSchema)
      .values(dtos)
      .returning({ id: ticketSchema.id });

    return results.map((result) => result.id);
  }

  async createDuplicates(
    dto: CreateTicketDto,
    quantity: number,
  ): Promise<string[]> {
    const tickets = Array.from({ length: quantity }, () => dto);
    return await this.createMany(tickets);
  }

  async updateOne(id: string, dto: UpdateTicketDto) {
    const results = await this.db
      .update(ticketSchema)
      .set(dto)
      .where(eq(ticketSchema.id, id))
      .returning();

    return results.pop() ?? null;
  }

  async delete(id: string) {
    const results = await this.db
      .delete(ticketSchema)
      .where(eq(ticketSchema.id, id))
      .returning();

    return results.pop() ?? null;
  }
}
