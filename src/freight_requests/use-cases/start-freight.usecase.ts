/*import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { FreightStatus } from '@prisma/client';
import {
  FREIGHT_REQUEST_REPOSITORY,
  FreightRequestRepositoryInterface,
} from '../repositories/freight_request.repository.interface';

@Injectable()
export class StartFreightUseCase {
  constructor(
    @Inject(FREIGHT_REQUEST_REPOSITORY)
    private freightsRepository: FreightRequestRepositoryInterface,
  ) { }

  async execute(freightId: string, driverId: string) {
    const freight = await this.freightsRepository.findById(freightId);

    if (!freight) throw new NotFoundException('Frete não encontrado');
    if (freight.assignedTransporterId !== driverId)
      throw new ForbiddenException('Você não pode iniciar este frete');
    if (freight.status !== FreightStatus.ACCEPTED) {
      throw new BadRequestException('Frete não pode ser iniciado neste status');
    }

    return this.freightsRepository.updateStatus(
      freightId,
      FreightStatus.IN_PROGRESS,
    );
  }
}*/
