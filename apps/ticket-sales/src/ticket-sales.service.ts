import {
  AvailableTicketSales,
  CreateTicketSalesDto,
  FindTicketSalesOptionsDto,
  ReleaseTicketSalesResponse,
  TicketSalesWithEventDetails,
  TicketSalesWithImages,
  UpdateTicketSalesDto,
} from '@app/contracts/ticket-sales';
import {
  Database,
  eventSchema,
  InjectDB,
  locationSchema,
  TicketSales,
  ticketSalesImageSchema,
  ticketSalesSchema,
  ticketSchema,
} from '@app/database';
import {
  decrement,
  getOffset,
  increment,
  jsonAggBuildObject,
} from '@app/database/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { and, asc, between, desc, eq, gte, ilike, lte, or } from 'drizzle-orm';

@Injectable()
export class TicketSalesService {
  @InjectDB() private readonly db: Database;

  async findOne(id: string): Promise<TicketSalesWithImages> {
    const results = await this.db
      .select({
        id: ticketSalesSchema.id,
        price: ticketSalesSchema.price,
        quantity: ticketSalesSchema.quantity,
        name: ticketSalesSchema.name,
        description: ticketSalesSchema.description,
        sold: ticketSalesSchema.sold,
        createdAt: ticketSalesSchema.createdAt,
        updatedAt: ticketSalesSchema.updatedAt,
        eventId: ticketSalesSchema.eventId,
        images: jsonAggBuildObject({
          id: ticketSalesImageSchema.id,
          url: ticketSalesImageSchema.url,
        }),
      })
      .from(ticketSalesSchema)
      .leftJoin(
        ticketSalesImageSchema,
        eq(ticketSalesSchema.id, ticketSalesImageSchema.ticketSalesId),
      )
      .groupBy(ticketSalesSchema.id)
      .where(eq(ticketSalesSchema.id, id));

    const result = results.pop();

    if (!result) {
      throw new RpcException(new NotFoundException('Ticket sales not found'));
    }

    return result;
  }

  async findOneWithEventDetails(
    id: string,
  ): Promise<TicketSalesWithEventDetails> {
    const results = await this.db
      .select({
        id: ticketSalesSchema.id,
        price: ticketSalesSchema.price,
        quantity: ticketSalesSchema.quantity,
        name: ticketSalesSchema.name,
        description: ticketSalesSchema.description,
        createdAt: ticketSalesSchema.createdAt,
        event: {
          id: eventSchema.id,
          date: eventSchema.date,
          name: eventSchema.name,
          description: eventSchema.description,
        },
        location: {
          id: locationSchema.id,
          name: locationSchema.name,
          address: locationSchema.address,
          address2: locationSchema.address2,
          city: locationSchema.city,
          province: locationSchema.province,
        },
        images: jsonAggBuildObject({
          id: ticketSalesImageSchema.id,
          url: ticketSalesImageSchema.url,
        }),
      })
      .from(ticketSalesSchema)
      .leftJoin(eventSchema, eq(ticketSalesSchema.eventId, eventSchema.id))
      .leftJoin(locationSchema, eq(eventSchema.locationId, locationSchema.id))
      .leftJoin(
        ticketSalesImageSchema,
        eq(ticketSalesSchema.id, ticketSalesImageSchema.ticketSalesId),
      )
      .groupBy(ticketSalesSchema.id)
      .where(eq(ticketSalesSchema.id, id));

    const result = results.pop();

    if (!result) {
      throw new RpcException(new NotFoundException('Ticket sales not found'));
    }

    return result;
  }

