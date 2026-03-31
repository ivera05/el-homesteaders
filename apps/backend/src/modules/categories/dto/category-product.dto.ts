import { ApiProperty } from '@nestjs/swagger';

export class CategoryProductDto {
  @ApiProperty({
    example: 'category-id',
    description: 'The ID of the category-product',
  })
  id: string;

  @ApiProperty({
    example: 'category-id',
    description: 'The ID of the category',
  })
  categoryId: string;

  @ApiProperty({
    example: '50',
    description: 'The sort order of the category',
  })
  sortOrder: number;

  @ApiProperty({
    example: 'product-id',
    description: 'The ID of the product',
  })
  productId: string;
}
