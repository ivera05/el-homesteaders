import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartItemEntity } from '@modules/carts/entities/cart-item.entity';
import { UserEntity } from '@modules/users/entities/user.entity';

@Entity('carts')
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, (user) => user.cart, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @OneToMany(() => CartItemEntity, (item) => item.cart, { cascade: true })
  items: CartItemEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
