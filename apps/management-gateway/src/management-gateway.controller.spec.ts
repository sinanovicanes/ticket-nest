import { Test, TestingModule } from '@nestjs/testing';
import { ManagementGatewayController } from './management-gateway.controller';
import { ManagementGatewayService } from './management-gateway.service';

describe('ManagementGatewayController', () => {
  let managementGatewayController: ManagementGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ManagementGatewayController],
      providers: [ManagementGatewayService],
    }).compile();

    managementGatewayController = app.get<ManagementGatewayController>(ManagementGatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(managementGatewayController.getHello()).toBe('Hello World!');
    });
  });
});
