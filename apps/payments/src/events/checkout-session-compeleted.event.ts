import type Stripe from 'stripe';

export class CheckoutSessionCompletedEvent {
  constructor(public readonly session: Stripe.Checkout.Session) {}
}
