import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InventoryEntity } from '@modules/products/entities/inventory.entity';
import { CategoryProductsEntity } from '@/modules/categories/entities/category-products.entity';
import { OrderItemEntity } from '@modules/orders/entities/order-item.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column()
  sku: string;

  @Column('decimal', { precision: 10, scale: 2 })
  weight: number;

  @Column({ name: 'weight_unit'})
  weightUnit: string;

  @Column('jsonb', { nullable: true, name: 'nutritional_info' })
  nutritionalInfo: {
    calories: number;
    servingSize: string;
    protein: string;
    fat: string;
    sugar: string;
    carbohydrates: string;
    ingredients: string[];
  };

  @OneToOne(() => InventoryEntity, (inventory) => inventory.product)
  inventory: InventoryEntity;

  @OneToMany(
    () => CategoryProductsEntity,
    (categoryProduct) => categoryProduct.product,
  )
  categoryProducts: CategoryProductsEntity[];

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
  orderItems: OrderItemEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
