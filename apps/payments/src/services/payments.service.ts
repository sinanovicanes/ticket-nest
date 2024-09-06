import {
  CreatePaymentDto,
  FindPaymentsOptionsDto,
  UpdatePaymentDto,
} from '@app/contracts/payments';
import {
  Database,
  eventSchema,
  InjectDB,
  Payment,
  paymentSchema,
} from '@app/database';
import { getOffset } from '@app/database/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { asc, between, desc, eq, gte, lte } from 'drizzle-orm';

@Injectable()
export class PaymentsService {
  constructor(@InjectDB() private readonly db: Database) {}

  async findOne(id: string): Promise<Payment> {
    const query = this.db
      .select()
      .from(paymentSchema)
      .where(eq(paymentSchema.id, id));

    const results = await query;
    const payment = results.pop();

    if (!payment) {
      throw new RpcException(new NotFoundException('Payment not found'));
    }

    return payment;
  }

  async findMany(options: FindPaymentsOptionsDto): Promise<Payment[]> {
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
      eventId,
    } = options;
    const offset = getOffset(page, limit);
    const query = this.db
      .select()
      .from(paymentSchema)
      .offset(offset)
      .limit(limit);

    if (eventId) {
      query.where(eq(eventSchema.id, eventId));
    }

    if (salesId) {
      query.where(eq(paymentSchema.ticketSalesId, salesId));
    }

    if (minPayment && maxPayment) {
      query.where(between(paymentSchema.total, minPayment, maxPayment));
    } else if (minPayment) {
      query.where(gte(paymentSchema.total, minPayment));
    } else if (maxPayment) {
      query.where(lte(paymentSchema.total, maxPayment));
    }

    if (startDate && endDate) {
      query.where(between(paymentSchema.createdAt, startDate, endDate));
    } else if (startDate) {
      query.where(gte(paymentSchema.createdAt, startDate));
    } else if (endDate) {
      query.where(lte(paymentSchema.createdAt, endDate));
    }

    const orderByColumns = orderByFields.map((orderBy) =>
      order == 'ASC'
        ? asc(paymentSchema[orderBy])
        : desc(paymentSchema[orderBy]),
    );

    query.orderBy(...orderByColumns);

    return await query;
  }

  async create(dto: CreatePaymentDto) {
    const results = await this.db.insert(paymentSchema).values(dto).returning();
    const result = results.pop();

    return result;
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
