/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import {
  VEHICLES_REPOSITORY,
  VehiclesRepositoryInterface,
} from '../repositories/vehicles.repository.interface';

@Injectable()
export class GetTransporterVehiclesUseCase {
  constructor(
    @Inject(VEHICLES_REPOSITORY)
    private vehiclesRepository: VehiclesRepositoryInterface,
  ) {}
  /**
   * Executes the use case to create a new freight.
   * @returns The created freight.
   */
  async execute(clientId: string) {
    const freight = await this.vehiclesRepository.findByUser(clientId);
    return freight;
  }
}
