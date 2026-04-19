import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from '@modules/products/products.service';
import { ProductDto } from '@modules/products/dto/product.dto';
import {
  AdminAccessApiKey,
  ClientApiKey,
} from '@modules/api-keys/decorators/api-key.decorator';
import { QueryProductDto } from '@modules/products/dto/query-product.dto';
import { PaginatedProductsDto } from '@modules/products/dto/paginated-products.dto';

@ApiTags('Products')
@ApiSecurity('x-api-key')
@Controller('/api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @AdminAccessApiKey()
  @Post()
  @ApiOperation({ summary: 'Create a new product and its inventory' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  create(@Body() productDto: ProductDto) {
    return this.productsService.create(productDto);
  }

  @ClientApiKey()
  @Get()
  @ApiOperation({
    summary:
      'Get all products with stock levels paginated and optionally filtered',
  })
  @ApiResponse({
    status: 200,
    type: PaginatedProductsDto,
    description: 'List of products, if any',
  })
  findAll(@Query() query: QueryProductDto) {
    return this.productsService.findAll(query);
  }

  @ClientApiKey()
  @Get(':slug')
  @ApiOperation({ summary: 'Get a single product by slug' })
  @ApiResponse({
    status: 200,
    type: ProductDto,
    description: 'Product details',
  })
  findOne(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }
}
