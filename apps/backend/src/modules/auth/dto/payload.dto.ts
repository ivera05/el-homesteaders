import { UserRole } from '@modules/users/entities/user.entity';
import { IsNumber, IsString } from 'class-validator';

export class PayloadDto {
  @IsString()
  email: string;

  @IsString()
  sub: string;

  @IsString()
  role: UserRole;

  @IsNumber()
  iat: number;

  @IsNumber()
  exp: number;

  @IsNumber()
  version: number;
}
