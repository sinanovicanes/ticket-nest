import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', './apps/email/.env'],
      validate,
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
