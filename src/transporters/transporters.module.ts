import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TRANSPORTERS_REPOSITORY } from './repositories/transporter-repository.interface';
import { TransportersRepository } from './repositories/transporter.repository';
import { CreateTransporterUseCase } from './use-cases/create-transporter.usecase';
import { GetTransporterByDriverLicenseUseCase } from './use-cases/get-transporter-by-driver-license.usecase';
import { GetTransporterByLicensePlateUseCase } from './use-cases/get-transporter-by-license-plate.usecase';
import { GetAllTransportersUseCase } from './use-cases/get-all-transporters.usecase';
import { TransportersController } from './transporters.controller';
import { GetTransporterByIdUseCase } from './use-cases/get-transporter-by-id.usecase';

@Module({
  controllers: [TransportersController],
  providers: [
    CreateTransporterUseCase,
    GetTransporterByDriverLicenseUseCase,
    GetTransporterByLicensePlateUseCase,
    GetAllTransportersUseCase,
    GetTransporterByIdUseCase, 
    PrismaService,
    {
      provide: TRANSPORTERS_REPOSITORY,
      useClass: TransportersRepository,
    },
  ],
  exports: [
    TRANSPORTERS_REPOSITORY,
    CreateTransporterUseCase,
    GetTransporterByDriverLicenseUseCase,
    GetTransporterByLicensePlateUseCase,
  ],
})
export class TransportersModule {}
