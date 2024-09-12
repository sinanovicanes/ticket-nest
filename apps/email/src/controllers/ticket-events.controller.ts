import { TicketsEventPatterns } from '@app/contracts/tickets';
import { Ticket } from '@app/database';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EmailService } from '../email.service';
import { EmailTemplates } from '@app/contracts/email';
import { TicketsMicroService } from '@app/microservices';
import { TicketWithDetails } from '@app/contracts/tickets/types';

@Controller()
export class TicketEventsController {
  private readonly logger = new Logger(TicketEventsController.name);

  constructor(
    private readonly emailService: EmailService,
    private readonly ticketsMicroService: TicketsMicroService,
  ) {}

  private createTicketCtxFromDetails(
    id: string,
    ticketDetails: TicketWithDetails,
  ) {
    // TODO: Create a qr code for the ticket id
    return {
      id,
      status: ticketDetails.status,
      event: {
        name: ticketDetails.event.name,
        date: ticketDetails.event.date,
        location: ticketDetails.event.location.name,
      },
      location: {
        name: ticketDetails.event.location.name,
        city: ticketDetails.event.location.city,
        province: ticketDetails.event.location.province,
        address: ticketDetails.event.location.address,
        address2: ticketDetails.event.location.address2,
      },
      payment: {
        total: ticketDetails.payment.total,
        ticketCount: ticketDetails.payment.ticketCount,
      },
      sale: {
        date: ticketDetails.ticketSales.name,
        price: ticketDetails.ticketSales.price,
        description: ticketDetails.ticketSales.description,
      },
    };
  }

  private sendTicketInfoEmail(to: string, tickets: any[]) {
    this.logger.log(`Sending ticket info email to ${to}`);
    this.emailService
      .send(EmailTemplates.TICKET_INFO, to, {
        context: {
          tickets,
        },
      })
      .catch(() => {
        this.logger.error(`Failed to send ticket info email to ${to}`);
      });
  }

  @EventPattern(TicketsEventPatterns.CREATED_DUPLICATES)
  async createdDuplicates(ticketIds: Ticket['id'][]) {
    const ticketDetails = await this.ticketsMicroService.findOneWithDetails(
      ticketIds[0],
    );

    const to = ticketDetails.payment.email;
    this.sendTicketInfoEmail(
      to,
      ticketIds.map((id) => this.createTicketCtxFromDetails(id, ticketDetails)),
    );
  }

  @EventPattern(TicketsEventPatterns.CREATED)
  async created(ticket: Ticket) {
    const ticketDetails = await this.ticketsMicroService.findOneWithDetails(
      ticket.id,
    );
    const to = ticketDetails.payment.email;
    this.sendTicketInfoEmail(to, [
      this.createTicketCtxFromDetails(ticket.id, ticketDetails),
    ]);
  }
}
