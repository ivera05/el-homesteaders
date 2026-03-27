import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class OrderItemDto {
  @ApiProperty({
    example: 'df4bc8e1-fb9d-47ea-b020-fee7839c947f',
    description: 'The id of the order',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'df4bc8e1-fb9d-47ea-b020-fee7839c947f',
    description: 'The id of the product ordered',
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

  @ApiProperty({
    example: '2023-09-20T12:00:00Z',
    description: 'Order creation date',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    example: '2023-09-20T12:00:00Z',
    description: 'Order completion date',
  })
  @IsDate()
  updatedAt: Date;
}
