import {
  CreateTicketSalesDto,
  UpdateTicketSalesDto,
} from '@app/contracts/ticket-sales';
import { Database, InjectDB, ticketSales } from '@app/database';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

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
  async findMany() {
    return await this.db.select().from(ticketSales);
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
