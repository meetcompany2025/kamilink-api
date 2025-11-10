import { Vehicle } from '@prisma/client';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';

export const VEHICLES_REPOSITORY = 'VEHICLES_REPOSITORY';

export interface VehiclesRepositoryInterface {
  create(userId: string, dto: CreateVehicleDto): Promise<Vehicle>;
  findAll(): Promise<Vehicle[]>;
  findOne(id: string): Promise<Vehicle | null>;
  findByUser(userId: string): Promise<Vehicle[]>;
}
