import { ConflictException, Inject, Injectable } from '@nestjs/common';

import {
  TransporterRepositoryInterface,
  TRANSPORTERS_REPOSITORY,
} from '../repositories/transporter-repository.interface';

@Injectable()
export class GetTransporterByIdUseCase {
  constructor(
    @Inject(TRANSPORTERS_REPOSITORY)
    private readonly transporterRepository: TransporterRepositoryInterface,
  ) {}

  async execute(id: string) {
    const transporter = await this.transporterRepository.findById(id);

    return transporter;
  }
}
