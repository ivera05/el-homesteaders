import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsUUID } from 'class-validator';

export class InventoryDto {
  @ApiProperty({ example: 'df4bc8e1-fb9d-47ea-b020-fee7839c947f' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'df4bc8e1-fb9d-47ea-b020-fee7839c947f' })
  @IsUUID()
  productId: String;

  @ApiProperty({ example: 10 })
  @IsNumber()
  availableQty: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  pendingShipQty: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  shippedQty: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  processingQty: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  lowStockThreshold: number;

  @ApiProperty({ example: '2023-09-20T12:00:00Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '2023-09-20T12:00:00Z' })
  @IsDate()
  updatedAt: Date;
}
