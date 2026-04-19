import { UserEntity } from '@modules/users/entities/user.entity';
import { UserDto } from '@modules/users/dto/user.dto';

export class UserMapper {
  static toEntity(dto: UserDto) {
    return {
      ...dto,
    };
  }

  static toDto(entity: UserEntity) {
    return {
      ...entity,
    };
  }
}
