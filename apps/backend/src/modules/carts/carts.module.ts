import { Module } from '@nestjs/common';
import { CartsService } from '@modules/carts/carts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from '@modules/carts/entities/cart.entity';
import { CartItemEntity } from '@modules/carts/entities/cart-item.entity';
import { CartsRepository } from '@modules/carts/carts.repository';
import { CartsController } from './carts.controller';
import { ProductsModule } from '@modules/products/products.module';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, CartItemEntity]),
    ProductsModule,
    UsersModule,
  ],
  providers: [CartsService, CartsRepository],
  exports: [CartsService],
  controllers: [CartsController],
})
export class CartsModule {}
