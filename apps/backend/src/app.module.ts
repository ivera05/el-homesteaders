import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '@modules/users/users.module';
import { OrdersModule } from '@modules/orders/orders.module';
import { ProductsModule } from '@modules/products/products.module';
import { AuthModule } from '@modules/auth/auth.module';
import { CategoriesModule } from '@modules/categories/categories.module';
import { ApiKeysModule } from '@modules/api-keys/api-keys.module';
import { NestLensModule } from 'nestlens';
import { CartsModule } from '@modules/carts/carts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NestLensModule.forRoot({
      enabled: process.env.NODE_ENV !== 'production',
      storage: { driver: 'memory' },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'db'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'elh_user'),
        password: configService.get<string>('DB_PASSWORD', 'elh_password'),
        database: configService.get<string>('DB_NAME', 'elh'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    OrdersModule,
    ProductsModule,
    AuthModule,
    CategoriesModule,
    ApiKeysModule,
    CartsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
