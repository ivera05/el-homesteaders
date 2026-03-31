import { Module } from '@nestjs/common';
import { ProductsService } from '@modules/products/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@modules/products/entities/product.entity';
import { InventoryEntity } from '@modules/products/entities/inventory.entity';
import { ProductsRepository } from '@modules/products/products.repository';
import { ProductsController } from '@modules/products/products.controller';
import { ProductStatsEntity } from '@modules/products/entities/product-stats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryEntity, ProductEntity, ProductStatsEntity])],
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
