import { ProductDto } from '@modules/products/dto/product.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(ProductDto) {}
