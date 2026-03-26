import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { CategoryProductsEntity } from './category-products.entity';

@Entity('categories')
class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  isActive: boolean;

  @ManyToOne(() => CategoryEntity, (category) => category.children, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parent: CategoryEntity;

  @OneToMany(() => CategoryEntity, (category) => category.children)
  children: CategoryEntity[];

  @OneToMany(
    () => CategoryProductsEntity,
    (categoryProduct) => categoryProduct.category,
  )
  categoryProducts: CategoryProductsEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default CategoryEntity;