  async findMany(
    options: FindTicketSalesOptionsDto,
  ): Promise<TicketSalesWithImages[]> {
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
    } = options;
    const offset = getOffset(page, limit);
    const dbQuery = this.db
      .select({
        id: ticketSalesSchema.id,
        price: ticketSalesSchema.price,
        quantity: ticketSalesSchema.quantity,
        name: ticketSalesSchema.name,
        description: ticketSalesSchema.description,
        sold: ticketSalesSchema.sold,
        createdAt: ticketSalesSchema.createdAt,
        updatedAt: ticketSalesSchema.updatedAt,
        eventId: ticketSalesSchema.eventId,
        images: jsonAggBuildObject({
          id: ticketSalesImageSchema.id,
          url: ticketSalesImageSchema.url,
        }),
      })
      .from(ticketSalesSchema)
      .leftJoin(
        ticketSalesImageSchema,
        eq(ticketSalesSchema.id, ticketSalesImageSchema.ticketSalesId),
      )
      .groupBy(ticketSalesSchema.id)
      .offset(offset)
      .limit(limit);

    if (eventId) {
      dbQuery.where(eq(ticketSalesSchema.eventId, eventId));
    } else {
      // Only filter by date if eventId is not provided
      if (!eventId && startDate && endDate) {
        dbQuery.leftJoin(
          eventSchema,
          eq(ticketSalesSchema.eventId, eventSchema.id),
        );
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

  async reserveTickets(id: string, quantity: number) {
    const results = await this.db
      .update(ticketSalesSchema)
      .set({
        sold: increment(ticketSalesSchema.sold, quantity),
      })
      .where(eq(ticketSalesSchema.id, id))
      .returning({ sold: ticketSalesSchema.sold });

    const result = results.pop();

    if (!result) {
      throw new RpcException(new NotFoundException('Ticket sales not found'));
    }

    return result;
  }

  async releaseTickets(
    id: string,
    quantity: number,
  ): Promise<ReleaseTicketSalesResponse> {
    const results = await this.db
      .update(ticketSalesSchema)
      .set({
        sold: decrement(ticketSalesSchema.sold, quantity),
      })
      .where(eq(ticketSalesSchema.id, id))
      .returning({ sold: ticketSalesSchema.sold });

    const result = results.pop();

    if (!result) {
      throw new RpcException(new NotFoundException('Ticket sales not found'));
    }

    return result;
  }

  async findByIdIfAvailable(id: string): Promise<AvailableTicketSales> {
    const results = await this.db
      .select({
        id: ticketSalesSchema.id,
        price: ticketSalesSchema.price,
        quantity: ticketSalesSchema.quantity,
        name: ticketSalesSchema.name,
        description: ticketSalesSchema.description,
        event: {
          id: eventSchema.id,
          date: eventSchema.date,
          name: eventSchema.name,
        },
      })
      .from(ticketSalesSchema)
      .leftJoin(eventSchema, eq(ticketSalesSchema.eventId, eventSchema.id))
      .leftJoin(
        ticketSchema,
        eq(ticketSalesSchema.id, ticketSchema.ticketSalesId),
      )
      .groupBy(ticketSalesSchema.id, eventSchema.id)
      .where(
        and(
          eq(ticketSalesSchema.id, id),
          gte(eventSchema.date, new Date().toISOString()),
        ),
      );
    const ticketSales = results.pop();

    if (!ticketSales) {
      throw new RpcException(new NotFoundException('Ticket sales not found'));
    }

    return ticketSales;
  }

  async create(dto: CreateTicketSalesDto): Promise<TicketSales> {
    const results = await this.db
      .insert(ticketSalesSchema)
      .values(dto)
      .returning();

    const result = results.pop();

    if (!result) {
      throw new RpcException("Couldn't create ticket sales");
    }

    return result;
  }

  async updateOne(id: string, dto: UpdateTicketSalesDto): Promise<TicketSales> {
    const results = await this.db
      .update(ticketSalesSchema)
      .set(dto)
      .where(eq(ticketSalesSchema.id, id))
      .returning();

    return results.pop() ?? null;
  }

  async delete(id: string): Promise<TicketSales> {
    const results = await this.db
      .delete(ticketSalesSchema)
      .where(eq(ticketSalesSchema.id, id))
      .returning();

    const result = results.pop();

    if (!result) {
      throw new RpcException(new NotFoundException('Ticket sales not found'));
    }

    return result;
  }
}
