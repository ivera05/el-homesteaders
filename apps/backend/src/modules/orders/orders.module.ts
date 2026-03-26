import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '@modules/orders/entities/order.entity';
import { OrderItemEntity } from '@/modules/orders/entities/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, OrderItemEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class OrdersModule {}
