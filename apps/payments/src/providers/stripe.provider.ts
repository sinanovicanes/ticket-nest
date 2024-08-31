import { Inject, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';

export const STRIPE_KEY = 'STRIPE';
export const InjectStripe = () => Inject(STRIPE_KEY);

export const StripeProvider: Provider = {
  provide: STRIPE_KEY,
  inject: [ConfigService],
  useExisting: ConfigService,
  useFactory: (configService: ConfigService) => {
    return new Stripe(configService.get('STRIPE_SECRET'));
  },
};
