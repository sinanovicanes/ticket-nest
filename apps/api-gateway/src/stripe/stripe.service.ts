import {
  PaymentsMicroService,
  TicketSalesMicroService,
} from '@app/microservices';
import { Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dtos';

@Injectable()
export class StripeService {
  constructor(
    private readonly paymentsMicroService: PaymentsMicroService,
    private readonly ticketSalesMicroService: TicketSalesMicroService,
  ) {}

  async createCheckoutSession(checkoutDto: CreateCheckoutDto) {
    const { ticketSalesId, email, quantity } = checkoutDto;
    const ticketSales = await this.ticketSalesMicroService.reserveTickets(
      ticketSalesId,
      quantity,
    );

    const unitPrice = ticketSales.price;

    try {
      const checkoutSession =
        await this.paymentsMicroService.createCheckoutSession({
          name: `${ticketSales.event.name} | ${ticketSales.name}`,
          description: ticketSales.description,
          unitPrice,
          quantity,
          metadata: {
            ticketSalesId,
            email,
          },
        });

      return checkoutSession;
    } catch (e) {
      await this.ticketSalesMicroService.releaseTickets(
        ticketSalesId,
        quantity,
      );
      throw e;
    }
  }
}
