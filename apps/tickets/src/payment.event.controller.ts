import { PaymentsEventPatterns } from '@app/contracts/payments';
import { EventPattern, Payload } from '@nestjs/microservices';
import { TicketsService } from './tickets.service';
import { Logger } from '@nestjs/common';

export class PaymentEventController {
  private readonly logger = new Logger(PaymentEventController.name);
  constructor(private readonly ticketsService: TicketsService) {}

  @EventPattern(PaymentsEventPatterns.PAYMENT_COMPLETED)
  handlePaymentCompleted(@Payload() payment: any) {
    this.logger.log(`Payment completed: ${payment.id}`);

    this.ticketsService.createDuplicates(
      {
        ticketSalesId: payment.ticketSalesId,
        eventId: payment.eventId,
      },
      payment.ticketCount,
    );
  }
}
