// src/freights/use-cases/get-available-freights.usecase.ts
/*import { Inject, Injectable } from '@nestjs/common';
import {
  FREIGHT_REQUEST_REPOSITORY,
  FreightRequestRepositoryInterface,
} from '../repositories/freight_request.repository.interface';

@Injectable()
export class GetAvailableFreightsUseCase {
  constructor(
    @Inject(FREIGHT_REQUEST_REPOSITORY)
    private readonly freightsRepository: FreightRequestRepositoryInterface,
  ) {}

  async execute() {
    console.log("Entrou");
    const freightsAvailables =
      await this.freightsRepository.findAvailableFreights();

    return freightsAvailables;
  }
}
*/