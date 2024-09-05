import {
  CreatePaymentDto,
  FindPaymentsOptionsDto,
  UpdatePaymentDto,
} from '@app/contracts/payments';
import { PaymentsMicroService } from '@app/microservices';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsMicroService: PaymentsMicroService) {}

  create(dto: CreatePaymentDto) {
    return this.paymentsMicroService.create(dto);
  }

  findAll(options: FindPaymentsOptionsDto) {
    return this.paymentsMicroService.findMany(options);
  }

  findOne(id: string) {
    return this.paymentsMicroService.findOne(id, {});
  }

  update(id: string, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsMicroService.update(id, updatePaymentDto);
  }

  remove(id: string) {
    return this.paymentsMicroService.remove(id);
  }
}
