import { CategoryDto } from '@modules/categories/dto/category.dto';
import CategoryEntity from '@modules/categories/entities/category.entity';
import { CreateCategoryDto } from '@modules/categories/dto/create-category.dto';
import { UpdateCategoryDto } from '@modules/categories/dto/update-category.dto';

export class CategoryMapper {
  static toEntity(dto: CreateCategoryDto | UpdateCategoryDto): CategoryEntity {
    const entity = new CategoryEntity();

    if (dto.slug !== undefined) {
      entity.slug = dto.slug;
    }
    if (dto.name !== undefined) {
      entity.name = dto.name;
    }
    if (dto.description !== undefined) {
      entity.description = dto.description;
    }
    if (dto.isActive !== undefined) {
      entity.isActive = dto.isActive;
    }

    if ('parentId' in dto && dto.parentId) {
      entity.parent = { id: dto.parentId } as CategoryEntity;
    }

    return entity;
  }

  static toDto(entity: CategoryEntity): CategoryDto {
    return {
      id: entity.id,
      slug: entity.slug,
      name: entity.name,
      description: entity.description,
      isActive: entity.isActive,
      parentId: entity.parent?.id,
      children: entity.children?.map((child) => child.id),
      products: entity.categoryProducts?.map((categoryProduct) => ({
        id: categoryProduct.id,
      })) as CategoryDto['products'],
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
