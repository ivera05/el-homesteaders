import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '@modules/orders/entities/order.entity';
import { Repository } from 'typeorm';
import { QueryOrdersDto } from '@modules/orders/dto/query-orders.dto';
import { PaginatedOrdersDto } from '@modules/orders/dto/paginated-orders.dto';
import { OrderMapper } from '@modules/orders/mappers/order.mapper';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
  ) {}

  async save(order: OrderEntity): Promise<OrderEntity> {
    return this.ordersRepository.save(order);
  }

  async findAll(query: QueryOrdersDto): Promise<PaginatedOrdersDto> {
    const { userId, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const [data, total] = await this.ordersRepository.findAndCount({
      where: userId ? { user: { id: userId } } : {},
      relations: { user: true, items: true },
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
    return {
      items: data.map((order) => OrderMapper.toDto(order)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    } as PaginatedOrdersDto;
  }

  async findOneById(id: string): Promise<OrderEntity> {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }
}
