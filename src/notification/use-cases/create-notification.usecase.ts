import { Inject, Injectable } from '@nestjs/common';
import {
  NOTIFICATIONS_REPOSITORY,
  NotificationsRepositoryInterface,
} from '../repositories/notification.repository.interface';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import {
  NOTIFICATIONS_GATEWAY,
  NotificationsGateway,
} from '../gateway/notification.gateway';

@Injectable()
export class CreateNotificationUseCase {
  constructor(
    @Inject(NOTIFICATIONS_REPOSITORY)
    private notificationsRepository: NotificationsRepositoryInterface,

    @Inject(NOTIFICATIONS_GATEWAY)
    private readonly notificationsGateway: NotificationsGateway,
  ) {}
  /**
   * Executes the use case to create a new freight.
   * @param dto - The data transfer object containing freight details.
   * @param clientId - The ID of the client creating the freight.
   * @returns The created freight.
   */
  async execute(dto: CreateNotificationDto) {
    const notification = await this.notificationsRepository.create(dto);

    this.notificationsGateway.sendNotification(dto.userId, notification);
    return notification;
  }
}
