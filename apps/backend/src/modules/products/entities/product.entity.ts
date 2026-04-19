import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InventoryEntity } from '@modules/products/entities/inventory.entity';
import { CategoryProductsEntity } from '@/modules/categories/entities/category-products.entity';
import { OrderItemEntity } from '@modules/orders/entities/order-item.entity';
import { ProductStatsEntity } from '@modules/products/entities/product-stats.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ unique: true })
  sku: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column('decimal', { precision: 10, scale: 2 })
  weight: number;

  @Column({ name: 'weight_unit' })
  weightUnit: string;

  @Column('jsonb', { nullable: true, name: 'nutritional_info' })
  nutritionalInfo: {
    calories?: number;
    servingSize?: string;
    protein?: string;
    fat?: string;
    sugar?: string;
    carbohydrates?: string;
    ingredients: string[];
  };

  @Column({ name: 'is_featured', type: 'boolean', default: false })
  isFeatured: boolean;

  @Column({ name: 'featured_rank', type: 'integer', default: 0 })
  featuredRank: number;

  @Column({ name: 'featured_until', type: 'timestamp', nullable: true })
  featuredUntil: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    () => CategoryProductsEntity,
    (categoryProduct) => categoryProduct.product,
  )
  categoryProducts: CategoryProductsEntity[];

  @OneToOne(() => InventoryEntity, (inventory) => inventory.product)
  inventory: InventoryEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
  orderItems: OrderItemEntity[];

  @OneToOne(() => ProductStatsEntity, (productStats) => productStats.product)
  @JoinColumn({ name: 'product_stats_id' })
  productStats: ProductStatsEntity;
}
