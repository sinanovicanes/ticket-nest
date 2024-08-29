import { Controller, Get } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateDiscountDto,
  DiscountsMessagePatterns,
  UpdateDiscountMessageDto,
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
}
