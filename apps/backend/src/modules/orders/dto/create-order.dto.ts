import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateOrderItemDto } from '@modules/orders/dto/create-order-item.dto';

export class CreateOrderDto {
  @ApiProperty({
    example: 'df4bc8e1-fb9d-47ea-b020-fee7839c947f',
    description: 'The id of the user who placed the order',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'pending', description: 'The order status' })
  @IsString()
  status: string;

  @ApiProperty({
    example: '50OFF',
    description: 'Discount code applied to the order',
    required: false,
  })
  @IsOptional()
  @IsString()
  discountCode?: string;

  @ApiProperty({ example: 29.87, description: 'Subtotal amount' })
  @IsNumber()
  subtotal: number;

  @ApiProperty({ example: 0.0, description: 'Discount amount' })
  @IsNumber()
  discount: number;

  @ApiProperty({ example: 8.42, description: 'Shipping cost' })
  @IsNumber()
  shipping: number;

  @ApiProperty({ example: 1.83, description: 'Tax amount' })
  @IsNumber()
  tax: number;

  @ApiProperty({ example: 23.83, description: 'Total amount' })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({
    description: 'Order items',
    type: [CreateOrderItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
