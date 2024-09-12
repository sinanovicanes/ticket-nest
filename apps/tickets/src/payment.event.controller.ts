import { PaymentsEventPatterns } from '@app/contracts/payments';
import { TicketsEventPatterns } from '@app/contracts/tickets';
import { TicketsMicroService } from '@app/microservices';
import { Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { TicketsService } from './tickets.service';

export class PaymentEventController {
  private readonly logger = new Logger(PaymentEventController.name);
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly ticketsMicroService: TicketsMicroService,
  ) {}

  @EventPattern(PaymentsEventPatterns.PAYMENT_COMPLETED)
  async handlePaymentCompleted(@Payload() payment: any) {
    this.logger.log(`Payment completed: ${payment.id}`);

    const ticketIds = await this.ticketsService.createDuplicates(
      {
        ticketSalesId: payment.ticketSalesId,
        eventId: payment.eventId,
      },
      payment.ticketCount,
    );

    this.ticketsMicroService.emit(
      TicketsEventPatterns.CREATED_DUPLICATES,
      ticketIds,
    );
  }
}
