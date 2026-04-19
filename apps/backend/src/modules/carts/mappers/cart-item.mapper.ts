import { CartItemDto } from '@modules/carts/dto/cart-item.dto';
import { CartItemEntity } from '@modules/carts/entities/cart-item.entity';
import { CartEntity } from '@modules/carts/entities/cart.entity';
import { ProductMapper } from '@modules/products/mappers/product.mapper';

export class CartItemMapper {
  static toEntity(dto: CartItemDto): CartItemEntity {
    return {
      ...dto,
      cart: { id: dto.cartId } as CartEntity,
      product: ProductMapper.toEntity(dto.product),
    };
  }

  static toDto(entity: CartItemEntity): CartItemDto {
    return {
      setCookie: false,
      ...entity,
      cartId: entity.cart.id,
      product: ProductMapper.toDto(entity.product),
    };
  }
}
