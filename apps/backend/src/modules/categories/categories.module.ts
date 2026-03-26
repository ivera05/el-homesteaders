import { Module } from '@nestjs/common';
import { CategoriesService } from '@modules/categories/categories.service';
import CategoryEntity from '@modules/categories/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesRepository } from '@modules/categories/category.repository';
import { CategoryProductsEntity } from '@modules/categories/entities/category-products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, CategoryProductsEntity])],
  providers: [CategoriesService, CategoriesRepository],
  exports: [CategoriesService],
})
export class CategoriesModule {}
