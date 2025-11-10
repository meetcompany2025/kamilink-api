// src/freights/use-cases/get-available-freights.usecase.ts
import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/prisma-users.repository';
import {
  USERS_REPOSITORY,
  UsersRepositoryInterface,
} from '../repositories/users.repository.interface';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly userRepository: UsersRepositoryInterface,
  ) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    return user;
  }
}
