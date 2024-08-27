import {
  CreateTicketSalesDto,
  FindTicketSalesOptionsDto,
  UpdateTicketSalesDto,
} from '@app/contracts/ticket-sales';
import {
  Database,
  event,
  InjectDB,
  SelectFieldsFactory,
  ticketSales,
} from '@app/database';
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
      ticketSales,
      {
        event,
      },
    );

    const dbQuery = this.db
      .select(fields)
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
