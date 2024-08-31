import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { HandlebarsAdapter } from './adapters';
import { EmailTemplates } from '@app/contracts/email';

interface IMailOptions extends MailOptions {
  template?: EmailTemplates;
  context?: Record<string, any>;
}

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport(
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

    this.setAdapter(new HandlebarsAdapter());
  }

  private setAdapter(adapter: HandlebarsAdapter) {
    this.transporter.use('compile', async (mail, callback) => {
      const data = mail.data as IMailOptions;

      if (!data.template) {
        // Template not provided, skip rendering
        return callback();
      }

      try {
        data.html = await adapter.render(data.template, data.context);
      } catch (e) {
        return callback(e);
      }

      callback();
    });
  }

  sendEmail(template: EmailTemplates, to: string, options: IMailOptions) {
    return this.transporter.sendMail({
      ...options,
      template,
      to,
    } as IMailOptions);
  }
}
