// src/freights/use-cases/get-available-freights.usecase.ts
/*import { Inject, Injectable } from '@nestjs/common';
import {
  FREIGHT_OFFER_REPOSITORY,
  FreightOfferRepositoryInterface,
} from '../repositories/freight_offer.repository.interface';

@Injectable()
export class GetAvailableFreightsUseCase {
  constructor(
    @Inject(FREIGHT_OFFER_REPOSITORY)
    private readonly freightOfferRepository: FreightOfferRepositoryInterface,
  ) { }

  async execute() {
    const freightsAvailables =
      await this.freightOfferRepository.findAvailableFreights();

    return freightsAvailables;
  }
}
*/