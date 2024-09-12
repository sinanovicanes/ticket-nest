import { Global, Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/validation';
import { MailTransporterProvider } from './providers';
import { TicketEventsController } from './controllers/ticket-events.controller';
import { TicketsMicroServiceModule } from '@app/microservices';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', './apps/email/.env'],
      validate,
    }),
    TicketsMicroServiceModule,
  ],
  controllers: [EmailController, TicketEventsController],
  providers: [MailTransporterProvider, EmailService],
})
export class EmailModule {}
