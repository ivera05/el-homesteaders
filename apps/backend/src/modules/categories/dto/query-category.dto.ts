import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class QueryCategoryDto {
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
