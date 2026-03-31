import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, MoreThan, Repository } from 'typeorm';
import { ProductEntity } from '@modules/products/entities/product.entity';
import { PaginatedProductsDto } from '@modules/products/dto/paginated-products.dto';
import { QueryProductsDto } from '@modules/products/dto/query-products.dto';
import { ProductMapper } from '@modules/products/mappers/product.mapper';
import { CreateProductDto } from '@modules/products/dto/create-product.dto';
import { UpdateProductDto } from '@modules/products/dto/update-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async save(
    product: CreateProductDto | UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.productRepository.save(ProductMapper.toEntity(product));
  }

  async findOneById(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['inventory', 'categoryProducts', 'categoryProducts.category'],
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async findAll(query: QueryProductsDto): Promise<PaginatedProductsDto> {
    const { categoryId, isFeatured, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where = isFeatured
      ? [
          {
            ...(categoryId
              ? {
                  categoryProducts: {
                    category: {
                      id: categoryId,
                    },
                  },
                }
              : {}),
            isFeatured: true,
            featuredUntil: IsNull(),
          },
          {
            ...(categoryId
              ? {
                  categoryProducts: {
                    category: {
                      id: categoryId,
                    },
                  },
                }
              : {}),
            isFeatured: true,
            featuredUntil: MoreThan(new Date()),
          },
        ]
      : categoryId
        ? {
            categoryProducts: {
              category: {
                id: categoryId,
              },
            },
          }
        : {};

    const [items, total] = await this.productRepository.findAndCount({
      where,
      relations: ['inventory', 'categoryProducts', 'categoryProducts.category'],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return {
      items: items.map((product) => ProductMapper.toDto(product)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
