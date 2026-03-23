import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '@modules/products/products.repository';
import { CreateProductDto } from '@modules/products/dto/create-product.dto';
import { ProductEntity } from '@modules/products/entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.toProductEntity({
      ...createProductDto,
    });
    return this.productsRepository.save(product);
  }

  async update(id: string, updateProductDto: CreateProductDto) {
    const product = this.toProductEntity({
      ...updateProductDto,
    });
    return this.productsRepository.save(product);
  }

  async findOne(id: string) {
    return this.productsRepository.getProductById(id);
  }

  async findAll() {
    return this.productsRepository.getAllProducts();
  }

  toProductEntity(dto: CreateProductDto): ProductEntity {
    return {
      ...dto,
    } as ProductEntity;
  }
}
