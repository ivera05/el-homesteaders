import { Injectable, Query } from '@nestjs/common';
import { CategoriesRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { QueryCategoryDto } from '@modules/categories/dto/query-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.categoriesRepository.save(createCategoryDto);
  }

  async update(updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesRepository.save(updateCategoryDto);
  }

  async findCategoryMenu() {
    return this.categoriesRepository.findMenu();
  }

  async findCategoryProducts(slug: string, query: QueryCategoryDto) {
    return this.categoriesRepository.findCategoryProducts(slug, query);
  }

  async findAll(@Query() query: QueryCategoryDto) {
    return this.categoriesRepository.findAll(query);
  }
}
