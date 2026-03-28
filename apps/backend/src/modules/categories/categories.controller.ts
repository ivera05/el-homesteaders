import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from '@modules/categories/categories.service';
import { ClientApiKey } from '@modules/api-keys/decorators/api-key.decorator';

@ApiTags('Categories')
@ApiSecurity('x-api-key')
@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ClientApiKey()
  @Get()
  @ApiOperation({ summary: 'Gets a list of all categories.' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @ClientApiKey()
  @Get(':id')
  @ApiOperation({ summary: 'Gets a single category by ID.' })
  findOneById(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @ClientApiKey()
  @Get(':name')
  @ApiOperation({ summary: 'Gets a single category by name.' })
  findOneByName(@Param('name') name: string) {
    return this.categoriesService.findOne(name);
  }
}
