import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from '@modules/products/entities/product.entity';

@Entity('product_stats')
export class ProductStatsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'view_count', type: 'integer', default: 0 })
  viewCount: number;

  @Column({ name: 'sold_count', type: 'integer', default: 0 })
  soldCount: number;

  @Column({ name: 'average_rating', type: 'float', default: 0 })
  averageRating: number;

  @Column({ name: 'total_reviews', type: 'integer', default: 0 })
  totalReviews: number;

  @Column({ name: 'last_viewed_at', type: 'timestamp', nullable: true })
  lastViewedAt: Date;

  @Column({ name: 'last_sold_at', type: 'timestamp', nullable: true })
  lastSoldAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => ProductEntity, (product) => product.productStats)
  @JoinColumn({ name: 'product_id' })
  product: string;
}
