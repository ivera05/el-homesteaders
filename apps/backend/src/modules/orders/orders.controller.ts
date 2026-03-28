import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { OrdersService } from '@modules/orders/orders.service';
import { ClientApiKey } from '@modules/api-keys/decorators/api-key.decorator';
import { QueryOrdersDto } from '@modules/orders/dto/query-orders.dto';
import { PaginatedOrdersDto } from '@modules/orders/dto/paginated-orders.dto';

@ApiTags('Orders')
@ApiSecurity('x-api-key')
@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ClientApiKey()
  @Get()
  @ApiOperation({ summary: 'Get orders with pagination and optional filters' })
  @ApiResponse({ status: 200, description: 'List of orders, if any' })
  findAll(@Query() query: QueryOrdersDto): Promise<PaginatedOrdersDto> {
    return this.ordersService.findAll(query);
  }
}
