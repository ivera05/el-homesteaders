import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CategoryEntity from '@modules/categories/entities/category.entity';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async save(category: CategoryEntity): Promise<CategoryEntity> {
    return this.categoryRepository.save(category);
  }

  async findOneById(id: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: [
        'parent',
        'children',
        'categoryProducts',
        'categoryProducts.product',
      ],
    });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }

  async findAll(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find({
      relations: [
        'parent',
        'children',
        'categoryProducts',
        'categoryProducts.product',
      ],
    });
  }
}
