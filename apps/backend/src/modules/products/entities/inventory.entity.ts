import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ProductEntity as ProductEntity } from '@modules/products/entities/product.entity';

@Entity('inventories')
export class InventoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => ProductEntity, (product) => product.inventory)
  @JoinColumn()
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

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
