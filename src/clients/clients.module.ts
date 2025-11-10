import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CLIENTS_REPOSITORY } from './repositories/clients.repository.interface';
import { ClientsRepository } from './repositories/clients.repository';
import { CreateClientUseCase } from './use-cases/create-client.usecase';
import { GetClientByNIFUseCase } from './use-cases/get-client-by-nif.usecase';
import { GetClientDashboardUseCase } from './use-cases/client-dashboard.usecase';
import { FREIGHTS_REPOSITORY } from 'src/freight/repositories/freights.repository.interface';
import { FreightsRepository } from 'src/freight/repositories/freights.repository';
import { USERS_REPOSITORY } from 'src/users/repositories/users.repository.interface';
import { UsersRepository } from 'src/users/repositories/prisma-users.repository';
import { GetAllClientsUseCase } from './use-cases/get-all-clients.usecase';
import { ClientsController } from './clients.controller';
import { GetClientByIdUseCase } from './use-cases/get-client-by-id.usecase';

@Module({
  controllers: [ClientsController],
  providers: [
    CreateClientUseCase,
    GetClientByNIFUseCase,
    GetAllClientsUseCase,
    GetClientByIdUseCase,
    GetClientDashboardUseCase,
    PrismaService,
    {
      provide: CLIENTS_REPOSITORY,
      useClass: ClientsRepository,
    },
    {
      provide: FREIGHTS_REPOSITORY,
      useClass: FreightsRepository,
    },
    {
      provide: USERS_REPOSITORY,
      useClass: UsersRepository,
    },
  ],
  exports: [CLIENTS_REPOSITORY, CreateClientUseCase, GetClientByNIFUseCase],
})
export class ClientsModule {}
