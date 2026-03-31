import { ProductEntity } from '@modules/products/entities/product.entity';
import { ProductDto } from '@modules/products/dto/product.dto';
import { InventoryMapper } from '@modules/products/mappers/inventory.mapper';
import { CreateProductDto } from '@modules/products/dto/create-product.dto';
import { UpdateProductDto } from '@modules/products/dto/update-product.dto';

export class ProductMapper {
  static toEntity(
    dto: CreateProductDto | UpdateProductDto,
    existingEntity?: ProductEntity,
  ): ProductEntity {
    const entity = existingEntity || new ProductEntity();

    if (dto.title !== undefined) entity.title = dto.title;
    if(dto.slug !== undefined) entity.slug = dto.slug;
    if (dto.sku !== undefined) entity.sku = dto.sku;
    if (dto.description !== undefined) entity.description = dto.description;
    if (dto.price !== undefined) entity.price = dto.price;
    if (dto.imageUrl !== undefined) entity.imageUrl = dto.imageUrl;
    if (dto.weight !== undefined) entity.weight = dto.weight;
    if (dto.weightUnit !== undefined) entity.weightUnit = dto.weightUnit;

    // Map complex objects
    if(dto.inventory !== undefined) {
      entity.inventory = InventoryMapper.toEntity(dto.inventory);
    }

    if (dto.nutritionalInfo !== undefined) {
      entity.nutritionalInfo = dto.nutritionalInfo;
    }

    return entity;
  }

  static toDto(entity: ProductEntity): ProductDto {
    const dto = new ProductDto();

    dto.id = entity.id;
    dto.slug = entity.slug;
    dto.sku = entity.sku;
    dto.title = entity.title;
    dto.description = entity.description;

    dto.price = Number(entity.price);
    dto.weight = Number(entity.weight);

    dto.imageUrl = entity.imageUrl;
    dto.weightUnit = entity.weightUnit;
    dto.nutritionalInfo = entity.nutritionalInfo;

    if (entity.inventory) {
      dto.inventory = InventoryMapper.toDto(entity.inventory);
    }

    dto.isFeatured = entity.isFeatured;
    dto.featuredUntil = entity.featuredUntil;

    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;

    return dto;
  }
}
