import { Module } from '@nestjs/common';
import { GetUsersUseCase } from './use-cases/get-users.usecase';
import { PeopleModule } from 'src/people/people.module';
import { ClientsModule } from 'src/clients/clients.module';
import { TransportersModule } from 'src/transporters/transporters.module';
import { UsersController } from './controllers/users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id-usecase';
import { UsersRepository } from './repositories/prisma-users.repository';
import { USERS_REPOSITORY } from './repositories/users.repository.interface';
import { EmailConfirmationModule } from 'src/email-confirmation/email-confirmation.module';
import { GetUserDashboardCase } from './use-cases/get-user-dashboard.usecase';
import { GetClientDashboardUseCase } from 'src/clients/use-cases/client-dashboard.usecase';
import { FREIGHTS_REPOSITORY } from 'src/freight/repositories/freights.repository.interface';
import { FreightsRepository } from 'src/freight/repositories/freights.repository';
import { CLIENTS_REPOSITORY } from 'src/clients/repositories/clients.repository.interface';
import { ClientsRepository } from 'src/clients/repositories/clients.repository';
import { TRANSPORTERS_REPOSITORY } from 'src/transporters/repositories/transporter-repository.interface';
import { TransportersRepository } from 'src/transporters/repositories/transporter.repository';
import { GetTransporterDashboardUseCase } from 'src/transporters/use-cases/transporter-dashboard.usecase';
import { VehiclesRepository } from 'src/vehicles/repositories/vehicles.repository';
import { VEHICLES_REPOSITORY } from 'src/vehicles/repositories/vehicles.repository.interface';

@Module({
  imports: [
    PeopleModule,
    ClientsModule,
    TransportersModule,
    EmailConfirmationModule,
  ],
  controllers: [UsersController],
  providers: [
    PrismaService,
    CreateUserUseCase,
    GetUsersUseCase,
    GetUserByIdUseCase,
    GetUserDashboardCase,
    GetTransporterDashboardUseCase,
    GetClientDashboardUseCase,
    {
      provide: USERS_REPOSITORY,
      useClass: UsersRepository,
    },
    {
      provide: FREIGHTS_REPOSITORY,
      useClass: FreightsRepository,
    },
    {
      provide: CLIENTS_REPOSITORY,
      useClass: ClientsRepository,
    },
    {
      provide: TRANSPORTERS_REPOSITORY,
      useClass: TransportersRepository,
    },
    {
      provide: VEHICLES_REPOSITORY,
      useClass: VehiclesRepository,
    },
  ],
})
export class UsersModule {}
