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

@Injectable()
export class PaymentsMicroService {
  @Inject(NatsServices.PAYMENTS) private readonly client: ClientProxy;

  create(dto: CreatePaymentDto) {
    return this.client.send(PaymentsMessagePatterns.CREATE, dto);
  }

  findMany(options: FindPaymentOptionsDto) {
    return this.client.send(PaymentsMessagePatterns.FIND_MANY, options);
  }

  findOne(id: string, selectFields: PaymentSelectFieldsDto) {
    return this.client.send(PaymentsMessagePatterns.FIND_ONE, {
      id,
      selectFields,
    } as FindOnePaymentMessageDto);
  }

  update(id: string, dto: UpdatePaymentDto) {
    return this.client.send(PaymentsMessagePatterns.UPDATE, {
      id,
      dto,
    } as UpdatePaymentMessageDto);
  }

  remove(id: string) {
    return this.client.send(PaymentsMessagePatterns.DELETE, id);
  }
}
