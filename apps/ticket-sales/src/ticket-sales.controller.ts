import {
  CreateTicketSalesDto,
  FindTicketSalesOptionsDto,
  ReleaseTicketsMessageDto,
  ReserveTicketSalesResponse,
  ReserveTicketsMessageDto,
  TicketSalesMessagePatterns,
  TicketSalesWithEventDetails,
  TicketSalesWithImages,
  UpdateTicketSalesMessageDto,
} from '@app/contracts/ticket-sales';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TicketSalesService } from './ticket-sales.service';
import { TicketSales } from '@app/database';

@Controller()
export class TicketSalesController {
  constructor(private readonly ticketSalesService: TicketSalesService) {}

  @MessagePattern(TicketSalesMessagePatterns.CREATE)
  create(@Payload() dto: CreateTicketSalesDto): Promise<TicketSales> {
    return this.ticketSalesService.create(dto);
  }

  @MessagePattern(TicketSalesMessagePatterns.FIND_MANY)
  findMany(
    @Payload() options: FindTicketSalesOptionsDto,
  ): Promise<TicketSalesWithImages[]> {
    return this.ticketSalesService.findMany(options);
  }

  @MessagePattern(TicketSalesMessagePatterns.FIND_ONE)
  findOne(@Payload() id: string): Promise<TicketSalesWithImages> {
    return this.ticketSalesService.findOne(id);
  }

  @MessagePattern(TicketSalesMessagePatterns.UPDATE)
  update(@Payload() { id, dto }: UpdateTicketSalesMessageDto) {
    return this.ticketSalesService.updateOne(id, dto);
  }

  @MessagePattern(TicketSalesMessagePatterns.DELETE)
  delete(@Payload() id: string) {
    return this.ticketSalesService.delete(id);
  }

  @MessagePattern(TicketSalesMessagePatterns.FIND_BY_ID_IF_AVAILABLE)
  findByIdIfAvailable(@Payload() id: string) {
    return this.ticketSalesService.findByIdIfAvailable(id);
  }

  @MessagePattern(TicketSalesMessagePatterns.RESERVE_TICKETS)
  async reserveTicket(
    @Payload()
    { id, quantity }: ReserveTicketsMessageDto,
  ): Promise<ReserveTicketSalesResponse> {
    const ticketSales = await this.findByIdIfAvailable(id);
    const reserveResults = await this.ticketSalesService.reserveTickets(
      id,
      quantity,
    );

    return {
      ...ticketSales,
      sold: reserveResults.sold,
    };
  }

  @MessagePattern(TicketSalesMessagePatterns.RELEASE_TICKETS)
  releaseTickets(
    @Payload()
    { id, quantity }: ReleaseTicketsMessageDto,
  ) {
    return this.ticketSalesService.releaseTickets(id, quantity);
  }

  @MessagePattern(TicketSalesMessagePatterns.FIND_ONE_WITH_EVENT_DETAILS)
  findOneWithEventDetails(
    @Payload() id: string,
  ): Promise<TicketSalesWithEventDetails> {
    return this.ticketSalesService.findOneWithEventDetails(id);
  }
}
