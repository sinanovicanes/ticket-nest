import {
  EmailEventPatterns,
  EmailTemplates,
  SendEmailDto,
} from '@app/contracts/email';
import { NatsServices } from '@app/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

@Injectable()
export class EmailMicroService {
  @Inject(NatsServices.EMAIL) private readonly client: ClientProxy;

  send(template: EmailTemplates, to: string, ctx?: Record<string, any>) {
    this.client
      .emit(EmailEventPatterns.SEND, {
        template,
        to,
        ctx,
      } as SendEmailDto)
      .pipe(timeout(5000));
  }
}
