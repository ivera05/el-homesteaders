import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryOrdersDto {
  @ApiPropertyOptional({ description: 'Filter orders by user ID' })
  @IsOptional()
  @IsString()
  userId?: string;

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