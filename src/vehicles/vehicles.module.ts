import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateVehicleUseCase } from './use-cases/create-vehicle.usecase';
import { GetAllVehiclesUseCase } from './use-cases/get-all-vehicles.usecase';
import { GetTransporterVehiclesUseCase } from './use-cases/get-transporter-vehicles.usecase';
import { GetVehicleDetailUseCase } from './use-cases/get-vehicle-detail.usecase';
import { VEHICLES_REPOSITORY } from './repositories/vehicles.repository.interface';
import { VehiclesRepository } from './repositories/vehicles.repository';
import { VehiclesController } from './vehicles.controller';

@Module({
  controllers: [VehiclesController],
  providers: [
    CreateVehicleUseCase,
    GetAllVehiclesUseCase,
    GetTransporterVehiclesUseCase,
    GetVehicleDetailUseCase,
    PrismaService,
    {
      provide: VEHICLES_REPOSITORY,
      useClass: VehiclesRepository,
    },
  ],
})
export class VehiclesModule {}
