import { IsNumber, IsString } from 'class-validator';
import { UserRole } from '@modules/users/enums/user-role.enum';

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
