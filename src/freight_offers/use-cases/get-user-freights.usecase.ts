/*import { Inject, Injectable } from '@nestjs/common';
import { Freight } from '@prisma/client';
import {
  FREIGHT_OFFER_REPOSITORY,
  FreightOfferRepositoryInterface,
} from '../repositories/freight_offer.repository.interface';

@Injectable()
export class GetUserFreightsUseCase {
  constructor(
    @Inject(FREIGHT_OFFER_REPOSITORY)
    private readonly freightsRepository: FreightOfferRepositoryInterface,
  ) { }

  async execute(userId: string, profile: string): Promise<Freight[]> {
    if (profile === 'CLIENT') {
      return this.freightsRepository.findByClient(userId);
    }

    if (profile === 'TRANSPORTER') {
      return this.freightsRepository.findByDriver(userId);
    }

    return this.freightsRepository.findAll(); // ADMIN
  }
}
*/