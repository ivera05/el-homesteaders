import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from '@modules/auth/dto/payload.dto';
import { LoginDto } from '@modules/auth/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UserDto } from '@/modules/users/dto/user.dto';
import { UsersService } from '@modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<UserDto> {
    const { email, password } = loginDto;

    const user = await this.usersService.findOneByEmailWithPassword(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  login(user: UserDto) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      version: user.tokenVersion,
    } as PayloadDto;

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
