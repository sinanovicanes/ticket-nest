import { CreateDiscountDto, UpdateDiscountDto } from '@app/contracts/discounts';
import { Database, discountSchema, InjectDB } from '@app/database';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class DiscountsService {
  constructor(@InjectDB() private readonly db: Database) {}

  async create(dto: CreateDiscountDto) {
    // TODO: Hash the code
    return await this.db.insert(discountSchema).values(dto).returning();
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
