import { ProductDto } from '@modules/products/dto/product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CartItemDto {
  @ApiProperty({
    example: 'cart-item-id',
    description: 'The ID of the cart item',
  })
  id: string;

  @ApiProperty({ example: 'cart-id', description: 'The ID of the cart' })
  cartId: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the cookie was set',
  })
  setCookie: boolean;

  @ApiProperty({ type: ProductDto, description: 'The product in the cart' })
  product: ProductDto;

  @ApiProperty({
    example: 1,
    description: 'The quantity of the product in the cart',
  })
  quantity: number;

  @ApiProperty({
    example: '2023-09-20T12:00:00Z',
    description: 'The date and time the cart item was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-09-20T12:00:00Z',
    description: 'The date and time the cart item was last updated',
  })
  updatedAt: Date;
}
