import {
  CreateTicketSalesDto,
  FindTicketSalesOptionsDto,
  UpdateTicketSalesDto,
} from '@app/contracts/ticket-sales';
import { Database, event, InjectDB, ticketSales } from '@app/database';
import { Injectable } from '@nestjs/common';
import { asc, between, desc, eq, gte, ilike, lte, or } from 'drizzle-orm';

@Injectable()
export class TicketSalesService {
  @InjectDB() private readonly db: Database;

  async findOne(id: string) {
    const results = await this.db
      .select()
      .from(ticketSales)
      .where(eq(ticketSales.id, id));
    return results.pop();
  }

  // TODO: Add find options
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
    } = options;
    const offset = (page - 1) * limit;

    const dbQuery = this.db
      .select({
        id: ticketSales.id,
        name: ticketSales.name,
        description: ticketSales.description,
        price: ticketSales.price,
        event: {
          id: event.id,
          name: event.name,
          description: event.description,
          date: event.date,
          createdAt: event.createdAt,
          updatedAt: event.updatedAt,
        },
      })
      .from(ticketSales)
      .leftJoin(event, eq(ticketSales.eventId, event.id))
      .offset(offset)
      .limit(limit);

    if (eventId) {
      dbQuery.where(eq(ticketSales.eventId, eventId));
    } else {
      // Only filter by date if eventId is not provided
      if (!eventId && startDate && endDate) {
        dbQuery.where(between(event.date, startDate, endDate));
      }
    }

    if (minPrice && maxPrice) {
      dbQuery.where(between(ticketSales.price, minPrice, maxPrice));
    } else if (minPrice) {
      dbQuery.where(gte(ticketSales.price, minPrice));
    } else if (maxPrice) {
      dbQuery.where(lte(ticketSales.price, maxPrice));
    }

    if (search) {
      const searchConditions = searchFields.map((field) =>
        ilike(ticketSales[field], `%${search}%`),
      );

      dbQuery.where(or(...searchConditions));
    }

    const orderByColumns = orderByFields.map((orderBy) =>
      order == 'ASC' ? asc(ticketSales[orderBy]) : desc(ticketSales[orderBy]),
    );

    dbQuery.orderBy(...orderByColumns);

    return await dbQuery;
  }

  async create(dto: CreateTicketSalesDto) {
    return await this.db.insert(ticketSales).values(dto).returning();
  }

  async updateOne(id: string, dto: UpdateTicketSalesDto) {
    const results = await this.db
      .update(ticketSales)
      .set(dto)
      .where(eq(ticketSales.id, id))
      .returning();

    return results.pop() ?? null;
  }

  async delete(id: string) {
    const results = await this.db
      .delete(ticketSales)
      .where(eq(ticketSales.id, id))
      .returning();

    return results.pop() ?? null;
  }
}
