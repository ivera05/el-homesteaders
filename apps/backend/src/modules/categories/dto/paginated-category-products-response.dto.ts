import { ApiProperty } from '@nestjs/swagger';
import { PaginatedMetaDto } from '@/common/dto/paginated-meta.dto';
import { CategoryDto } from '@modules/categories/dto/category.dto';
import { ProductDto } from '@modules/products/dto/product.dto';

export class PaginatedCategoryProductsResponseDto {
  @ApiProperty({ type: [CategoryDto] })
  items: ProductDto[];

  @ApiProperty({ type: CategoryDto })
  category: CategoryDto;

  @ApiProperty({ type: PaginatedMetaDto })
  meta: PaginatedMetaDto;
}
