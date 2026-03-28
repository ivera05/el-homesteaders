import { Module } from '@nestjs/common';
import { ApiKeysService } from '@modules/api-keys/api-keys.service';
import { ApiKeyEntity } from '@modules/api-keys/entities/api-key.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from '@modules/api-keys/guards/api-key.guard';
import { ApiKeysRepository } from '@modules/api-keys/api-keys.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ApiKeyEntity])],
  providers: [
    { provide: APP_GUARD, useClass: ApiKeyGuard },
    ApiKeysService,
    ApiKeysRepository,
  ],
  exports: [ApiKeysService],
})
export class ApiKeysModule {}
