// freights/use-cases/list-driver-freights.usecase.ts
import { Inject, Injectable } from '@nestjs/common';
import {
  FREIGHTS_REPOSITORY,
  FreightsRepositoryInterface,
} from '../repositories/freights.repository.interface';

@Injectable()
export class ListDriverFreightsUseCase {
  constructor(
    @Inject(FREIGHTS_REPOSITORY)
    private freightsRepository: FreightsRepositoryInterface,
  ) { }

  async execute(driverId: string) {
    return this.freightsRepository.findByDriver(driverId);
  }
}
