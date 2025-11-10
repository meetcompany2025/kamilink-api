import { Injectable } from '@nestjs/common';
import { VehiclesRepositoryInterface } from './vehicles.repository.interface';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class VehiclesRepository implements VehiclesRepositoryInterface {
  constructor(private prisma: PrismaService) {}
  /**
   * Creates a new vehicle in the database.
   * @param userId - The ID of the user creating the vehicle.
   * @param dto - The data transfer object containing vehicle details.
   * @returns The created vehicle.
   */
  async create(userId: string, dto: CreateVehicleDto) {
    return await this.prisma.vehicle.create({
      data: { ...dto, userId },
    });
  }

  async findByUser(userId: string) {
    return await this.prisma.vehicle.findMany({
      where: { userId },
    });
  }

  async findAll() {
    return await this.prisma.vehicle.findMany();
  }

  async findOne(id: string) {
   const vehicle = await this.prisma.vehicle.findUnique({
    where: { id },
   });
   
   return vehicle;
  }
}
