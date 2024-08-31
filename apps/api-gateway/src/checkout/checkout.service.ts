import {
  PaymentsMicroService,
  TicketSalesMicroService,
} from '@app/microservices';
import { Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dtos';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly paymentsMicroService: PaymentsMicroService,
    private readonly ticketSalesMicroService: TicketSalesMicroService,
  ) {}

  async create(checkoutDto: CreateCheckoutDto) {
    const { ticketSalesId, email, quantity } = checkoutDto;
    const ticketSales = await this.ticketSalesMicroService.reserveTickets(
      ticketSalesId,
      quantity,
    );

    const unitPrice = ticketSales.price;
    const checkoutSession =
      await this.paymentsMicroService.createCheckoutSession({
        name: `${ticketSales.event.name} | ${ticketSales.name}`,
        description: ticketSales.description,
        unitPrice,
        quantity,
      });

    await this.paymentsMicroService.create({
      checkoutSessionId: checkoutSession.id,
      email,
      ticketSalesId,
      total: checkoutSession.amount_total,
      ticketCount: quantity,
    });

    return checkoutSession;
  }
}
