import { Module } from '@nestjs/common';
import { UpdateLastLocationUseCase } from './use-cases/update-last-location.usecase';
import { FREIGHT_LAST_LOCATION_REPOSITORY } from './repositories/freight-last-location.repository.interface';
import { FreightLastLocationRepository } from './repositories/freight-last-location.repository';

@Module({
  providers: [
    UpdateLastLocationUseCase,
    {
      provide: FREIGHT_LAST_LOCATION_REPOSITORY,
      useClass: FreightLastLocationRepository,
    },
  ],
  exports: [UpdateLastLocationUseCase],
})
export class FreightLastLocationModule {}
