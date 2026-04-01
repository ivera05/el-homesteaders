import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, Matches } from 'class-validator';

export class CategoryMenuDto {
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

  @ApiPropertyOptional({
    description: 'The child categories of the category',
  })
  @IsUUID('all', { each: true })
  @IsOptional()
  children?: CategoryMenuDto[];
}
