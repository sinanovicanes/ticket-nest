import { Controller, Get } from '@nestjs/common';
import { DiscountsService } from './discounts.service';

@Controller()
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Get()
  getHello(): string {
    return this.discountsService.getHello();
  }
}
