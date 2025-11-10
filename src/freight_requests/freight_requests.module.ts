/*import { Module } from '@nestjs/common';
import { FreightRequestsService } from './freight_requests.service';
import { FreightRequestsController } from './freight_requests.controller';
import { PrismaService } from 'src/database/prisma.service';
import { FREIGHT_REQUEST_REPOSITORY } from 'src/freight_requests/repositories/freight_request.repository.interface';
import { FreightRequestRepository } from 'src/freight_requests/repositories/freights_request.repository';
import { CreateFreightRequestUseCase } from './use-cases/create-freight.usecase';
import { GetClientFreightRequestsUseCase } from './use-cases/get-client-freights.usecase';
import { GetTransporterFreightRequestsUseCase } from './use-cases/get-transporter-freights.usecase';
import { GetFreightRequestDetailUseCase } from './use-cases/get-freight-detail.usecase';
import { GetAvailableFreightsUseCase } from './use-cases/get-available-freights.usecase';
import { AcceptFreightUseCase } from './use-cases/accept-freight.usecase';
import { CancelFreightUseCase } from './use-cases/cancel-freight.usecase';
import { FinishFreightUseCase } from './use-cases/finish-freight.usecase';
import { StartFreightUseCase } from './use-cases/start-freight.usecase';

@Module({
  controllers: [FreightRequestsController],
  providers: [
    CreateFreightRequestUseCase,
    GetClientFreightRequestsUseCase,
    GetFreightRequestDetailUseCase,
    GetAvailableFreightsUseCase,
    GetTransporterFreightRequestsUseCase,
    AcceptFreightUseCase,
    CancelFreightUseCase,
    FinishFreightUseCase,
    FreightRequestsService,
    StartFreightUseCase,
    PrismaService,
    {
      provide: FREIGHT_REQUEST_REPOSITORY,
      useClass: FreightRequestRepository,
    },
  ],
})
export class FreightRequestsModule {}
*/