import { Inject, Injectable } from '@nestjs/common';
import {
  USERS_REPOSITORY,
  UsersRepositoryInterface,
} from '../repositories/users.repository.interface';

@Injectable()
export class GetUsersUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private userRepository: UsersRepositoryInterface,
  ) {}

  async execute() {
    const users = await this.userRepository.findAll();

    return users;
  }
}
