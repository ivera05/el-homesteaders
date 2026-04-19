import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from '@modules/carts/entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItemEntity } from '@modules/carts/entities/cart-item.entity';
import { AddToCartDto } from '@modules/carts/dto/add-to-cart.dto';
import { CartItemDto } from '@modules/carts/dto/cart-item.dto';
import { CartItemMapper } from '@modules/carts/mappers/cart-item.mapper';
import { ProductDto } from '@modules/products/dto/product.dto';
import { CartDto } from '@modules/carts/dto/cart.dto';
import { CartMapper } from '@modules/carts/mappers/cart.mapper';
import { UserDto } from '@modules/users/dto/user.dto';
import { ProductMapper } from '@modules/products/mappers/product.mapper';

@Injectable()
export class CartsRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>,
  ) {}

  async findById(id: string): Promise<CartDto> {
    const cart = await this.cartRepository.findOne({
      where: { id },
      relations: ['items', 'items.product', 'items.cart', 'user'],
    });

    if (!cart) {
      throw new Error('Cart not found');
    }

    return CartMapper.toDto(cart);
  }

  async addToCart(
    req: AddToCartDto & { cartId?: string },
    prod: ProductDto,
    user?: UserDto,
  ): Promise<CartItemDto> {
    const quantity = req.quantity;
    const existingCartId = req.cartId;
    let cartId = existingCartId;
    let cart: CartEntity | null = null;

    if (cartId) {
      cart = await this.cartRepository.findOne({
        where: { id: cartId },
        relations: ['items', 'items.product', 'items.cart'],
      });
    }

    if (!cart && user) {
      cart = await this.cartRepository.findOne({
        where: { user: { id: user.id } },
        relations: ['items', 'items.product'],
      });
    }

    if (!cart) {
      cart = this.cartRepository.create({
        user: user ? { id: user.id } : undefined,
        items: [],
      });
      cart = await this.cartRepository.save(cart);
    }

    const existingItem = cart.items?.find(
      (item) => item.product.id === prod.id,
    );

    let savedItem: CartItemEntity;
    if (existingItem) {
      existingItem.quantity += quantity;
      savedItem = await this.cartItemRepository.save(existingItem);
    } else {
      const newItem = this.cartItemRepository.create({
        cart,
        product: ProductMapper.toEntity(prod),
        quantity,
      });
      savedItem = await this.cartItemRepository.save(newItem);

      // Add the new item to the cart's items
      cart.items.push(savedItem);
      await this.cartRepository.save(cart);
    }

    const result = CartItemMapper.toDto(savedItem);
    // If we didn't have a cartId initially, tell the caller to set one
    result.setCookie = !existingCartId;
    // Ensure the DTO carries the cartId so the controller knows what value to set
    result.cartId = cart.id;
    return result;
  }
}
