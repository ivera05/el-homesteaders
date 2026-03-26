import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import CategoryEntity from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.toCategoryEntity({
      ...createCategoryDto,
    });
    return this.categoriesRepository.save(category);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = this.toCategoryEntity({
      ...updateCategoryDto,
    });
    return this.categoriesRepository.save(category);
  }

  async findOne(id: string) {
    return this.categoriesRepository.getCategoryById(id);
  }

  async findAll() {
    return this.categoriesRepository.getAllCategories();
  }

  toCategoryEntity(dto: CreateCategoryDto | UpdateCategoryDto): CategoryEntity {
    return {
      ...dto,
    } as CategoryEntity;
  }
}
