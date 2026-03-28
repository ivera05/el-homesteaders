import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ProductEntity as ProductEntity } from '@modules/products/entities/product.entity';

@Entity('inventories')
export class InventoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => ProductEntity, (product) => product.inventory)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column({ name: 'available_qty', default: 0 })
  availableQty: number;

  @Column({ name: 'pending_ship_qty', default: 0 })
  pendingShipQty: number;

  @Column({ name: 'shipped_qty', default: 0 })
  shippedQty: number;

  @Column({ name: 'processing_qty', default: 0 })
  processingQty: number;

  @Column({ name: 'low_stock_threshold', default: 5 })
  lowStockThreshold: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
