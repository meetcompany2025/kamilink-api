/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import {
  VEHICLES_REPOSITORY,
  VehiclesRepositoryInterface,
} from '../repositories/vehicles.repository.interface';

@Injectable()
export class GetVehicleDetailUseCase {
  constructor(
    @Inject(VEHICLES_REPOSITORY)
    private vehicleRepository: VehiclesRepositoryInterface,
  ) {}
  /**
   * Executes the use case to create a new freight.
   * @returns The created freight.
   */
  async execute(vehicleId: string) {
    const vehicle = await this.vehicleRepository.findOne(vehicleId);
    return vehicle;
  }
}
