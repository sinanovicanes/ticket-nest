import { DiscountKind } from '@app/database/enums';
import { pgEnum } from 'drizzle-orm/pg-core';

export const discountKind = pgEnum('discount_kind', [
  DiscountKind.PERCENTAGE,
  DiscountKind.FIXED,
]);
