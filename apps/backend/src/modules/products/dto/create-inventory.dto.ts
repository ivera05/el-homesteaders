import { OmitType } from '@nestjs/swagger';
import { InventoryDto } from '@modules/products/dto/inventory.dto';

export class CreateInventoryDto extends OmitType(InventoryDto, [
  'id',
  'createdAt',
  'updatedAt',
] as const) {}
