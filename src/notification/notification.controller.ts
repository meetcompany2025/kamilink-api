import { CreateNotificationUseCase } from './use-cases/create-notification.usecase';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { FindByUserIdUseCase } from './use-cases/find-by-user-id.usecase';
import { MarkAsReadUseCase } from './use-cases/mark-as-read.usecase';
import { CountUnreadByUserUseCase } from './use-cases/count-uread-by-user.usecase';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { JWTPayload } from 'src/auth/jwt.strategy';

@Controller('notification')
export class NotificationController {
  constructor(
    private createNotificationUseCase: CreateNotificationUseCase,
    private findByUserIdUseCase: FindByUserIdUseCase,
    private markAsReadUseCase: MarkAsReadUseCase,
    private CountUnreadByUserUseCase: CountUnreadByUserUseCase
  ) {}

  // Criar notificação
  @Post()
  async create(@Body() dto: CreateNotificationDto) {
    return this.createNotificationUseCase.execute(dto);
  }

  // Listar todas notificações
  /*@Get()
  async findAll() {
    return this.notificationUseCases.findAll();
  }

  // Buscar por ID
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.notificationUseCases.findById(id);
  }*/

  // Buscar por usuário
  @Get('user')
  @UseGuards(JwtAuthGuard)
  async findByUserId(@Req() req: Request) {
    const user = req.user as JWTPayload;
    return this.findByUserIdUseCase.execute(user.userId);
  }

  // Buscar não lidas de um usuário
  /*@Get('user/unread')
  @UseGuards(JwtAuthGuard)
  async findUnreadByUserId(@Req() req: Request) {
    const user = req.user as JWTPayload;
    return this.notificationUseCases.findUnreadByUserId(user.userId);
  }*/

  // Marcar como lida
  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.markAsReadUseCase.execute(id);
  }

  // Marcar todas como lidas
  /*@Patch('user/:userId/read-all')
  async markAllAsRead(@Param('userId') userId: string) {
    return this.notificationUseCases.markAllAsRead(userId);
  }*/

  // Contar não lidas
  @Get('user/unread/count')
  @UseGuards(JwtAuthGuard)
  async countUnreadByUserId(@Req() req: Request) {
    const user = req.user as JWTPayload;
    return this.CountUnreadByUserUseCase.execute(user.userId);
  }

  // Deletar notificação
  /*@Delete(':id')
  async delete(@Param('id') id: string) {
    return this.notificationUseCases.delete(id);
  }*/
}
