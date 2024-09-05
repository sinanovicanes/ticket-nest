import { EmailTemplates } from '@app/contracts/email';
import { Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { HandlebarsAdapter } from './adapters';
import { InjectMailTransporter } from './providers/transporter.provider';

interface IMailOptions extends MailOptions {
  template?: EmailTemplates;
  context?: Record<string, any>;
}

@Injectable()
export class EmailService {
  constructor(
    @InjectMailTransporter() private readonly transporter: Transporter,
  ) {
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

  send(template: EmailTemplates, to: string, options: IMailOptions) {
    return this.transporter.sendMail({
      ...options,
      template,
      to,
    } as IMailOptions);
  }
}
