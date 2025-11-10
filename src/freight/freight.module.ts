import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { FreightsController } from './freight.controller';
import { CreateFreightUseCase } from './use-cases/create-freight.usecase';
import { FreightsRepository } from './repositories/freights.repository';
import { GetAvailableFreightsUseCase } from './use-cases/get-available-freights.usecase';
import { AcceptFreightUseCase } from './use-cases/accept-freight.usecase';
import { GetAllFreightsUseCase } from './use-cases/get-all-freights.usecase';
import { StartFreightUseCase } from './use-cases/start-freight.usecase';
import { FinishFreightUseCase } from './use-cases/finish-freight.usecase';
import { CancelFreightUseCase } from './use-cases/cancel-freight.usecase';
import { FREIGHTS_REPOSITORY } from './repositories/freights.repository.interface';
import { ListClientFreightsUseCase } from './use-cases/list-client-freights.usecase';
import { ListDriverFreightsUseCase } from './use-cases/list-driver-freights.usecase';
import { ListAllFreightsUseCase } from './use-cases/list-all-freights.usecase';
import { FreightStatusHistoryModule } from 'src/freight-status-history/freight-status-history.module';
import { GetFreightDetailUseCase } from './use-cases/get-freight-details.usecase';
import { CreateNotificationUseCase } from 'src/notification/use-cases/create-notification.usecase';
import { NOTIFICATIONS_REPOSITORY } from 'src/notification/repositories/notification.repository.interface';
import { NotificationRepository } from 'src/notification/repositories/notification.repository';
import {
  NOTIFICATIONS_GATEWAY,
  NotificationsGateway,
} from 'src/notification/gateway/notification.gateway';
import { UpdateFreightUseCase } from './use-cases/update-freight.usecase';
import { GetTransporterDashboardUseCase } from 'src/transporters/use-cases/transporter-dashboard.usecase';
import { ScheduleModule } from '@nestjs/schedule';
import { FreightScheduler } from 'src/schedulers/freight.scheduler';
import { CancelExpiredFreightsUseCase } from './use-cases/cancel-expired-freights.usecase';

@Module({
  imports: [FreightStatusHistoryModule, ScheduleModule.forRoot()],
  controllers: [FreightsController],
  providers: [
    CreateFreightUseCase,
    UpdateFreightUseCase,
    FreightsRepository,
    GetAllFreightsUseCase,
    GetAvailableFreightsUseCase,
    AcceptFreightUseCase,
    StartFreightUseCase,
    FinishFreightUseCase,
    CancelFreightUseCase,
    ListClientFreightsUseCase,
    ListDriverFreightsUseCase,
    ListAllFreightsUseCase,
    GetFreightDetailUseCase,
    CreateNotificationUseCase,
    CancelExpiredFreightsUseCase,
    FreightScheduler,
    PrismaService,
    {
      provide: FREIGHTS_REPOSITORY,
      useClass: FreightsRepository,
    },
    {
      provide: NOTIFICATIONS_REPOSITORY,
      useClass: NotificationRepository,
    },
    {
      provide: NOTIFICATIONS_GATEWAY,
      useClass: NotificationsGateway,
    },
    // The PrismaService is injected to handle database operations
  ],
  exports: [CancelExpiredFreightsUseCase],
})
export class FreightsModule {}
