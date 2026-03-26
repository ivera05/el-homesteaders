import { Module } from '@nestjs/common';
import { UsersRepository } from '@modules/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@modules/users/entities/user.entity';
import { AddressEntity } from '@modules/users/entities/address.entity';
import { OrdersModule } from '@modules/orders/orders.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AddressEntity]),
    OrdersModule,
  ],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
