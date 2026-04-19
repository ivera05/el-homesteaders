import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@modules/users/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOneByEmailWithPassword(email: string) {
    return await this.usersRepository.findOneByEmailWithPassword(email);
  }

  async findById(id: string) {
    return await this.usersRepository.findById(id);
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async incrementTokenVersion(userId: string) {
    return await this.usersRepository.incrementTokenVersion(userId);
  }
}
