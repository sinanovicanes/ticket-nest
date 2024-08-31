import {
  Body,
  Controller,
  ForbiddenException,
  Headers,
  Post,
  RawBody,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateCheckoutDto } from './dtos';
import { StripeService } from './stripe.service';
import { StripeWebhookService } from './stripe-webhook.service';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly stripeWebhookService: StripeWebhookService,
  ) {}

  @Post('webhook')
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @RawBody() payload: Buffer,
    @Res() response: Response,
  ) {
    if (!signature) {
      throw new ForbiddenException();
    }

    await this.stripeWebhookService.handleRequest(signature, payload);

    // Return a response to acknowledge receipt of the event
    response.status(200).json({ received: true });
  }

  @Post('checkout')
  async createCheckoutSession(
    @Body() checkoutDto: CreateCheckoutDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const checkoutSession =
      await this.stripeService.createCheckoutSession(checkoutDto);

    response.redirect(303, checkoutSession.url);
  }
}
