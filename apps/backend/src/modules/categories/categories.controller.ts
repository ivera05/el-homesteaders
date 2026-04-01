import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from '@modules/categories/categories.service';
import { ClientApiKey } from '@modules/api-keys/decorators/api-key.decorator';
import { QueryCategoryDto } from '@modules/categories/dto/query-category.dto';

@ApiTags('Categories')
@ApiSecurity('x-api-key')
@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ClientApiKey()
  @Get('/menu')
  @ApiOperation({ summary: 'Gets a list of root categories.' })
  findCategoryMenu() {
    return this.categoriesService.findCategoryMenu();
  }

  @ClientApiKey()
  @Get()
  @ApiOperation({ summary: 'Gets a list of all categories.' })
  findAll(@Query() query: QueryCategoryDto) {
    return this.categoriesService.findAll(query);
  }

  @ClientApiKey()
  @Get('/:slug/products')
  @ApiOperation({ summary: 'Gets a list of all categories.' })
  findCategoryProducts(@Param('slug') slug: string, @Query() query: QueryCategoryDto) {
    return this.categoriesService.findCategoryProducts(slug, query);
  }
}
