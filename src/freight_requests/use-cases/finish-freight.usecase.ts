/*import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FreightStatus } from '@prisma/client';
import {
  FREIGHT_REQUEST_REPOSITORY,
  FreightRequestRepositoryInterface,
} from '../repositories/freight_request.repository.interface';

@Injectable()
export class FinishFreightUseCase {
  constructor(
    @Inject(FREIGHT_REQUEST_REPOSITORY)
    private freightsRepository: FreightRequestRepositoryInterface,
  ) { }

  async execute(freightId: string, driverId: string) {
    const freight = await this.freightsRepository.findById(freightId);

    if (!freight) throw new NotFoundException('Frete não encontrado');
    if (freight.assignedTransporterId !== driverId)
      throw new ForbiddenException('Você não pode finalizar este frete');
    if (freight.status !== FreightStatus.IN_PROGRESS) {
      throw new BadRequestException('Frete não está em andamento');
    }

    return this.freightsRepository.updateStatus(
      freightId,
      FreightStatus.COMPLETED,
    );
  }
}
*/