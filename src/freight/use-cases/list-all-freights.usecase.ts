// freights/use-cases/list-all-freights.usecase.ts
import { Inject, Injectable } from '@nestjs/common';
import {
  FREIGHTS_REPOSITORY,
  FreightsRepositoryInterface,
} from '../repositories/freights.repository.interface';

@Injectable()
export class ListAllFreightsUseCase {
  constructor(
    @Inject(FREIGHTS_REPOSITORY)
    private freightsRepository: FreightsRepositoryInterface,
  ) { }

  async execute() {
    const freights = await this.freightsRepository.findAll();
    return freights;
  }
}
