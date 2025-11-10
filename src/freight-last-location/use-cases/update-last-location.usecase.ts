import { Inject, Injectable } from '@nestjs/common';
import { FREIGHT_LAST_LOCATION_REPOSITORY, FreightLastLocationRepositoryInterface } from '../repositories/freight-last-location.repository.interface';
import { UpdateFreightLastLocationDto } from '../dto/update-last-location.dto';

@Injectable()
export class UpdateLastLocationUseCase {
  constructor(
    @Inject(FREIGHT_LAST_LOCATION_REPOSITORY)
    private lastLocationRepo: FreightLastLocationRepositoryInterface,
  ) {}

  async execute(dto: UpdateFreightLastLocationDto) {
    return await this.lastLocationRepo.upsertByFreightId(dto);
  }
}
