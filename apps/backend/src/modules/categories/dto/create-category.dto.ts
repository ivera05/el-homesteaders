import { CategoryDto } from '@modules/categories/dto/category.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateCategoryDto extends OmitType(CategoryDto, [
  'id',
  'createdAt',
  'updatedAt',
] as const) {}
