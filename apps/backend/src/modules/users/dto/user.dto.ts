import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class UserDto {
  @ApiProperty({ description: 'The user id' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'The user email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The user first name' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'The user last name' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'The user role' })
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty({ description: 'The user token version' })
  @IsNotEmpty()
  @IsNumber()
  tokenVersion: number;
}
