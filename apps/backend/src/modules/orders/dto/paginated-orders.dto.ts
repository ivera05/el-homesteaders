import { ApiProperty } from '@nestjs/swagger';
import { OrderDto } from '@modules/orders/dto/order.dto';
import { PaginatedMetaDto } from '@/common/dto/paginated-meta.dto';

export class PaginatedOrdersDto {
  @ApiProperty({ type: [OrderDto] })
  items: OrderDto[];

  @ApiProperty({ type: PaginatedMetaDto })
  meta: PaginatedMetaDto;
}
