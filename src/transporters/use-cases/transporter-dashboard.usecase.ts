import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  FREIGHTS_REPOSITORY,
  FreightsRepositoryInterface,
} from 'src/freight/repositories/freights.repository.interface';
import {
  USERS_REPOSITORY,
  UsersRepositoryInterface,
} from 'src/users/repositories/users.repository.interface';
import {
  VEHICLES_REPOSITORY,
  VehiclesRepositoryInterface,
} from 'src/vehicles/repositories/vehicles.repository.interface';

@Injectable()
export class GetTransporterDashboardUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepositoryInterface,

    @Inject(FREIGHTS_REPOSITORY)
    private readonly freightsRepository: FreightsRepositoryInterface,

    @Inject(VEHICLES_REPOSITORY)
    private readonly vehiclesRepository: VehiclesRepositoryInterface,
  ) {}

  async execute(transporterId: string) {
    // 2. Buscar estatísticas dos fretes
    const activeFreights =
      await this.freightsRepository.findActiveByTransporterId(transporterId);
    const upcomingFreights =
      await this.freightsRepository.findUpcomingByTransporterId(transporterId);
    const completedFreights =
      await this.freightsRepository.findCompletedByTransporterId(transporterId);
    const recentFreights =
      await this.freightsRepository.findRecentByTransporterId(transporterId);

    // 3. Buscar veículos do transportador
    const vehicles = await this.vehiclesRepository.findByUser(transporterId);

    // 4. Retornar dados no formato esperado pelo frontend
    return {
      transporter: {
        id: transporterId,
      },
      stats: {
        totalFreights:
          activeFreights.length +
          upcomingFreights.length +
          completedFreights.length,
        activeFreights: activeFreights.length,
        upcomingFreights: upcomingFreights.length,
        completedFreights: completedFreights.length,
      },
      freights: {
        recent: recentFreights,
        active: activeFreights,
        upcoming: upcomingFreights,
        history: completedFreights,
      },
      vehicles,
      lastUpdated: new Date(),
    };
  }
}
