import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import CategoryEntity from '@modules/categories/entities/category.entity';
import { QueryCategoryDto } from '@modules/categories/dto/query-category.dto';
import { PaginatedCategoryDto } from '@modules/categories/dto/paginated-category.dto';
import { CategoryMapper } from '@modules/categories/mappers/category.mapper';
import { CreateCategoryDto } from '@modules/categories/dto/create-category.dto';
import { UpdateCategoryDto } from '@modules/categories/dto/update-category.dto';
import { CategoryMenuDto } from '@modules/categories/dto/category-menu.dto';
import { ProductMapper } from '@modules/products/mappers/product.mapper';
import { PaginatedCategoryProductsResponseDto } from '@modules/categories/dto/paginated-category-products-response.dto';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async save(
    category: CreateCategoryDto | UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoryRepository.save(CategoryMapper.toEntity(category));
  }

  async findMenu(): Promise<CategoryMenuDto[]> {
    return this.categoryRepository.find({
      select: ['id', 'slug', 'name'],
      where: {
        isActive: true,
        parent: IsNull(),
      },
      relations: {
        children: true,
      },
    });
  }

  async findCategoryProducts(slug: string, query: QueryCategoryDto ): Promise<PaginatedCategoryProductsResponseDto> {
    const { page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const [items, total] = await this.categoryRepository.findAndCount({
      where: { slug },
      relations: [
        'categoryProducts',
        'categoryProducts.product',
      ],
      skip,
      take: limit,
    });

    const categoryProducts = items.flatMap(item => item.categoryProducts)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    return {
      items: categoryProducts.map((cp) => ProductMapper.toDto(cp.product)),
      category: CategoryMapper.toDto(items[0]),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findAll(query: QueryCategoryDto): Promise<PaginatedCategoryDto> {
    const { page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    // const where = slugs ? { slug: In(slugs) } : {};

    const [items, total] = await this.categoryRepository.findAndCount({
      // where,
      relations: [
        'parent',
        'children',
        'categoryProducts',
        'categoryProducts.product',
      ],
      skip,
      take: limit,
    });

    return {
      items: items.map((category) => CategoryMapper.toDto(category)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
