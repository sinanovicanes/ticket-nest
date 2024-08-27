import { PartialType } from '@nestjs/swagger';
import { CreateTicketSalesDto } from './create-ticket-sales.dto';

export class UpdateTicketSalesDto extends PartialType(CreateTicketSalesDto) {}
