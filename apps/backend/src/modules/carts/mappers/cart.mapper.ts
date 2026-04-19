import { CartDto } from '@modules/carts/dto/cart.dto';
import { UserEntity } from '@modules/users/entities/user.entity';
import { CartItemMapper } from '@modules/carts/mappers/cart-item.mapper';
import { UserMapper } from '@modules/users/mappers/user.mapper';
import { CartEntity } from '@modules/carts/entities/cart.entity';

export class CartMapper {
  static toEntity(dto: CartDto) {
    return {
      ...dto,
      user: dto.user ? ({ id: dto.user.id } as UserEntity) : undefined,
      items: dto.items.map((item) => CartItemMapper.toEntity(item)),
    };
  }

  static toDto(entity: CartEntity) {
    return {
      ...entity,
      user: entity.user ? UserMapper.toDto(entity.user) : undefined,
      items: entity.items.map((item) => CartItemMapper.toDto(item)),
    };
  }
}
