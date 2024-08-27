import { Test, TestingModule } from '@nestjs/testing';
import { TicketSalesController } from './ticket-sales.controller';
import { TicketSalesService } from './ticket-sales.service';

describe('TicketSalesController', () => {
  let ticketSalesController: TicketSalesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TicketSalesController],
      providers: [TicketSalesService],
    }).compile();

    ticketSalesController = app.get<TicketSalesController>(TicketSalesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ticketSalesController.getHello()).toBe('Hello World!');
    });
  });
});
