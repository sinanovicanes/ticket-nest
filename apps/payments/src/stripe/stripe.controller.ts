import { Controller } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  PaymentsMessagePatterns,
  StripeCheckoutDto,
} from '@app/contracts/payments';

@Controller()
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @MessagePattern(PaymentsMessagePatterns.CREATE_CHECKOUT_SESSION)
  async createCheckoutSession(dto: StripeCheckoutDto) {
    return this.stripeService.createCheckoutSession(dto);
  }
}
