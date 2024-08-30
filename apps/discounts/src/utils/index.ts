import { DiscountKind } from '@app/database';
import * as crypto from 'crypto';

export namespace DiscountUtils {
  const algorithm = 'aes-256-cbc';
  const iv = Buffer.alloc(16, 0);
  const secretKey = crypto.scryptSync(
    process.env.DISCOUNT_CODE_ENCRYPTION_SECRET,
    'salt',
    32,
  );

  export function encrypt(text: string): string {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  export function decrypt(encryptedText: string): string {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  export function applyDiscount(
    kind: DiscountKind,
    price: number,
    amount: number,
  ): number {
    switch (kind) {
      case DiscountKind.FIXED:
        return Math.max(0, price - amount);
      case DiscountKind.PERCENTAGE:
        return Math.max(price - price * (amount / 100));
      default:
        return price;
    }
  }
}
