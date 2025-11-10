import { Inject, Injectable } from '@nestjs/common';
import { CreateFreightLocationTrackingDto } from '../dto/create-freight-location-tracking.dto';
import { FREIGHT_LOCALIZATION_TRACKING_REPOSITORY, FreightLocationTrackingRepositoryInterface } from '../repositories/freight-location-tracking.repository.interface';

@Injectable()
export class RegisterFreightLocationTrackingUseCase {
  constructor(
    @Inject(FREIGHT_LOCALIZATION_TRACKING_REPOSITORY)
    private readonly repository: FreightLocationTrackingRepositoryInterface,
  ) { }

  async execute(dto: CreateFreightLocationTrackingDto) {
    console.log('Localização registrada no banco:', dto);
    await this.repository.create(dto);

   
  }
}
