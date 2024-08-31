import {
  CreatePaymentDto,
  CreateStripeCheckoutDto,
  FindOnePaymentMessageDto,
  FindPaymentOptionsDto,
  PaymentsMessagePatterns,
  UpdatePaymentDto,
  UpdatePaymentMessageDto,
} from '@app/contracts/payments';
import { PaymentSelectFieldsDto } from '@app/database';
import { NatsServices } from '@app/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import type Stripe from 'stripe';

@Injectable()
export class PaymentsMicroService {
  @Inject(NatsServices.PAYMENTS) private readonly client: ClientProxy;

  create(dto: CreatePaymentDto) {
    const source = this.client
      .send(PaymentsMessagePatterns.CREATE, dto)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  findMany(options: FindPaymentOptionsDto) {
    const source = this.client
      .send(PaymentsMessagePatterns.FIND_MANY, options)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  findOne(id: string, selectFields: PaymentSelectFieldsDto) {
    const source = this.client
      .send(PaymentsMessagePatterns.FIND_ONE, {
        id,
        selectFields,
      } as FindOnePaymentMessageDto)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  update(id: string, dto: UpdatePaymentDto) {
    const source = this.client
      .send(PaymentsMessagePatterns.UPDATE, {
        id,
        dto,
      } as UpdatePaymentMessageDto)
      .pipe(timeout(5000));

    return firstValueFrom(source);
  }

  remove(id: string) {
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
}
