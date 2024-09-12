import {
  CreateTicketDto,
  FindOneTicketMessageDto,
  FindTicketsOptionsDto,
  TicketsEventPatterns,
  TicketsMessagePatterns,
  UpdateTicketMessageDto,
} from '@app/contracts/tickets';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TicketsService } from './tickets.service';
import { TicketsMicroService } from '@app/microservices';

@Controller()
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly ticketsMicroService: TicketsMicroService,
  ) {}

  @MessagePattern(TicketsMessagePatterns.CREATE)
  async create(@Payload() dto: CreateTicketDto) {
    const ticket = await this.ticketsService.create(dto);

    this.ticketsMicroService.emit(TicketsEventPatterns.CREATED, ticket);

    return ticket;
  }

  @MessagePattern(TicketsMessagePatterns.CREATE_MANY)
  createMany(@Payload() dtos: CreateTicketDto[]) {
    return this.ticketsService.createMany(dtos);
  }

  @MessagePattern(TicketsMessagePatterns.CREATE_DUPLICATES)
  async createDuplicates(
    @Payload() { dto, quantity }: { dto: CreateTicketDto; quantity: number },
  ) {
    const ticketIds = await this.ticketsService.createDuplicates(dto, quantity);

    this.ticketsMicroService.emit(
      TicketsEventPatterns.CREATED_DUPLICATES,
      ticketIds,
    );

    return ticketIds;
  }

  @MessagePattern(TicketsMessagePatterns.FIND_MANY)
  findMany(@Payload() options: FindTicketsOptionsDto) {
    return this.ticketsService.findMany(options);
  }

  @MessagePattern(TicketsMessagePatterns.FIND_ONE)
  findOne(@Payload() { id, selectFields }: FindOneTicketMessageDto) {
    return this.ticketsService.findOne(id, selectFields);
  }

  @MessagePattern(TicketsMessagePatterns.FIND_ONE_WITH_DETAILS)
  findOneWithDetails(@Payload() { id }: FindOneTicketMessageDto) {
    return this.ticketsService.findOneWithDetails(id);
  }

  @MessagePattern(TicketsMessagePatterns.UPDATE)
  update(@Payload() { id, dto }: UpdateTicketMessageDto) {
    return this.ticketsService.updateOne(id, dto);
  }

  @MessagePattern(TicketsMessagePatterns.DELETE)
  delete(@Payload() id: string) {
    return this.ticketsService.delete(id);
  }
}
