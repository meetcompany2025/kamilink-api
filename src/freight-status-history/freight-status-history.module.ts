// src/modules/freight-status-history/freight-status-history.module.ts

import { Module } from '@nestjs/common';
import { FreightStatusGateway } from './gateways/freight-status.gateway';
import { PrismaFreightStatusHistoryRepository } from './repositories/freight-status-history.repository';
import { FreightStatusNotificationController } from './freight-status-notification.controller';
import { FREIGHTS_STATUS_HISTORY_REPOSITORY } from './repositories/freight-status-history.repository.interface';
import { PrismaService } from 'src/database/prisma.service';
import { RegisterFreightStatusChangeUseCase } from './use-cases/register-freight-status-change.use-case';

@Module({
  controllers: [FreightStatusNotificationController],
  providers: [
    FreightStatusGateway,
    RegisterFreightStatusChangeUseCase,
    PrismaService,
    {
      provide: FREIGHTS_STATUS_HISTORY_REPOSITORY,
      useClass: PrismaFreightStatusHistoryRepository,
    },
  ],
  exports: [RegisterFreightStatusChangeUseCase, FreightStatusGateway], // Exporting the use case to be used in other modules
})
export class FreightStatusHistoryModule {}
