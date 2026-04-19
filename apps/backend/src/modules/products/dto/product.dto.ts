import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  IsDateString,
  ValidateNested,
  Matches,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { NutritionalInfoDto } from './nutritional-info.dto';
import { InventoryDto } from './inventory.dto';

export class ProductDto {
  @ApiProperty({
    example: '35a65c2c-3d8b-4649-9ae5-e762ab86fcdd',
    description: 'The unique identifier for the product',
  })
  @IsUUID()
  id?: string | undefined;

  @ApiPropertyOptional({ type: () => InventoryDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => InventoryDto)
  inventory?: InventoryDto;

  @ApiProperty({
    example: 'freeze-dried-candied-worm-bag',
    description: 'The slug for the product',
  })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug must be a valid kebab-case string',
  })
  @IsString()
  slug: string;

  @ApiProperty({
    example: 'Freeze Dried Sour Worms',
    description: 'The name of the candy',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'A delicious candy',
    description: 'The description of the candy',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 8.99,
    description: 'The price of the candy',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'https://cdn.elh.com/freeze-dried-candied-worm-bag.jpg',
    description: 'The URL of the candy image',
  })
  @IsString()
  imageUrl: string;

  @ApiProperty({
    example: 'ELH-001',
    description: 'The unique identifier for the candy',
  })
  @IsString()
  sku: string;

  @ApiProperty({ example: 8.02, description: 'The weight of the candy' })
  @IsNumber()
  weight: number;

  @ApiProperty({
    example: 'oz',
    description: 'The unit of weight for the candy, e.g., oz, g',
  })
  @IsString()
  weightUnit: string;

  @ApiPropertyOptional({
    type: () => NutritionalInfoDto,
    description: 'Nutritional information for the candy',
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => NutritionalInfoDto)
  nutritionalInfo?: NutritionalInfoDto;

  @ApiProperty({
    example: true,
    description: 'Indicates if the product is featured',
  })
  @IsBoolean()
  isFeatured: boolean;

  @ApiPropertyOptional({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Indicates until when the product is featured',
  })
  @IsOptional()
  featuredUntil?: Date;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'The date the product was created',
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'The date the product was last updated',
  })
  @IsDateString()
  updatedAt: Date;
}
