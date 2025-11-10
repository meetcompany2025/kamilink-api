import { ConflictException, Inject, Injectable } from '@nestjs/common';

import {
  TransporterRepositoryInterface,
  TRANSPORTERS_REPOSITORY,
} from '../repositories/transporter-repository.interface';

@Injectable()
export class GetTransporterByLicensePlateUseCase {
  constructor(
    @Inject(TRANSPORTERS_REPOSITORY)
    private readonly transporterRepository: TransporterRepositoryInterface,
  ) {}

  async execute(licensePlate: string) {
    const transporter =
      await this.transporterRepository.findByLicensePlate(licensePlate);

    console.log('Passou License Plate');

    if (transporter) {
      throw new ConflictException(' Licence Plate Already Exists.');
    }

    return transporter;
  }
}
