import { SetMetadata } from '@nestjs/common';
import { ApiKeyType } from '../enums/api-key-type.enum';

export const API_KEY_TYPE = 'API_KEY_TYPE';

export const ClientApiKey = () =>
  SetMetadata(API_KEY_TYPE, ApiKeyType.CLIENT);

export const AdminAccessApiKey = () =>
  SetMetadata(API_KEY_TYPE, ApiKeyType.ADMIN);
