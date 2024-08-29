import {
  CreatePaymentDto,
  FindOnePaymentMessageDto,
  FindPaymentOptionsDto,
  PaymentsMessagePatterns,
  UpdatePaymentDto,
  UpdatePaymentMessageDto,
} from '@app/contracts/payments';
import { PaymentSelectFieldsDto } from '@app/database';
import { NatsServices } from '@app/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PaymentsMicroService {
  @Inject(NatsServices.PAYMENTS) private readonly client: ClientProxy;

  create(dto: CreatePaymentDto) {
    const source = this.client.send(PaymentsMessagePatterns.CREATE, dto);

    return firstValueFrom(source);
  }

  findMany(options: FindPaymentOptionsDto) {
    const source = this.client.send(PaymentsMessagePatterns.FIND_MANY, options);

    return firstValueFrom(source);
  }

  findOne(id: string, selectFields: PaymentSelectFieldsDto) {
    const source = this.client.send(PaymentsMessagePatterns.FIND_ONE, {
      id,
      selectFields,
    } as FindOnePaymentMessageDto);

    return firstValueFrom(source);
  }

  update(id: string, dto: UpdatePaymentDto) {
    const source = this.client.send(PaymentsMessagePatterns.UPDATE, {
      id,
      dto,
    } as UpdatePaymentMessageDto);

    return firstValueFrom(source);
  }

  remove(id: string) {
    const source = this.client.send(PaymentsMessagePatterns.DELETE, id);

    return firstValueFrom(source);
  }
}
