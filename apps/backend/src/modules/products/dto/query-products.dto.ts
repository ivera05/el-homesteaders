import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryProductsDto {
  @ApiPropertyOptional({ description: 'Filter products by category ID' })
  @IsOptional()
  @IsString()
  categoryId?: string;

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