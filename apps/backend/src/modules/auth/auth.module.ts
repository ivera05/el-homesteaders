import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '@modules/users/users.module';
import { JwtStrategy } from '@modules/auth/strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { ApiKeyGuard } from '@modules/auth/guards/api-key.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    { provide: 'APP_GUARD', useClass: ApiKeyGuard },
    { provide: 'APP_GUARD', useClass: JwtStrategy },
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
