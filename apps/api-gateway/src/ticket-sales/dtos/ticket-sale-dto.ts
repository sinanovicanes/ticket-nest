import { TicketSales } from '@app/database';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class TicketSaleDto implements TicketSales {
  @ApiProperty({ description: 'The id of the ticket sale' })
  id: string;

  @ApiProperty({ description: 'The name of the ticket sale' })
  name: string;

  @ApiProperty({ description: 'The description of the ticket sale' })
  description: string;

  @ApiProperty({ description: 'The price of the ticket sale' })
  price: number;

  @ApiProperty({ description: 'The creation date of the ticket sale' })
  createdAt: string;

  @Exclude()
  eventId: string;

  @Exclude()
  quantity: number;

  @Exclude()
  sold: number;

  @Exclude()
  updatedAt: string;

  constructor(partial: Partial<TicketSaleDto> = {}) {
    Object.assign(this, partial);
  }

  static fromEntity(entity: TicketSales): TicketSaleDto {
    return new TicketSaleDto(entity);
  }
}
