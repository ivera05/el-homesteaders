import { ApiProperty } from '@nestjs/swagger';
import { PaginatedMetaDto } from '@/common/dto/paginated-meta.dto';
import { CategoryDto } from '@modules/categories/dto/category.dto';

export class PaginatedCategoryDto {
  @ApiProperty({ type: [CategoryDto] })
  items: CategoryDto[];

  @ApiProperty({ type: PaginatedMetaDto })
  meta: PaginatedMetaDto;
}
