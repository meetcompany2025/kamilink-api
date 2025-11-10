import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { FreightStatus } from '@prisma/client';
import { FreightsRepository } from '../repositories/freights.repository';
import {
  FREIGHTS_REPOSITORY,
  FreightsRepositoryInterface,
} from '../repositories/freights.repository.interface';
import { RegisterFreightStatusChangeUseCase } from 'src/freight-status-history/use-cases/register-freight-status-change.use-case';
import { CreateNotificationUseCase } from 'src/notification/use-cases/create-notification.usecase';
import { notificationTemplates } from 'src/notification/notification-helper';

@Injectable()
export class StartFreightUseCase {
  constructor(
    @Inject(FREIGHTS_REPOSITORY)
    private freightsRepository: FreightsRepositoryInterface,
    private registerStatusChange: RegisterFreightStatusChangeUseCase,

    @Inject(CreateNotificationUseCase) // Importa o caso de uso de notificação
    private createNotificationUseCase: CreateNotificationUseCase,
  ) {}

  async execute(freightId: string, transporterId: string) {
    const freight = await this.freightsRepository.findById(freightId);

    if (!freight) throw new NotFoundException('Frete não encontrado');
    if (freight.transporterId !== transporterId)
      throw new ForbiddenException('Você não pode iniciar este frete');
    if (freight.status !== FreightStatus.ACCEPTED) {
      throw new BadRequestException('Frete não pode ser iniciado neste status');
    }

    const freightUpdate = await this.freightsRepository.updateStatus(
      freightId,
      FreightStatus.IN_PROGRESS,
    );

    // Registrar status "ACCEPTED"
    await this.registerStatusChange.execute({
      freightId,
      newStatus: FreightStatus.IN_PROGRESS,
    });

    const template = notificationTemplates.freightStatus({
      freightId: freight.id,
    });

    await this.createNotificationUseCase.execute({
      userId: freightUpdate.clientId,
      title: 'Entrega Iniciada',
      message: template.message,
      type: template.type,
      relatedId: freight.id,
    });

    return freightUpdate;
  }
}
