import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketSalesService {
  getHello(): string {
    return 'Hello World!';
  }
}
