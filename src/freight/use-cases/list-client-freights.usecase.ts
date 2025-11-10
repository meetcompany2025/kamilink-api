// freights/use-cases/list-client-freights.usecase.ts
import { Inject, Injectable } from '@nestjs/common';
import {
  FREIGHTS_REPOSITORY,
  FreightsRepositoryInterface,
} from '../repositories/freights.repository.interface';

@Injectable()
export class ListClientFreightsUseCase {
  constructor(
    @Inject(FREIGHTS_REPOSITORY)
    private freightsRepository: FreightsRepositoryInterface,
  ) { }

  async execute(clientId: string) {
    return this.freightsRepository.findByClient(clientId);
  }
}
