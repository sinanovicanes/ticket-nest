import { PaymentsEventPatterns } from '@app/contracts/payments';
import { PaymentStatus } from '@app/database';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import type Stripe from 'stripe';
import { PaymentsService } from '../services/payments.service';

@Injectable()
export class CheckoutService {
  private readonly natsClient: ClientProxy;

  constructor(private readonly paymentsService: PaymentsService) {}

  async onCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    switch (session.payment_status) {
      case 'paid':
        const payment = await this.paymentsService.updateOneByCheckoutSessionId(
          session.id,
          {
            status: PaymentStatus.PAID,
          },
        );

        this.natsClient.emit(PaymentsEventPatterns.PAYMENT_COMPLETED, payment);
        break;
      case 'unpaid':
        const unpaidPayment =
          await this.paymentsService.updateOneByCheckoutSessionId(session.id, {
            status: PaymentStatus.FAILED,
          });

        this.natsClient.emit(
          PaymentsEventPatterns.PAYMENT_FAILED,
          unpaidPayment,
        );
        break;
    }
  }

  async onCheckoutSessionExpired(session: Stripe.Checkout.Session) {
    const expiredPayment =
      await this.paymentsService.updateOneByCheckoutSessionId(session.id, {
        status: PaymentStatus.FAILED,
      });

    this.natsClient.emit(
      PaymentsEventPatterns.CHECKOUT_SESSION_EXPIRED,
      expiredPayment,
    );
  }
}
