export enum PaymentsEventPatterns {
  CREATED = 'payment.created',
  UPDATED = 'payment.updated',
  DELETED = 'payment.deleted',
  CHECKOUT_SESSION_CREATED = 'payment.stripe.checkout.sessionCreated',
  CHECKOUT_SESSION_COMPLETED = 'payment.stripe.checkout.sessionCompleted',
  CHECKOUT_SESSION_EXPIRED = 'payment.stripe.checkout.sessionExpired',
  PAYMENT_COMPLETED = 'payment.stripe.paymentCompleted',
  PAYMENT_FAILED = 'payment.stripe.paymentFailed',
}
