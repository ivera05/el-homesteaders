import { ProductEntity } from '@/modules/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import CategoryEntity from './category.entity';

@Entity('category_products')
export class CategoryProductsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'sort_order' })
  sortOrder: number;

  @ManyToOne(() => CategoryEntity, (category) => category.categoryProducts, {
    nullable: false,
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @ManyToOne(() => ProductEntity, (product) => product.categoryProducts, {
    nullable: false,
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
}
