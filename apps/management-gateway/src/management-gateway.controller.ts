import { Controller, Get } from '@nestjs/common';
import { ManagementGatewayService } from './management-gateway.service';

@Controller()
export class ManagementGatewayController {
  constructor(private readonly managementGatewayService: ManagementGatewayService) {}

  @Get()
  getHello(): string {
    return this.managementGatewayService.getHello();
  }
}
