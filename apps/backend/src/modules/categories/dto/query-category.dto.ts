import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class QueryCategoryDto {
  @ApiPropertyOptional({
    description: 'Array of slugs to filter categories by',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  slugs?: string[];

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    type: Number,
  })
  @IsOptional()
  @IsInt()
  page?: number;

  @ApiPropertyOptional({
    description: 'Number of items per page for pagination',
    type: Number,
  })
  @IsOptional()
  @IsInt()
  limit?: number;
}