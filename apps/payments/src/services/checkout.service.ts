import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import type Stripe from 'stripe';
import { PaymentStatus } from '@app/database';
import { ClientProxy } from '@nestjs/microservices';
import { NatsServices } from '@app/microservices';
import { PaymentsEventPatterns } from '@app/contracts/payments';

@Injectable()
export class CheckoutService {
  @Inject(NatsServices.PAYMENTS) private readonly paymentClient: ClientProxy;

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

        this.paymentClient.emit(
          PaymentsEventPatterns.PAYMENT_COMPLETED,
          payment,
        );
        break;
      case 'unpaid':
        const unpaidPayment =
          await this.paymentsService.updateOneByCheckoutSessionId(session.id, {
            status: PaymentStatus.FAILED,
          });

        this.paymentClient.emit(
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

    this.paymentClient.emit(
      PaymentsEventPatterns.CHECKOUT_SESSION_EXPIRED,
      expiredPayment,
    );
  }
}
