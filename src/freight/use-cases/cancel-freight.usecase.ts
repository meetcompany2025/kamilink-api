import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FreightStatus, UserProfile } from '@prisma/client';
import {
  FREIGHTS_REPOSITORY,
  FreightsRepositoryInterface,
} from '../repositories/freights.repository.interface';
import { RegisterFreightStatusChangeUseCase } from 'src/freight-status-history/use-cases/register-freight-status-change.use-case';
import { notificationTemplates } from 'src/notification/notification-helper';
import { CreateNotificationUseCase } from 'src/notification/use-cases/create-notification.usecase';

@Injectable()
export class CancelFreightUseCase {
  constructor(
    @Inject(FREIGHTS_REPOSITORY)
    private freightsRepository: FreightsRepositoryInterface,
    private registerStatusChange: RegisterFreightStatusChangeUseCase,

    @Inject(CreateNotificationUseCase) // Importa o caso de uso de notificação
    private createNotificationUseCase: CreateNotificationUseCase,
  ) {}

  async execute(
    freightId: string,
    userId: string,
    userProfile: UserProfile,
    reason: string,
  ) {
    const freight = await this.freightsRepository.findById(freightId);

    if (!freight) throw new NotFoundException('Frete não encontrado.');

    // Regras de cancelamento
    if (userProfile === 'CLIENT' && freight.clientId !== userId) {
      throw new ForbiddenException('Você não pode cancelar este frete. 1');
    }
    if (userProfile === 'TRANSPORTER' && freight.transporterId !== userId) {
      throw new ForbiddenException('Você não pode cancelar este frete. 2');
    }

    // Restrições de status conforme o perfil
    if (userProfile === 'CLIENT' && freight.status !== FreightStatus.PENDING) {
      throw new BadRequestException('Só é possível cancelar fretes pendentes.');
    }
    if (
      userProfile === 'TRANSPORTER' &&
      freight.status !== FreightStatus.IN_PROGRESS
    ) {
      throw new BadRequestException(
        'Só é possível cancelar fretes em andamento.',
      );
    }

    // Admin pode cancelar qualquer frete
    const freightUpdate = await this.freightsRepository.updateStatus(
      freightId,
      FreightStatus.CANCELED,
      reason,
    );

    // Registrar status "COMPLETED"
    await this.registerStatusChange.execute({
      freightId,
      newStatus: FreightStatus.CANCELED,
    });

    const template = notificationTemplates.canceledFreight({
      freightId: freight.id,
    });

    await this.createNotificationUseCase.execute({
      userId: userId,
      title: "Frete cancelado",
      message: template.message,
      type: template.type,
      relatedId: freight.id,
    });

    return freightUpdate;
  }
}
