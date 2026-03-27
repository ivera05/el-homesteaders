import { Type } from 'class-transformer';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString, IsUUID,
  ValidateNested,
} from 'class-validator';
import { NutritionalInfoDto } from '@modules/products/dto/nutritional-info.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({
    example: '35a65c2c-3d8b-4649-9ae5-e762ab86fcdd',
    description: 'The unique identifier for the product',
  })
  @IsUUID()
  @IsOptional()
  id: string;

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

  @ApiProperty({
    description: 'Nutritional information for the candy',
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => NutritionalInfoDto)
  nutritionalInfo?: NutritionalInfoDto;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'The date the product was created',
  })
  @IsString()
  createdAt: Date;
}
