import {
  Body,
  Controller,
  ForbiddenException,
  Headers,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dtos';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('stripe/webhook')
  async stripeWebhook(
    @Headers('stripe-signature') signature: string,
    @Body() body: any,
  ) {
    if (!signature) {
      throw new ForbiddenException();
    }

    return this.checkoutService.stripeWebhook(signature, body);
  }

  @Post()
  async create(
    @Body() checkoutDto: CreateCheckoutDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const checkoutSession = await this.checkoutService.create(checkoutDto);

    response.redirect(303, checkoutSession.url);
  }
}
