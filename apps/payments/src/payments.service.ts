import {
  CreatePaymentDto,
  FindPaymentOptionsDto,
  UpdatePaymentDto,
} from '@app/contracts/payments';
import {
  Database,
  eventSchema,
  InjectDB,
  locationSchema,
  paymentSchema,
  PaymentSelectFieldsDto,
  SelectFieldsFactory,
  ticketSalesSchema,
  ticketSchema,
} from '@app/database';
import { Injectable } from '@nestjs/common';
import { asc, between, desc, eq, gte, lte } from 'drizzle-orm';

@Injectable()
export class PaymentsService {
  constructor(@InjectDB() private readonly db: Database) {}

  async findOne(id: string, selectFields: PaymentSelectFieldsDto) {
    const fields = SelectFieldsFactory.createFromDto(
      selectFields,
      paymentSchema,
      {
        event: eventSchema,
        location: locationSchema,
        ticket: ticketSchema,
        ticketSales: ticketSalesSchema,
      },
    );

    const query = this.db
      .select(fields)
      .from(paymentSchema)
      .where(eq(paymentSchema.id, id));

    if (selectFields.ticket) {
      query.leftJoin(ticketSchema, eq(paymentSchema.ticketId, ticketSchema.id));

      if (selectFields.ticket.event) {
        query.leftJoin(eventSchema, eq(ticketSchema.eventId, eventSchema.id));

        if (selectFields.ticket.event.location) {
          query.leftJoin(
            locationSchema,
            eq(eventSchema.locationId, locationSchema.id),
          );
        }
      }

      if (selectFields.ticket.ticketSales) {
        query.leftJoin(
          ticketSalesSchema,
          eq(ticketSchema.ticketSalesId, ticketSalesSchema.id),
        );
      }
    }

    const results = await query;

    return results.pop() ?? null;
  }

  async findMany(options: FindPaymentOptionsDto) {
    const {
      page,
      limit,
      startDate,
      endDate,
      order,
      orderByFields,
      maxPayment,
      minPayment,
      salesId,
      ticketId,
      eventId,
      selectFields,
    } = options;
    const offset = (page - 1) * limit;
    const fields = SelectFieldsFactory.createFromDto(
      selectFields,
      paymentSchema,
      {
        ticket: ticketSchema,
        event: eventSchema,
        location: locationSchema,
        ticketSales: ticketSalesSchema,
      },
    );

    const dbQuery = this.db
      .select(fields)
      .from(paymentSchema)
      .offset(offset)
      .limit(limit);

    if (eventId) {
      dbQuery.where(eq(eventSchema.id, eventId));
    }

    if (ticketId) {
      dbQuery.where(eq(ticketSchema.id, ticketId));
    }

    if (salesId) {
      dbQuery.where(eq(ticketSalesSchema.id, salesId));
    }

    if (selectFields.ticket) {
      dbQuery.leftJoin(
        ticketSchema,
        eq(paymentSchema.ticketId, ticketSchema.id),
      );

      if (selectFields.ticket.event) {
        dbQuery.leftJoin(eventSchema, eq(ticketSchema.eventId, eventSchema.id));

        if (selectFields.ticket.event.location) {
          dbQuery.leftJoin(
            locationSchema,
            eq(eventSchema.locationId, locationSchema.id),
          );
        }
      }

      if (selectFields.ticket.ticketSales) {
        dbQuery.leftJoin(
          ticketSalesSchema,
          eq(ticketSchema.ticketSalesId, ticketSalesSchema.id),
        );
      }
    }

    if (minPayment && maxPayment) {
      dbQuery.where(between(paymentSchema.payment, minPayment, maxPayment));
    } else if (minPayment) {
      dbQuery.where(gte(paymentSchema.payment, minPayment));
    } else if (maxPayment) {
      dbQuery.where(lte(paymentSchema.payment, maxPayment));
    }

    if (startDate && endDate) {
      dbQuery.where(between(paymentSchema.createdAt, startDate, endDate));
    } else if (startDate) {
      dbQuery.where(gte(paymentSchema.createdAt, startDate));
    } else if (endDate) {
      dbQuery.where(lte(paymentSchema.createdAt, endDate));
    }

    const orderByColumns = orderByFields.map((orderBy) =>
      order == 'ASC'
        ? asc(paymentSchema[orderBy])
        : desc(paymentSchema[orderBy]),
    );

    dbQuery.orderBy(...orderByColumns);

    return await dbQuery;
  }

  async create(dto: CreatePaymentDto) {
    return await this.db.insert(paymentSchema).values(dto).returning();
  }

  async updateOne(id: string, dto: UpdatePaymentDto) {
    const results = await this.db
      .update(paymentSchema)
      .set(dto)
      .where(eq(paymentSchema.id, id))
      .returning();

    return results.pop() ?? null;
  }

  async delete(id: string) {
    const results = await this.db
      .delete(paymentSchema)
      .where(eq(paymentSchema.id, id))
      .returning();

    return results.pop() ?? null;
  }
}
