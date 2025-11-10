/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import {
  FREIGHTS_REPOSITORY,
  FreightsRepositoryInterface,
} from '../repositories/freights.repository.interface';

@Injectable()
export class GetFreightDetailUseCase {
  constructor(
    @Inject(FREIGHTS_REPOSITORY)
    private freightsRepository: FreightsRepositoryInterface,
  ) {}
  /**
   * Executes the use case to create a new freight.
   * @returns The created freight.
   */
  async execute(freightId: string) {
    const freight = await this.freightsRepository.findById(freightId);
    return freight;
  }
}