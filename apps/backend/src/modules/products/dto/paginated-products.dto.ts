import { ApiProperty } from '@nestjs/swagger';
import { PaginatedMetaDto } from '@/common/dto/paginated-meta.dto';
import { ProductDto } from '@modules/products/dto/product.dto';

export class PaginatedProductsDto {
  @ApiProperty({ type: [ProductDto] })
  items: ProductDto[];

  @ApiProperty({ type: PaginatedMetaDto })
  meta: PaginatedMetaDto;
}
