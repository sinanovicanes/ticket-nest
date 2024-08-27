import { OmitType } from '@nestjs/swagger';
import { FindTicketSalesOptionsDto } from './find-ticket-sales-options.dto';

export class FindTicketSalesQueryDto extends OmitType(
  FindTicketSalesOptionsDto,
  ['selectFields'],
) {}
