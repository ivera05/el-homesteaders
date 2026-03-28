import { ApiKeysService } from '../api-keys.service';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { API_KEY_TYPE } from '@/modules/api-keys/decorators/api-key.decorator';
import { ApiKeyType } from '@modules/api-keys/enums/api-key-type.enum';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly apiKeysService: ApiKeysService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredType = this.reflector.getAllAndOverride<ApiKeyType>(
      API_KEY_TYPE,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredType) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const apiKeyHeader = request.headers['x-api-key'];

    if (Array.isArray(apiKeyHeader)) {
      throw new UnauthorizedException('Multiple API keys provided');
    }

    if (typeof apiKeyHeader !== 'string') {
      throw new UnauthorizedException('Invalid API key format');
    }

    if (!apiKeyHeader) {
      throw new UnauthorizedException('API key is required');
    }

    const apiKeyEntity = await this.apiKeysService.findApiKey(apiKeyHeader);

    if (!apiKeyEntity || apiKeyEntity.type !== requiredType) {
      throw new ForbiddenException(
        `API key of type '${requiredType}' is required to access this resource.`,
      );
    }

    return true;
  }
}
