/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/*import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FreightStatus } from '@prisma/client';
import {
  FREIGHT_OFFER_REPOSITORY,
  FreightOfferRepositoryInterface,
} from '../repositories/freight_offer.repository.interface';

@Injectable()
export class AcceptFreightUseCase {
  constructor(
    @Inject(FREIGHT_OFFER_REPOSITORY)
    private freightOfferRepository: FreightOfferRepositoryInterface,
  ) { }

  async execute(freightId: string) {
    const freight = await this.freightOfferRepository.findById(freightId);

    if (!freight) throw new NotFoundException('Frete não encontrado');
    if (freight.status !== FreightStatus.PENDING)
      throw new BadRequestException('Frete não está disponível');
*/
/*const freightUpdated =
      await this.freightOfferRepository.updateStatusAndAssignDriver(
        freightId,
        driverId,
      );
    return freightUpdated;*/
/*}
}*/
// This use case handles the acceptance of a freight by a driver.
// It checks if the freight exists and is in a pending state before updating its status and assigning
