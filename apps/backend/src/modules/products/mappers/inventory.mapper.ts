import { InventoryEntity } from '@modules/products/entities/inventory.entity';
import { InventoryDto } from '@modules/products/dto/inventory.dto';
import { CreateInventoryDto } from '@modules/products/dto/create-inventory.dto';
import { UpdateInventoryDto } from '@modules/products/dto/update-inventory.dto';

export class InventoryMapper {
  static toEntity(
    dto: CreateInventoryDto | UpdateInventoryDto,
    existingEntity?: InventoryEntity,
  ): InventoryEntity {
    const entity = existingEntity || new InventoryEntity();

    if (dto.availableQty !== undefined) entity.availableQty = dto.availableQty;
    if (dto.pendingShipQty !== undefined) entity.pendingShipQty = dto.pendingShipQty;
    if (dto.shippedQty !== undefined) entity.shippedQty = dto.shippedQty;
    if (dto.processingQty !== undefined) entity.processingQty = dto.processingQty;
    if (dto.lowStockThreshold !== undefined) entity.lowStockThreshold = dto.lowStockThreshold;

    return entity;
  }
  static toDto(entity: InventoryEntity): InventoryDto {
    const dto = new InventoryDto();

    dto.id = entity.id;
    dto.availableQty = entity.availableQty;
    dto.pendingShipQty = entity.pendingShipQty;
    dto.shippedQty = entity.shippedQty;
    dto.processingQty = entity.processingQty;
    dto.lowStockThreshold = entity.lowStockThreshold;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;

    return dto;
  }
}
