import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { DatabaseModule } from '@app/database';
import { PaymentsController } from './payments.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
