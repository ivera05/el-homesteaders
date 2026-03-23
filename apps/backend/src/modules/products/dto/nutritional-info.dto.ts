import { IsArray, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NutritionalInfoDto {
  @ApiProperty({
    example: '70',
    description: 'The calories of the product in kcal',
  })
  @IsNumber()
  calories: number;

  @ApiProperty({
    example: '1 Serving Size Per Pouch',
    description: 'The serving size of the product',
  })
  @IsString()
  servingSize: string;

  @ApiProperty({
    example: '1g',
    description: 'The protein content of the product',
  })
  @IsString()
  protein: string;

  @ApiProperty({
    example: '10g',
    description: 'The fat content of the product',
  })
  @IsString()
  fat: string;

  @ApiProperty({
    example: '1g',
    description: 'The sugar content of the product',
  })
  @IsString()
  sugar: string;

  @ApiProperty({
    example: '10g',
    description: 'The carbohydrate content of the product',
  })
  @IsString()
  carbohydrates: string;

  @ApiProperty({
    example: [
      'corn syrup',
      'sugar',
      'gelatin',
      'citric acid',
      'natural/artificial flavors',
      'artificial colors',
    ],
    description: 'The ingredients required to make the product',
  })
  @IsArray()
  @IsString({ each: true })
  ingredients: string[];
}
