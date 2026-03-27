import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({
    example: '35a65c2c-3d8b-4649-9ae5-e762ab86fcdd',
    description: 'The product id',
  })
  @IsUUID()
  productId: string;

  @ApiProperty({
    example: 'Freeze Dried Sour Worms',
    description: 'The product name snapshot at time of purchase',
  })
  @IsString()
  productName: string;

  @ApiProperty({ example: 8.99, description: 'The product price snapshot' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 1, description: 'The quantity ordered' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 8.99, description: 'The subtotal for this item' })
  @IsNumber()
  subtotal: number;

  @ApiProperty({ example: 0, description: 'The discount for this item' })
  @IsNumber()
  discount: number;

  @ApiProperty({ example: 0.75, description: 'The tax for this item' })
  @IsNumber()
  tax: number;

  @ApiProperty({ example: 9.74, description: 'The total for this item' })
  @IsNumber()
  total: number;
}
