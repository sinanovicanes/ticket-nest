import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/validation';
import { MailTransporterProvider } from './providers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', './apps/email/.env'],
      validate,
    }),
  ],
  controllers: [EmailController],
  providers: [MailTransporterProvider, EmailService],
})
export class EmailModule {}
