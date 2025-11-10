import { ConflictException, Inject, Injectable } from '@nestjs/common';

import {
  TransporterRepositoryInterface,
  TRANSPORTERS_REPOSITORY,
} from '../repositories/transporter-repository.interface';

@Injectable()
export class GetAllTransportersUseCase {
  constructor(
    @Inject(TRANSPORTERS_REPOSITORY)
    private readonly transporterRepository: TransporterRepositoryInterface,
  ) {}

  async execute() {
    const transporters = await this.transporterRepository.findAll();

    return transporters;
  }
}
