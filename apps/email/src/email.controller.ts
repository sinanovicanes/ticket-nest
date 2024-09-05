import { Controller, Logger } from '@nestjs/common';
import { EmailService } from './email.service';
import { EventPattern } from '@nestjs/microservices';
import { EmailEventPatterns, SendEmailDto } from '@app/contracts/email';

@Controller()
export class EmailController {
  private readonly logger = new Logger(EmailController.name);

  constructor(private readonly emailService: EmailService) {}

  @EventPattern(EmailEventPatterns.SEND)
  async send({ template, to, ctx }: SendEmailDto) {
    this.logger.log(`Sending email to ${to} using template ${template}`);

    try {
      await this.emailService.send(template, to, ctx);
    } catch {
      this.logger.error(
        `Failed to send email to ${to} using template ${template}`,
      );
    }
  }
}
