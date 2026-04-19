import { Injectable } from '@nestjs/common';
import { CartsRepository } from '@modules/carts/carts.repository';
import { AddToCartDto } from '@modules/carts/dto/add-to-cart.dto';
import { UsersService } from '@modules/users/users.service';
import { ProductsService } from '@modules/products/products.service';
import { CartItemDto } from '@modules/carts/dto/cart-item.dto';
import { UserDto } from '@modules/users/dto/user.dto';

@Injectable()
export class CartsService {
  constructor(
    private readonly cartsRepository: CartsRepository,
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
  ) {}

  async addToCart(
    req: AddToCartDto,
    userId?: string,
    cartId?: string,
  ): Promise<CartItemDto> {
    let user: UserDto | undefined = undefined;
    if (userId) {
      user = await this.usersService.findById(userId);
    }

    const product = await this.productsService.findBySlug(req.slug);
    if (req.quantity > (product.inventory?.availableQty ?? 0)) {
      throw new Error('Insufficient inventory');
    }

    return await this.cartsRepository.addToCart(
      { ...req, cartId },
      product,
      user,
    );
  }
}
