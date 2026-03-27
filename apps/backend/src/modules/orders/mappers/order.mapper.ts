import { CreateOrderDto } from '@modules/orders/dto/create-order.dto';
import { CreateOrderItemDto } from '@modules/orders/dto/create-order-item.dto';
import { OrderEntity } from '@modules/orders/entities/order.entity';
import { OrderItemEntity } from '@modules/orders/entities/order-item.entity';
import { OrderStatus } from '@modules/orders/entities/order.entity';
import { ProductEntity } from '@modules/products/entities/product.entity';
import { UserEntity } from '@modules/users/entities/user.entity';
import { OrderDto } from '@modules/orders/dto/order.dto';
import { OrderItemDto } from '@modules/orders/dto/order-item.dto';

export class OrderMapper {
  static toEntity(dto: CreateOrderDto): OrderEntity {
    const order = new OrderEntity();

    order.user = { id: dto.userId } as UserEntity;
    order.status = dto.status as OrderStatus;
    order.discountCode = dto.discountCode ?? '';
    order.subtotal = dto.subtotal;
    order.discount = dto.discount;
    order.shipping = dto.shipping;
    order.tax = dto.tax;
    order.totalAmount = dto.totalAmount;

    order.items = dto.items.map((item) => this.toOrderItemEntity(item));

    return order;
  }

  static toDto(order: OrderEntity): OrderDto {
    return {
      id: order.id,
      userId: order.user.id,
      status: order.status,
      discountCode: order.discountCode,
      subtotal: order.subtotal,
      discount: order.discount,
      shipping: order.shipping,
      tax: order.tax,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      items: order.items.map((item) => this.toOrderItemDto(item)),
    } as OrderDto;
  }

  static toOrderItemEntity(dto: CreateOrderItemDto): OrderItemEntity {
    const item = new OrderItemEntity();

    item.product = { id: dto.productId } as ProductEntity;
    item.productName = dto.productName;
    item.price = dto.price;
    item.quantity = dto.quantity;
    item.subtotal = dto.subtotal;
    item.discount = dto.discount;
    item.tax = dto.tax;
    item.total = dto.total;

    return item;
  }

  static toOrderItemDto(item: OrderItemEntity): OrderItemDto {
    return {
      productId: item.product.id,
      productName: item.productName,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.subtotal,
      discount: item.discount,
      tax: item.tax,
      total: item.total,
    } as OrderItemDto;
  }
}
