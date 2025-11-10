// src/modules/freight-location-tracking/use-cases/get-latest-freight-location-tracking.usecase.ts
import { Inject, Injectable } from '@nestjs/common';
import { FREIGHT_LOCALIZATION_TRACKING_REPOSITORY, FreightLocationTrackingRepositoryInterface } from '../repositories/freight-location-tracking.repository.interface';

@Injectable()
export class GetLatestFreightLocationTrackingUseCase {
  constructor(
    @Inject(FREIGHT_LOCALIZATION_TRACKING_REPOSITORY)
    private readonly repository: FreightLocationTrackingRepositoryInterface,
  ) {}

  async execute(freightId: string) {
    return this.repository.findLatestByFreightId(freightId);
  }
}
