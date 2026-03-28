import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '@modules/orders/orders.repository';
import { CreateOrderDto } from '@modules/orders/dto/create-order.dto';
import { OrderMapper } from '@modules/orders/mappers/order.mapper';
import { QueryOrdersDto } from '@modules/orders/dto/query-orders.dto';
import { PaginatedOrdersDto } from '@modules/orders/dto/paginated-orders.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = OrderMapper.toEntity(createOrderDto);
    return this.ordersRepository.save(order);
  }

  async findAll(query: QueryOrdersDto): Promise<PaginatedOrdersDto> {
    return this.ordersRepository.findAll(query);
  }
}
