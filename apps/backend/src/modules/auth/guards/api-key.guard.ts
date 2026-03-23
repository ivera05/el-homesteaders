import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.header('x-api-key') ?? 'INVALID_API_KEY';

    const validApiKey = process.env.CLIENT_API_KEY;
    if (apiKey !== validApiKey) {
      throw new UnauthorizedException('Invalid Client API Key');
    }

    return true;
  }
}
