import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '@modules/products/products.repository';
import { PaginatedProductsDto } from '@modules/products/dto/paginated-products.dto';
import { QueryProductsDto } from '@modules/products/dto/query-products.dto';
import { CreateProductDto } from '@modules/products/dto/create-product.dto';
import { UpdateProductDto } from '@modules/products/dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(productDto: CreateProductDto) {
    return this.productsRepository.save(productDto);
  }

  async update(productDto: UpdateProductDto) {
    return this.productsRepository.save(productDto);
  }

  async findOne(id: string) {
    return this.productsRepository.findOneById(id);
  }

  async findAll(query: QueryProductsDto): Promise<PaginatedProductsDto> {
    return this.productsRepository.findAll(query);
  }
}
