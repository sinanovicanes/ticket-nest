import { PaymentStatus } from '@app/database/enums';
import { pgEnum } from 'drizzle-orm/pg-core';

export const paymentStatus = pgEnum('payment_status', [
  PaymentStatus.FAILED,
  PaymentStatus.PAID,
  PaymentStatus.PENDING,
  PaymentStatus.REFUNDED,
]);
