// src/freights/use-cases/get-all-vehicles.usecase.ts
import { Inject, Injectable } from '@nestjs/common';
import {
  VEHICLES_REPOSITORY,
  VehiclesRepositoryInterface,
} from '../repositories/vehicles.repository.interface';

@Injectable()
export class GetAllVehiclesUseCase {
  constructor(
    @Inject(VEHICLES_REPOSITORY)
    private readonly vehiclesRepositoryInterface: VehiclesRepositoryInterface,
  ) { }

  async execute() {
    const vehicles = await this.vehiclesRepositoryInterface.findAll();

    return vehicles;
  }
}
