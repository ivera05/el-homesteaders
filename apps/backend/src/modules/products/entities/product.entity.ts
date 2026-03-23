import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InventoryEntity } from '@modules/products/entities/inventory.entity';

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

  @Column()
  weightUnit: string;

  @Column('jsonb', { nullable: true })
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
}
