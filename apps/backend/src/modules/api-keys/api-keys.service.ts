import { Injectable } from '@nestjs/common';
import { ApiKeysRepository } from './api-keys.repository';

@Injectable()
export class ApiKeysService {
  constructor(private readonly apiKeysRepository: ApiKeysRepository) {}

  async findApiKey(key: string) {
    return this.apiKeysRepository.findOneByKey(key);
  }
}
