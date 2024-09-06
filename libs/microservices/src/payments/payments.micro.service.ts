import {
  CreatePaymentDto,
  CreateStripeCheckoutDto,
  FindOnePaymentMessageDto,
  FindPaymentsOptionsDto,
  PaymentsEventPatterns,
  PaymentsMessagePatterns,
  UpdatePaymentDto,
  UpdatePaymentMessageDto,
} from '@app/contracts/payments';
import { Payment } from '@app/database';
import { NatsServices } from '@app/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import type Stripe from 'stripe';

@Injectable()
export class PaymentsMicroService {
  @Inject(NatsServices.PAYMENTS) private readonly client: ClientProxy;

  create(dto: CreatePaymentDto): Promise<Payment> {
    const source = this.client
      .send(PaymentsMessagePatterns.CREATE, dto)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  findMany(options: FindPaymentsOptionsDto): Promise<Payment[]> {
    const source = this.client
      .send(PaymentsMessagePatterns.FIND_MANY, options)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  findOne(id: string): Promise<Payment> {
    const source = this.client
      .send(PaymentsMessagePatterns.FIND_ONE, {
        id,
      } as FindOnePaymentMessageDto)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  update(id: string, dto: UpdatePaymentDto): Promise<Payment> {
    const source = this.client
      .send(PaymentsMessagePatterns.UPDATE, {
        id,
        dto,
      } as UpdatePaymentMessageDto)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  remove(id: string): Promise<Payment> {
    const source = this.client
      .send(PaymentsMessagePatterns.DELETE, id)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  createCheckoutSession(
    dto: CreateStripeCheckoutDto,
  ): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    const source = this.client
      .send<
        Stripe.Response<Stripe.Checkout.Session>
      >(PaymentsMessagePatterns.CREATE_CHECKOUT_SESSION, dto)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  emitStripeWebhookEvent(event: Stripe.Event) {
    this.client
      .emit(PaymentsEventPatterns.STRIPE_WEBHOOK_EVENT, event)
      .pipe(timeout(5000));
  }
}
