import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CLIENTS_REPOSITORY,
  ClientsRepositoryInterface,
} from 'src/clients/repositories/clients.repository.interface';
import {
  FREIGHTS_REPOSITORY,
  FreightsRepositoryInterface,
} from 'src/freight/repositories/freights.repository.interface';
import {
  USERS_REPOSITORY,
  UsersRepositoryInterface,
} from 'src/users/repositories/users.repository.interface';

@Injectable()
export class GetClientDashboardUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepositoryInterface,

    @Inject(FREIGHTS_REPOSITORY)
    private readonly freightsRepository: FreightsRepositoryInterface,
  ) {}

  async execute(userId: string) {
    // 1. Garantir que o client existe
    const client = await this.usersRepository.findById(userId);
    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    // 2. Buscar estatísticas dos fretes
    const totalFreights = await this.freightsRepository.countByClientId(
      client.id,
    );
    const activeFreights = await this.freightsRepository.findActiveByClientId(
      client.id,
    );
    const completedFreights =
      await this.freightsRepository.findCompletedByClientId(client.id);
    const pendingFreights = await this.freightsRepository.findPendingByClientId(
      client.id,
    );
    const historyFreights = await this.freightsRepository.findHistoryByClientId(
      client.id,
    );

    // 3. Retornar dados no formato esperado pelo frontend
    return {
      client: {
        id: client.id,
        name: client?.person.fullName || client?.client.companyName,
      },
      stats: {
        totalFreights,
        activeFreights: activeFreights.length,
        completedFreights: completedFreights.length,
        pendingFreights: pendingFreights.length,
      },
      freights: {
        active: activeFreights,
        history: historyFreights,
      },
      lastUpdated: new Date(),
    };
  }
}
