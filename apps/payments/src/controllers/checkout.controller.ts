import { Controller, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  CheckoutSessionCompletedEvent,
  CheckoutSessionExpiredEvent,
} from '../events';
import { CheckoutService } from '../services/checkout.service';

@Controller()
export class CheckoutController {
  private readonly logger = new Logger(CheckoutController.name);

  constructor(private readonly checkoutService: CheckoutService) {}

  @OnEvent(CheckoutSessionCompletedEvent.name, { async: true })
  async handleCheckoutSessionCompletedEvent({
    session,
  }: CheckoutSessionCompletedEvent) {
    try {
      await this.checkoutService.onCheckoutSessionCompleted(session);
    } catch (e) {
      this.logger.error(
        `Failed to handle checkout session completed event: ${e}`,
      );
    }
  }

  @OnEvent(CheckoutSessionExpiredEvent.name, { async: true })
  async handleCheckoutSessionExpiredEvent({
    session,
  }: CheckoutSessionExpiredEvent) {
    try {
      await this.checkoutService.onCheckoutSessionExpired(session);
    } catch (e) {
      this.logger.error(
        `Failed to handle checkout session expired event: ${e}`,
      );
    }
  }
}
