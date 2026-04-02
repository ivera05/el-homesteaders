import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, MoreThan, Repository } from 'typeorm';
import { ProductEntity } from '@modules/products/entities/product.entity';
import { PaginatedProductsDto } from '@modules/products/dto/paginated-products.dto';
import { QueryProductDto } from '@modules/products/dto/query-product.dto';
import { ProductMapper } from '@modules/products/mappers/product.mapper';
import { CreateProductDto } from '@modules/products/dto/create-product.dto';
import { UpdateProductDto } from '@modules/products/dto/update-product.dto';
import { ProductDto } from '@modules/products/dto/product.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {
  }

  async save(
    product: CreateProductDto | UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.productRepository.save(ProductMapper.toEntity(product));
  }

  async findOneBySlug(slug: string): Promise<ProductDto> {
    const product = await this.productRepository.findOne({
      where: { slug },
      relations: ['inventory'],
    });

    if (!product) {
      throw new NotFoundException(`Product with slug ${slug} not found`);
    }

    return ProductMapper.toDto(product);
  }

  async findAll(query: QueryProductDto): Promise<PaginatedProductsDto> {
    const { slugs, isFeatured, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where = isFeatured
      ? [
        {
          ...(isFeatured
            ? {
              isFeatured: true,
              featuredUntil: IsNull(),
            }
            : {}),
        },
        {
          ...(isFeatured
            ? {
              isFeatured: true,
              featuredUntil: MoreThan(new Date()),
            }
            : {}),
        },
      ]
      : slugs && slugs.length > 1
        ? {
          slug: In(slugs),
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
