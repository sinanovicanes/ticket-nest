import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';
import {
  CreatePaymentDto,
  FindOnePaymentMessageDto,
  FindPaymentOptionsDto,
  PaymentsMessagePatterns,
  UpdatePaymentMessageDto,
} from '@app/contracts/payments';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern(PaymentsMessagePatterns.CREATE)
  create(@Payload() dto: CreatePaymentDto) {
    return this.paymentsService.create(dto);
  }

  @MessagePattern(PaymentsMessagePatterns.FIND_MANY)
  findMany(@Payload() options: FindPaymentOptionsDto) {
    return this.paymentsService.findMany(options);
  }

  @MessagePattern(PaymentsMessagePatterns.FIND_ONE)
  findOne(@Payload() { id, selectFields }: FindOnePaymentMessageDto) {
    return this.paymentsService.findOne(id, selectFields);
  }

  @MessagePattern(PaymentsMessagePatterns.UPDATE)
  update(@Payload() { id, dto }: UpdatePaymentMessageDto) {
    return this.paymentsService.updateOne(id, dto);
  }

  @MessagePattern(PaymentsMessagePatterns.DELETE)
  delete(@Payload() id: string) {
    return this.paymentsService.delete(id);
  }
}
