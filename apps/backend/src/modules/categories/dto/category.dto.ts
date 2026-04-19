import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CategoryProductDto } from '@modules/categories/dto/category-product.dto';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';

export class CategoryDto {
  @ApiProperty({
    example: 'category-id',
    description: 'The ID of the category',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'sweets',
    description: 'The slug of the category',
  })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug must be a valid kebab-case string',
  })
  @IsString()
  slug: string;

  @ApiProperty({
    example: 'Sweets',
    description: 'The name of the category',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Delicious sweets for all ages.',
    description: 'The description of the category',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the category is active',
  })
  @IsBoolean()
  isActive: boolean;

  @ApiPropertyOptional({
    example: 'parent-category-id',
    description: 'The ID of the parent category',
  })
  @IsUUID()
  @IsOptional()
  parentId?: string;

  @ApiPropertyOptional({
    description: 'The child categories of the category',
  })
  @IsUUID('all', { each: true })
  @IsOptional()
  children?: string[];

  @ApiPropertyOptional({
    type: () => CategoryProductDto,
    description: 'The products associated with the category',
  })
  @IsOptional()
  @IsArray()
  products?: CategoryProductDto[];

  @ApiProperty({
    example: '2026-03-29T10:00:00.000Z',
    description: 'Category creation date',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    example: '2026-03-29T12:00:00.000Z',
    description: 'Category last update date',
  })
  @IsDate()
  updatedAt: Date;
}
