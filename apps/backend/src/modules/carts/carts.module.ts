import { Module } from '@nestjs/common';
import { CartsService } from '@modules/carts/carts.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [CartsService]
})
export class CartsModule {}
