import { pgEnum } from 'drizzle-orm/pg-core';

export const discountType = pgEnum('discount_types', ['PERCENTAGE', 'FIXED']);
