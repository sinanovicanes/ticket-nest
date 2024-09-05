import { Inject, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

export const TRANSPORTER_KEY = 'MAIL_TRANSPORTER';
export const InjectMailTransporter = () => Inject(TRANSPORTER_KEY);

export const MailTransporterProvider: Provider = {
  provide: TRANSPORTER_KEY,
  inject: [ConfigService],
  useExisting: ConfigService,
  useFactory: (configService: ConfigService) => {
    const transporter = createTransport(
      {
        host: configService.get<string>('EMAIL_HOST'),
        port: configService.get<number>('EMAIL_PORT'),
        auth: {
          user: configService.get<string>('EMAIL_USER'),
          pass: configService.get<string>('EMAIL_PASS'),
        },
      },
      {
        from: configService.get<string>('EMAIL_FROM'),
      },
    );

    return transporter;
  },
};
