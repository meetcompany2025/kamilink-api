// freights/use-cases/list-client-freights.usecase.ts
/*import { Inject, Injectable } from '@nestjs/common';
import {
  FREIGHT_OFFER_REPOSITORY,
  FreightOfferRepositoryInterface,
} from '../repositories/freight_offer.repository.interface';

@Injectable()
export class ListClientFreightsUseCase {
  constructor(
    @Inject(FREIGHT_OFFER_REPOSITORY)
    private freightOfferRepository: FreightOfferRepositoryInterface,
  ) {}

  async execute(clientId: string) {
    return await this.freightOfferRepository.findByClient(clientId);
  }
}
*/