import { Inject, Injectable } from '@nestjs/common';
import {
  USERS_REPOSITORY,
  UsersRepositoryInterface,
} from '../repositories/users.repository.interface';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUsersUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private userRepository: UsersRepositoryInterface,
  ) {}

  async execute(id: string, data: UpdateUserDto) {
    const users = await this.userRepository.update(id, data);

    return users;
  }
}