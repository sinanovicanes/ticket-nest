import { Controller, Get, NotImplementedException } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import {
  CreateDiscountDto,
  DiscountsMessagePatterns,
  FindByDiscountCodeMessageDto,
  UpdateDiscountMessageDto,
  ValidateDiscountCodeMessageDto,
} from '@app/contracts/discounts';

@Controller()
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @MessagePattern(DiscountsMessagePatterns.CREATE)
  create(@Payload() dto: CreateDiscountDto) {
    return this.discountsService.create(dto);
  }

  @MessagePattern(DiscountsMessagePatterns.UPDATE)
  updateOne(@Payload() { id, dto }: UpdateDiscountMessageDto) {
    return this.discountsService.updateOne(id, dto);
  }

  @MessagePattern(DiscountsMessagePatterns.DELETE)
  delete(@Payload() id: string) {
    return this.discountsService.delete(id);
  }

  @MessagePattern(DiscountsMessagePatterns.FIND_ONE)
  findOne(@Payload() id: string) {
    throw new RpcException(new NotImplementedException());
    // return this.discountsService.findOne(id);
  }

  @MessagePattern(DiscountsMessagePatterns.FIND_MANY)
  findMany() {
    throw new RpcException(new NotImplementedException());
    // return this.discountsService.findMany();
  }

  @MessagePattern(DiscountsMessagePatterns.FIND_BY_CODE)
  findByCode(@Payload() { code, salesId }: ValidateDiscountCodeMessageDto) {
    return this.discountsService.findByCode(code, salesId);
  }

  @MessagePattern(DiscountsMessagePatterns.VALIDATE_CODE)
  validateCode(@Payload() { code, salesId }: FindByDiscountCodeMessageDto) {
    return this.discountsService.validateCode(code, salesId);
  }
}
