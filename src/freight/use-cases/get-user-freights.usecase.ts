import { Inject, Injectable } from '@nestjs/common';
import { Freight } from '@prisma/client';
import {
  FREIGHTS_REPOSITORY,
  FreightsRepositoryInterface,
} from '../repositories/freights.repository.interface';

@Injectable()
export class GetUserFreightsUseCase {
  constructor(
    @Inject(FREIGHTS_REPOSITORY)
    private readonly freightsRepository: FreightsRepositoryInterface,
  ) { }

  async execute(userId: string, profile: string): Promise<Freight[]> {
    if (profile === 'CLIENT') {
      return this.freightsRepository.findByClient(userId);
    }

    if (profile === 'DRIVER') {
      return this.freightsRepository.findByDriver(userId);
    }

    return this.freightsRepository.findAll(); // ADMIN
  }
}
