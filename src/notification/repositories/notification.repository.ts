import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { UpdateNotificationDto } from '../dto/update-notification.dto';
import { NotificationsRepositoryInterface } from './notification.repository.interface';

@Injectable()
export class NotificationRepository
  implements NotificationsRepositoryInterface
{
  constructor(private prisma: PrismaService) {}

  async create(data: CreateNotificationDto) {
    return this.prisma.notification.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.notification.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.notification.findUnique({
      where: { id },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findUnreadByUserId(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId: userId, isRead: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async markAllAsRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: { userId: userId, isRead: false },
      data: { isRead: true },
    });
  }

  async delete(id: string) {
    await this.prisma.notification.delete({
      where: { id },
    });
  }

  async countUnreadByUserId(userId: string) {
    return this.prisma.notification.count({
      where: { userId: userId, isRead: false },
    });
  }
}
