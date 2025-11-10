import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FreightStatus } from '@prisma/client';
import {
  FREIGHTS_REPOSITORY,
  FreightsRepositoryInterface,
} from '../repositories/freights.repository.interface';
import { RegisterFreightStatusChangeUseCase } from 'src/freight-status-history/use-cases/register-freight-status-change.use-case';
import { notificationTemplates } from 'src/notification/notification-helper';
import { CreateNotificationUseCase } from 'src/notification/use-cases/create-notification.usecase';

@Injectable()
export class AcceptFreightUseCase {
  constructor(
    @Inject(FREIGHTS_REPOSITORY)
    private freightsRepository: FreightsRepositoryInterface,
    private registerStatusChange: RegisterFreightStatusChangeUseCase,

    @Inject(CreateNotificationUseCase) // Importa o caso de uso de notificação
    private createNotificationUseCase: CreateNotificationUseCase,
  ) {}

  async execute(freightId: string, driverId: string) {
    const freight = await this.freightsRepository.findById(freightId);

    if (!freight) throw new NotFoundException('Frete não encontrado');
    if (freight.status !== FreightStatus.PENDING)
      throw new BadRequestException('Frete não está disponível');

    const freightUpdated =
      await this.freightsRepository.updateStatusAndAssignDriver(
        freightId,
        driverId,
      );

    // Registrar status "ACCEPTED"
    await this.registerStatusChange.execute({
      freightId,
      newStatus: FreightStatus.ACCEPTED,
    });

    const template = notificationTemplates.acceptedFreight({
      freightId: freight.id,
    });

    await this.createNotificationUseCase.execute({
      userId: freightUpdated.clientId,
      title: 'Frete Aceite',
      message: template.message,
      type: template.type,
      relatedId: freight.id,
    });

    return freightUpdated;
  }
}
