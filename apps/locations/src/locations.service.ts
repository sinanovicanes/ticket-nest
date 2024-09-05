import {
  CreateLocationDto,
  LocationNotFoundException,
  UpdateLocationDto,
} from '@app/contracts/locations';
import { Database, InjectDB, Location, locationSchema } from '@app/database';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { eq } from 'drizzle-orm';

@Injectable()
export class LocationsService {
  constructor(@InjectDB() private readonly db: Database) {}

  async findOne(id: string): Promise<Location> {
    const results = await this.db
      .select()
      .from(locationSchema)
      .where(eq(locationSchema.id, id));
    const result = results.pop();

    if (!result) {
      throw new LocationNotFoundException(id);
    }

    return result;
  }

  async findMany(): Promise<Location[]> {
    const results = await this.db.select().from(locationSchema);

    return results;
  }

  async createOne(location: CreateLocationDto): Promise<Location> {
    const results = await this.db
      .insert(locationSchema)
      .values(location)
      .returning();
    const result = results.pop();

    if (!result) {
      throw new RpcException('Failed to create location');
    }

    return result;
  }

  async updateOne(id: string, dto: UpdateLocationDto): Promise<Location> {
    const results = await this.db
      .update(locationSchema)
      .set(dto)
      .where(eq(locationSchema.id, id))
      .returning();
    const result = results.pop();

    if (!result) {
      throw new LocationNotFoundException(id);
    }

    return result;
  }

  async deleteOne(id: string): Promise<Location> {
    const results = await this.db
      .delete(locationSchema)
      .where(eq(locationSchema.id, id))
      .returning();
    const result = results.pop();

    if (!result) {
      throw new LocationNotFoundException(id);
    }

    return result;
  }
}
