import type Stripe from 'stripe';

export class CheckoutSessionExpiredEvent {
  constructor(public readonly session: Stripe.Checkout.Session) {}
}
