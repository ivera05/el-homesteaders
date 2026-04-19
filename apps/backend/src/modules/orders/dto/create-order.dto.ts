import { OrderDto } from '@modules/orders/dto/order.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateOrderDto extends OmitType(OrderDto, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
