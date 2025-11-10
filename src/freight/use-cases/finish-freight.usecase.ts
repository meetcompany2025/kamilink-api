import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FreightStatus } from '@prisma/client';
import {
  FREIGHTS_REPOSITORY,
  FreightsRepositoryInterface,
} from '../repositories/freights.repository.interface';
import { RegisterFreightStatusChangeUseCase } from 'src/freight-status-history/use-cases/register-freight-status-change.use-case';

@Injectable()
export class FinishFreightUseCase {
  constructor(
    @Inject(FREIGHTS_REPOSITORY)
    private freightsRepository: FreightsRepositoryInterface,
    private registerStatusChange: RegisterFreightStatusChangeUseCase,
  ) { }

  async execute(freightId: string, transporterId: string) {
    const freight = await this.freightsRepository.findById(freightId);

    if (!freight) throw new NotFoundException('Frete não encontrado');
    if (freight.transporterId !== transporterId)
      throw new ForbiddenException('Você não pode finalizar este frete');
    if (freight.status !== FreightStatus.IN_PROGRESS) {
      throw new BadRequestException('Frete não está em andamento');
    }

    const freightUpdate = await this.freightsRepository.updateStatus(
      freightId,
      FreightStatus.COMPLETED,
    );

    // Registrar status "COMPLETED"
    await this.registerStatusChange.execute({
      freightId,
      newStatus: FreightStatus.COMPLETED,
    });

    return freightUpdate;
  }
}
