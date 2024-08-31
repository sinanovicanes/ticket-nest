import { DatabaseModule } from '@app/database';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { validate } from './config/validation';
import { CheckoutController } from './controllers/checkout.controller';
import { PaymentsController } from './controllers/payments.controller';
import { StripeModule } from './modules/stripe/stripe.module';
import { CheckoutService } from './services/checkout.service';
import { PaymentsService } from './services/payments.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '/apps/payments/.env'],
      validate,
    }),
    DatabaseModule,
    StripeModule,
    EventEmitterModule.forRoot({
      global: true,
    }),
  ],
  controllers: [PaymentsController, CheckoutController],
  providers: [PaymentsService, CheckoutService],
  exports: [PaymentsService, CheckoutService],
})
export class PaymentsModule {}
