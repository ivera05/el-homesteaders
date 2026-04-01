import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryProductDto {
  @ApiPropertyOptional({ description: 'Array of slugs to filter products by' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  slugs?: string[];

  @ApiPropertyOptional({ description: 'Filter products by featured status' })
  @Transform(({ value }) => Boolean(value))
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ description: 'Page number for pagination' })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsInt()
  @Min(1)
  page: 1;

  @ApiPropertyOptional({ description: 'Number of items per page' })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsInt()
  @Min(1)
  limit: 20;
}