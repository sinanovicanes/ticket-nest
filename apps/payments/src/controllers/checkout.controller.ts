import { Controller } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  CheckoutSessionCompletedEvent,
  CheckoutSessionExpiredEvent,
} from '../events';
import { CheckoutService } from '../services/checkout.service';

@Controller()
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @OnEvent(CheckoutSessionCompletedEvent.name, { async: true })
  handleCheckoutSessionCompletedEvent({
    session,
  }: CheckoutSessionCompletedEvent) {
    this.checkoutService.onCheckoutSessionCompleted(session);
  }

  @OnEvent(CheckoutSessionExpiredEvent.name, { async: true })
  handleCheckoutSessionExpiredEvent({ session }: CheckoutSessionExpiredEvent) {
    this.checkoutService.onCheckoutSessionExpired(session);
  }
}
