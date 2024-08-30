import { Body, Controller, Post, Res } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dtos';
import { Response } from 'express';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  async create(
    @Body() checkoutDto: CreateCheckoutDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const checkoutSession = await this.checkoutService.create(checkoutDto);

    response.redirect(303, checkoutSession.url);
  }
}
