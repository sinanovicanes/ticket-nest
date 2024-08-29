import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscountsService {
  getHello(): string {
    return 'Hello World!';
  }
}
