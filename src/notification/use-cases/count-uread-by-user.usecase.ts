import { Inject, Injectable } from '@nestjs/common';
import {
  NOTIFICATIONS_REPOSITORY,
  NotificationsRepositoryInterface,
} from '../repositories/notification.repository.interface';

@Injectable()
export class CountUnreadByUserUseCase {
  constructor(
    @Inject(NOTIFICATIONS_REPOSITORY)
    private notificationsRepository: NotificationsRepositoryInterface,
  ) {}
  /**
   * Executes the use case to create a new freight.
   * @param dto - The data transfer object containing freight details.
   * @returns The created freight.
   */
  async execute(userId: string) {
    const notification =
    await this.notificationsRepository.countUnreadByUserId(userId);
    return notification;
  }
}
