// com use-cases separados
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

import { UserProfile } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {
  USERS_REPOSITORY,
  UsersRepositoryInterface,
} from '../repositories/users.repository.interface';
import { GetClientDashboardUseCase } from 'src/clients/use-cases/client-dashboard.usecase';
import { GetTransporterDashboardUseCase } from 'src/transporters/use-cases/transporter-dashboard.usecase';

@Injectable()
export class GetUserDashboardCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly userRepository: UsersRepositoryInterface,
    private readonly getClientDashboardUseCase: GetClientDashboardUseCase,
    private readonly getTransporterDashboardUseCase: GetTransporterDashboardUseCase
  ) {}

  async execute(id: string, profile: UserProfile) {
    let person;
    let client;
    let transporter;

    // create client
    if (profile === UserProfile.CLIENT) {
      client = await this.getClientDashboardUseCase.execute(id);
    }
    // create transporter
    if (profile === UserProfile.TRANSPORTER) {
      transporter = await this.getTransporterDashboardUseCase.execute(id);
    }

    return { client, transporter };
  }
}
