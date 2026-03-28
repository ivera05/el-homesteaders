import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UsersService } from '@modules/users/users.service';
import { AdminAccessApiKey } from '../api-keys/decorators/api-key.decorator';

@ApiTags('Users')
@ApiSecurity('x-api-key')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @AdminAccessApiKey()
  @Get()
  @ApiOperation({ summary: 'Gets a list of all users.' })
  findAll() {
    return this.usersService.findAll();
  }
}
