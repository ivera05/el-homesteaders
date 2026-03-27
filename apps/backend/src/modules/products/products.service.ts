import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '@modules/products/products.repository';
import { ProductDto } from '@modules/products/dto/product.dto';
import { ProductEntity } from '@modules/products/entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(productDto: ProductDto) {
    const product = this.toProductEntity({
      ...productDto,
    });
    return this.productsRepository.save(product);
  }

  async update(id: string, productDto: ProductDto) {
    const product = this.toProductEntity({
      ...productDto,
    });
    return this.productsRepository.save(product);
  }

  async findOne(id: string) {
    return this.productsRepository.findOneById(id);
  }

  async findAll() {
    return this.productsRepository.findAll();
  }

  toProductEntity(dto: ProductDto): ProductEntity {
    return {
      ...dto,
    } as ProductEntity;
  }
}
