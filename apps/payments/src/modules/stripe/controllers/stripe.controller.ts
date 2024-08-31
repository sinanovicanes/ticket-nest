import {
  CreateStripeCheckoutDto,
  PaymentsMessagePatterns,
} from '@app/contracts/payments';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentsService } from '../../../services/payments.service';
import { StripeService } from '../services/stripe.service';

@Controller()
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly paymentService: PaymentsService,
  ) {}

  @MessagePattern(PaymentsMessagePatterns.CREATE_CHECKOUT_SESSION)
  async createCheckoutSession(@Payload() dto: CreateStripeCheckoutDto) {
    const checkoutSession = await this.stripeService.createCheckoutSession(dto);

    await this.paymentService.create({
      checkoutSessionId: checkoutSession.id,
      email: dto.metadata.email,
      ticketSalesId: dto.metadata.ticketSalesId,
      total: checkoutSession.amount_total,
      ticketCount: dto.quantity,
    });

    return checkoutSession;
  }
}
