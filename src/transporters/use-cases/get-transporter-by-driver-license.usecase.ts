import { ConflictException, Inject, Injectable } from '@nestjs/common';

import {
  TransporterRepositoryInterface,
  TRANSPORTERS_REPOSITORY,
} from '../repositories/transporter-repository.interface';

@Injectable()
export class GetTransporterByDriverLicenseUseCase {
  constructor(
    @Inject(TRANSPORTERS_REPOSITORY)
    private readonly transporterRepository: TransporterRepositoryInterface,
  ) {}

  async execute(driverLicence: string) {
    const transporter =
      await this.transporterRepository.findByDriverLicence(driverLicence);

      console.log('Passou Driver License');

    if (transporter) {
      throw new ConflictException('Driver Licence Already Exists.');
    }

    return transporter;
  }
}
