import {
  CreateDiscountDto,
  DiscountsMessagePatterns,
  FindByDiscountCodeMessageDto,
  UpdateDiscountDto,
  UpdateDiscountMessageDto,
  UseDiscountCodeMessageDto,
  ValidateDiscountCodeMessageDto,
} from '@app/contracts/discounts';
import { NatsServices } from '@app/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DiscountsMicroService {
  @Inject(NatsServices.DISCOUNTS) private readonly client: ClientProxy;

  create(dto: CreateDiscountDto) {
    const source = this.client.send(DiscountsMessagePatterns.CREATE, dto);

    return firstValueFrom(source);
  }

  findMany(options: any) {
    const source = this.client.send(
      DiscountsMessagePatterns.FIND_MANY,
      options,
    );

    return firstValueFrom(source);
  }

  findOne(id: string, selectFields: any) {
    const source = this.client.send(DiscountsMessagePatterns.FIND_ONE, {
      id,
      selectFields,
    } as any);

    return firstValueFrom(source);
  }

  update(id: string, dto: UpdateDiscountDto) {
    const source = this.client.send(DiscountsMessagePatterns.UPDATE, {
      id,
      dto,
    } as UpdateDiscountMessageDto);

    return firstValueFrom(source);
  }

  remove(id: string) {
    const source = this.client.send(DiscountsMessagePatterns.DELETE, id);

    return firstValueFrom(source);
  }

  findByCode(code: string, salesId: string) {
    const source = this.client.send(DiscountsMessagePatterns.FIND_BY_CODE, {
      code,
      salesId,
    } as FindByDiscountCodeMessageDto);

    return firstValueFrom(source);
  }

  validateCode(code: string, salesId: string) {
    const source = this.client.send(DiscountsMessagePatterns.VALIDATE_CODE, {
      code,
      salesId,
    } as ValidateDiscountCodeMessageDto);

    return firstValueFrom(source);
  }

  useCode(
    code: string,
    salesId: string,
    price: number,
  ): Promise<[string, number]> {
    const source = this.client.send<[string, number]>(
      DiscountsMessagePatterns.USE_CODE,
      {
        code,
        salesId,
        price,
      } as UseDiscountCodeMessageDto,
    );

    return firstValueFrom(source);
  }
}
