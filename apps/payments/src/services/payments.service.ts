import {
  CreatePaymentDto,
  FindPaymentsOptionsDto,
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
import { Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
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

    const results = await query;
    const payment = results.pop();

    if (!payment) {
      throw new RpcException(new NotFoundException('Payment not found'));
    }

    return payment;
  }

  async findMany(options: FindPaymentsOptionsDto) {
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

    if (minPayment && maxPayment) {
      dbQuery.where(between(paymentSchema.total, minPayment, maxPayment));
    } else if (minPayment) {
      dbQuery.where(gte(paymentSchema.total, minPayment));
    } else if (maxPayment) {
      dbQuery.where(lte(paymentSchema.total, maxPayment));
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

  async updateOneByCheckoutSessionId(
    checkoutSessionId: string,
    dto: UpdatePaymentDto,
  ) {
    const results = await this.db
      .update(paymentSchema)
      .set(dto)
      .where(eq(paymentSchema.checkoutSessionId, checkoutSessionId))
      .returning();
    const result = results.pop();

    if (!result) {
      throw new RpcException(new NotFoundException('Payment not found'));
    }

    return result;
  }

  async delete(id: string) {
    const results = await this.db
      .delete(paymentSchema)
      .where(eq(paymentSchema.id, id))
      .returning();

    return results.pop() ?? null;
  }
}
