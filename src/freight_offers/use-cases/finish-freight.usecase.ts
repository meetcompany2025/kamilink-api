/*import {
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

@Injectable()
export class FinishFreightUseCase {
  constructor(
    @Inject(FREIGHTS_REPOSITORY)
    private freightsRepository: FreightsRepositoryInterface,
  ) { }

  async execute(freightId: string, driverId: string) {
    const freight = await this.freightsRepository.findById(freightId);

    if (!freight) throw new NotFoundException('Frete não encontrado');
    if (freight.driverId !== driverId)
      throw new ForbiddenException('Você não pode finalizar este frete');
    if (freight.status !== FreightStatus.IN_PROGRESS) {
      throw new BadRequestException('Frete não está em andamento');
    }

    return this.freightsRepository.updateStatus(
      freightId,
      FreightStatus.COMPLETED,
    );
  }
}*/
