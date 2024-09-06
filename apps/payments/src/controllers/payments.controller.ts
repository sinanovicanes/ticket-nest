import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentsService } from '../services/payments.service';
import {
  CreatePaymentDto,
  FindOnePaymentMessageDto,
  FindPaymentsOptionsDto,
  PaymentsMessagePatterns,
  UpdatePaymentMessageDto,
} from '@app/contracts/payments';
import { Payment } from '@app/database';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern(PaymentsMessagePatterns.CREATE)
  create(@Payload() dto: CreatePaymentDto): Promise<Payment> {
    return this.paymentsService.create(dto);
  }

  @MessagePattern(PaymentsMessagePatterns.FIND_MANY)
  findMany(@Payload() options: FindPaymentsOptionsDto): Promise<Payment[]> {
    return this.paymentsService.findMany(options);
  }

  @MessagePattern(PaymentsMessagePatterns.FIND_ONE)
  findOne(@Payload() { id }: FindOnePaymentMessageDto): Promise<Payment> {
    return this.paymentsService.findOne(id);
  }

  @MessagePattern(PaymentsMessagePatterns.UPDATE)
  update(@Payload() { id, dto }: UpdatePaymentMessageDto): Promise<Payment> {
    return this.paymentsService.updateOne(id, dto);
  }

  @MessagePattern(PaymentsMessagePatterns.DELETE)
  delete(@Payload() id: string): Promise<Payment> {
    return this.paymentsService.delete(id);
  }
}
