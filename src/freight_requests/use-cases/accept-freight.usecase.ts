/*import {
  BadRequestException,
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
export class AcceptFreightUseCase {
  constructor(
    @Inject(FREIGHT_REQUEST_REPOSITORY)
    private freightsRepository: FreightRequestRepositoryInterface,
  ) { }

  async execute(freightId: string, driverId: string) {
    const freight = await this.freightsRepository.findById(freightId);

    if (!freight) throw new NotFoundException('Frete não encontrado');
    if (freight.status !== FreightStatus.PENDING)
      throw new BadRequestException('Frete não está disponível');

    const freightUpdated =
      await this.freightsRepository.updateStatusAndAssignDriver(
        freightId,
        driverId,
      );
    return freightUpdated;
  }
}*/
// This use case handles the acceptance of a freight by a driver.
// It checks if the freight exists and is in a pending state before updating its status and assigning
