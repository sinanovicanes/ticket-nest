import {
  CreateDiscountDto,
  DiscountsMessagePatterns,
  FindByDiscountCodeMessageDto,
  UpdateDiscountDto,
  UpdateDiscountMessageDto,
  ValidateDiscountCodeMessageDto,
} from '@app/contracts/discounts';
import { NatsServices } from '@app/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class DiscountsMicroService {
  @Inject(NatsServices.DISCOUNTS) private readonly client: ClientProxy;

  create(dto: CreateDiscountDto) {
    return this.client.send(DiscountsMessagePatterns.CREATE, dto);
  }

  findMany(options: any) {
    return this.client.send(DiscountsMessagePatterns.FIND_MANY, options);
  }

  findOne(id: string, selectFields: any) {
    return this.client.send(DiscountsMessagePatterns.FIND_ONE, {
      id,
      selectFields,
    } as any);
  }

  update(id: string, dto: UpdateDiscountDto) {
    return this.client.send(DiscountsMessagePatterns.UPDATE, {
      id,
      dto,
    } as UpdateDiscountMessageDto);
  }

  remove(id: string) {
    return this.client.send(DiscountsMessagePatterns.DELETE, id);
  }

  findByCode(code: string, salesId: string) {
    return this.client.send(DiscountsMessagePatterns.FIND_BY_CODE, {
      code,
      salesId,
    } as FindByDiscountCodeMessageDto);
  }

  validateCode(code: string, salesId: string) {
    return this.client.send(DiscountsMessagePatterns.VALIDATE_CODE, {
      code,
      salesId,
    } as ValidateDiscountCodeMessageDto);
  }
}
