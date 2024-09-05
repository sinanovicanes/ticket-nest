import { Injectable } from '@nestjs/common';

@Injectable()
export class ManagementGatewayService {
  getHello(): string {
    return 'Hello World!';
  }
}
