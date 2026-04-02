import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '@modules/products/products.repository';
import { PaginatedProductsDto } from '@modules/products/dto/paginated-products.dto';
import { QueryProductDto } from '@modules/products/dto/query-product.dto';
import { CreateProductDto } from '@modules/products/dto/create-product.dto';
import { UpdateProductDto } from '@modules/products/dto/update-product.dto';
import { ProductDto } from '@modules/products/dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(productDto: CreateProductDto) {
    return this.productsRepository.save(productDto);
  }

  async update(productDto: UpdateProductDto) {
    return this.productsRepository.save(productDto);
  }

  async findBySlug(slug: string): Promise<ProductDto> {
    return this.productsRepository.findOneBySlug(slug);
  }

  async findAll(query: QueryProductDto): Promise<PaginatedProductsDto> {
    return this.productsRepository.findAll(query);
  }
}
