import { PartialType } from '@nestjs/swagger';
import { InventoryDto } from '@modules/products/dto/inventory.dto';

export class UpdateInventoryDto extends PartialType(InventoryDto) {}
