import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from '@modules/categories/categories.service';
import { ClientApiKey } from '@modules/api-keys/decorators/api-key.decorator';
import { QueryCategoryDto } from '@modules/categories/dto/query-category.dto';
import { PaginatedCategoryProductsResponseDto } from '@modules/categories/dto/paginated-category-products-response.dto';
import { PaginatedCategoryDto } from '@modules/categories/dto/paginated-category.dto';
import { CategoryMenuDto } from '@modules/categories/dto/category-menu.dto';

@ApiTags('Categories')
@ApiSecurity('x-api-key')
@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ClientApiKey()
  @Get('/menu')
  @ApiOperation({ summary: 'Gets a list of root categories.' })
  @ApiResponse({ status: 200, type: [CategoryMenuDto], description: 'List of root categories' })
  findCategoryMenu() {
    return this.categoriesService.findCategoryMenu();
  }

  @ClientApiKey()
  @Get()
  @ApiOperation({ summary: 'Gets a list of all categories.' })
  @ApiResponse({ status: 200, type: PaginatedCategoryDto, description: 'List of categories' })
  findAll(@Query() query: QueryCategoryDto) {
    return this.categoriesService.findAll(query);
  }

  @ClientApiKey()
  @Get('/:slug/products')
  @ApiOperation({ summary: 'Gets a list of products for a category.' })
  @ApiResponse({ status: 200, type: PaginatedCategoryProductsResponseDto, description: 'List of paginated products'})
  findCategoryProducts(@Param('slug') slug: string, @Query() query: QueryCategoryDto): Promise<PaginatedCategoryProductsResponseDto> {
    return this.categoriesService.findCategoryProducts(slug, query);
  }
}
