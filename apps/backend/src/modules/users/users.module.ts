import { Module } from '@nestjs/common';
import { UsersRepository } from '@modules/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@modules/users/entities/user.entity';
import { AddressEntity } from '@modules/users/entities/address.entity';
import { OrdersModule } from '@modules/orders/orders.module';
import { UsersController } from '@modules/users/users.controller';
import { UsersService } from '@modules/users/users.service';

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
