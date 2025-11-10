// src/freights/use-cases/get-available-freights.usecase.ts
import { Inject, Injectable } from '@nestjs/common';
import {
  FREIGHTS_REPOSITORY,
  FreightsRepositoryInterface,
} from '../repositories/freights.repository.interface';

@Injectable()
export class GetAvailableFreightsUseCase {
  constructor(
    @Inject(FREIGHTS_REPOSITORY)
    private readonly freightsRepository: FreightsRepositoryInterface,
  ) { }

  async execute() {
    const freightsAvailables =
      await this.freightsRepository.findAvailableFreights();

    return freightsAvailables;
  }
}
