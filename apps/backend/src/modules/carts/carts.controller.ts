import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { CartsService } from '@modules/carts/carts.service';
import { AddToCartDto } from '@modules/carts/dto/add-to-cart.dto';
import { ClientApiKey } from '@modules/api-keys/decorators/api-key.decorator';
import { CartItemDto } from '@modules/carts/dto/cart-item.dto';
import { User } from '@modules/auth/decorators/user.decorator';

const CART_COOKIE_NAME = 'cart_id';

@ApiTags('Carts')
@ApiSecurity('x-api-key')
@Controller('api/carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @ClientApiKey()
  @Post('/add')
  @ApiOperation({ summary: 'Add an item to the cart' })
  @ApiResponse({
    status: 200,
    type: CartItemDto,
    description: 'Item added to cart',
  })
  async addItem(
    @User('userId') userId: string | undefined,
    @Body() addToCartDto: AddToCartDto,
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const existingCartId = req.cookies[CART_COOKIE_NAME];
    const result = await this.cartsService.addToCart(
      addToCartDto,
      userId,
      existingCartId,
    );

    // If we have a cartId and it's different from what's in the cookie (or cookie is missing)
    if (result.cartId && existingCartId !== result.cartId) {
      const isProd = process.env.NODE_ENV === 'production';
      response.cookie(CART_COOKIE_NAME, result.cartId, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
    }

    return result;
  }
}
