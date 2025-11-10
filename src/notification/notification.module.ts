import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationRepository } from './repositories/notification.repository';
import { CreateNotificationUseCase } from './use-cases/create-notification.usecase';
import { PrismaService } from 'src/database/prisma.service';
import { FindByUserIdUseCase } from './use-cases/find-by-user-id.usecase';
import { MarkAsReadUseCase } from './use-cases/mark-as-read.usecase';
import { CountUnreadByUserUseCase } from './use-cases/count-uread-by-user.usecase';
import { NOTIFICATIONS_REPOSITORY } from './repositories/notification.repository.interface';
import {
  NOTIFICATIONS_GATEWAY,
  NotificationsGateway,
} from './gateway/notification.gateway';

@Module({
  controllers: [NotificationController],
  providers: [
    NotificationRepository,
    NotificationsGateway,
    CreateNotificationUseCase,
    FindByUserIdUseCase,
    MarkAsReadUseCase,
    CountUnreadByUserUseCase,
    PrismaService,
    {
      provide: NOTIFICATIONS_REPOSITORY,
      useClass: NotificationRepository,
    },
    {
      provide: NOTIFICATIONS_GATEWAY,
      useClass: NotificationsGateway,
    },
  ],
  exports: [CreateNotificationUseCase],
})
export class NotificationModule {}
