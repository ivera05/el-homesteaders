import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiKeyEntity } from '@modules/api-keys/entities/api-key.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApiKeysRepository {
  constructor(
    @InjectRepository(ApiKeyEntity)
    private readonly Repository: Repository<ApiKeyEntity>,
  ) {}

  async save(apiKey: ApiKeyEntity): Promise<ApiKeyEntity> {
    return this.Repository.save(apiKey);
  }

  async findOneByKey(key: string): Promise<ApiKeyEntity> {
    const apiKey = await this.Repository.findOne({ where: { key } });
    if (!apiKey) {
      throw new Error('API key not found');
    }
    return apiKey;
  }
}
