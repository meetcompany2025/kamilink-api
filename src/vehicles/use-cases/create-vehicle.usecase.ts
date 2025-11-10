import { Inject, Injectable } from '@nestjs/common';
import {
  VEHICLES_REPOSITORY,
  VehiclesRepositoryInterface,
} from '../repositories/vehicles.repository.interface';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';

@Injectable()
export class CreateVehicleUseCase {
  constructor(
    @Inject(VEHICLES_REPOSITORY)
    private vehiclesRepo: VehiclesRepositoryInterface,
  ) {}

  async execute(userId: string, dto: CreateVehicleDto) {
    return await this.vehiclesRepo.create(userId, dto);
  }
}
