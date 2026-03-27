import { ApiProperty } from '@nestjs/swagger';
import { OrderDto } from '@modules/orders/dto/order.dto';

export class PaginatedMetaDto {
  @ApiProperty({ example: 10 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 20 })
  limit: number;

  @ApiProperty({ example: 1 })
  totalPages: number;
}

export class PaginatedOrdersResponseDto {
  @ApiProperty({ type: [OrderDto] })
  data: OrderDto[];

  @ApiProperty({ type: PaginatedMetaDto })
  meta: PaginatedMetaDto;
}
