// src/vehicles/use-cases/update-vehicle-status.usecase.ts
import { Inject, Injectable } from '@nestjs/common';
import { VEHICLES_REPOSITORY, VehiclesRepositoryInterface } from '../repositories/vehicles.repository.interface';

@Injectable()
export class UpdateVehicleStatusUseCase {
    constructor(
        @Inject(VEHICLES_REPOSITORY)
        private vehiclesRepo: VehiclesRepositoryInterface
    ) { }

    async execute(id: string, status: string) {
        return this.vehiclesRepo.updateStatus(id, status);
    }
}

