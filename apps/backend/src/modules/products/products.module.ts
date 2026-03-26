import { Module } from '@nestjs/common';
import { ProductsService } from '@modules/products/products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@modules/products/entities/product.entity';
import { InventoryEntity } from '@modules/products/entities/inventory.entity';
import { ProductsRepository } from '@modules/products/products.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, InventoryEntity])],
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
