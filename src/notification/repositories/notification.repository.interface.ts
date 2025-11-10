import { Notification } from '@prisma/client';
import { CreateNotificationDto } from '../dto/create-notification.dto';

export const NOTIFICATIONS_REPOSITORY = 'NOTIFICATIONS_REPOSITORY';

export abstract class NotificationsRepositoryInterface {
  abstract create(data: CreateNotificationDto): Promise<Notification>;

  abstract findAll(): Promise<Notification[]>;

  abstract findById(id: string): Promise<Notification | null>;

  abstract findByUserId(userId: string): Promise<Notification[]>;

  abstract findUnreadByUserId(userId: string): Promise<Notification[]>;

  abstract markAsRead(id: string): Promise<Notification>;

  abstract markAllAsRead(userId: string): Promise<void>;

  abstract delete(id: string): Promise<void>;

  abstract countUnreadByUserId(userId: string): Promise<number>;
}
