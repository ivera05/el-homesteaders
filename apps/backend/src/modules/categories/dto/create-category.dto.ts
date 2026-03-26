import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Sweets',
    description: 'The name of the category',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Delicious sweets for all ages',
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

  @ApiProperty({
    example: 'parent-category-id',
    description: 'The ID of the parent category',
  })
  @IsString()
  @IsOptional()
  parentId?: string;
}
