import { CreateDiscountDto, UpdateDiscountDto } from '@app/contracts/discounts';
import {
  Database,
  discountSchema,
  InjectDB,
  paymentSchema,
} from '@app/database';
import { Injectable } from '@nestjs/common';
import { and, count, eq } from 'drizzle-orm';
import { DiscountUtils } from './utils';

@Injectable()
export class DiscountsService {
  constructor(@InjectDB() private readonly db: Database) {}

  async findByCode(code: string, salesId: string) {
    const hashedCode = DiscountUtils.encrypt(code);
    const results = await this.db
      .select({
        usageCount: count(paymentSchema.id),
        id: discountSchema.id,
        ticketSalesId: discountSchema.ticketSalesId,
        kind: discountSchema.kind,
        amount: discountSchema.amount,
        code: discountSchema.code,
        maxUsage: discountSchema.maxUsage,
        expiresAt: discountSchema.expiresAt,
      })
      .from(discountSchema)
      .leftJoin(paymentSchema, eq(discountSchema.id, paymentSchema.discountId))
      .groupBy(discountSchema.id)
      .where(
        and(
          eq(discountSchema.code, hashedCode),
          eq(discountSchema.ticketSalesId, salesId),
        ),
      );
    const result = results.pop();

    if (!result) {
      // Add error handling
      return null;
    }

    return result;
  }

  async validateCode(code: string, salesId: string) {
    const discount = await this.findByCode(code, salesId);

    if (!discount) {
      return null;
    }

    if (new Date(discount.expiresAt) < new Date()) {
      return null;
    }

    if (discount.usageCount >= discount.maxUsage) {
      return null;
    }

    return discount;
  }

  async create(dto: CreateDiscountDto) {
    const hashedCode = DiscountUtils.encrypt(dto.code);
    return await this.db
      .insert(discountSchema)
      .values({ ...dto, code: hashedCode })
      .returning();
  }

  async updateOne(id: string, dto: UpdateDiscountDto) {
    const results = await this.db
      .update(discountSchema)
      .set(dto)
      .where(eq(discountSchema.id, id))
      .returning();

    const result = results.pop();

    if (!result) {
      // Add error handling
      return null;
    }

    return result;
  }

  async delete(id: string) {
    const result = await this.db
      .delete(discountSchema)
      .where(eq(discountSchema.id, id))
      .returning()[0];
    return result ?? null;
  }
}
