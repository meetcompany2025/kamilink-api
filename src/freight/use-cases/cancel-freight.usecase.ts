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

    @Inject(CreateNotificationUseCase)
    private createNotificationUseCase: CreateNotificationUseCase,
  ) { }

  async execute(
    freightId: string,
    userId: string,
    userProfile: UserProfile,
    reason: string,
  ) {
    // Busca o frete pelo ID
    const freight = await this.freightsRepository.findById(freightId);

    // Verifica se o frete existe
    if (!freight) {
      throw new NotFoundException('Frete não encontrado.');
    }

    // REGRA: Apenas CLIENTE e ADMIN podem cancelar fretes
    if (userProfile !== 'CLIENT' && userProfile !== 'ADMIN') {
      throw new ForbiddenException('Apenas clientes e administradores podem cancelar fretes.');
    }

    // REGRA: Cliente só pode cancelar seus próprios fretes
    if (userProfile === 'CLIENT' && freight.clientId !== userId) {
      throw new ForbiddenException('Você não pode cancelar este frete.');
    }

    // REGRA PRINCIPAL: Só é possível cancelar fretes com status PENDING
    // Esta regra se aplica tanto para CLIENTE quanto para ADMIN
    if (freight.status !== FreightStatus.PENDING) {
      throw new BadRequestException(
        'Só é possível cancelar fretes com status PENDENTE. ' +
        'Uma vez que o frete tenha sido aceito ou esteja em andamento, ' +
        'não pode mais ser cancelado por ninguém.'
      );
    }

    // Atualiza o status do frete para CANCELED
    const freightUpdate = await this.freightsRepository.updateStatus(
      freightId,
      FreightStatus.CANCELED,
      reason,
    );

    // Registra a mudança de status no histórico
    await this.registerStatusChange.execute({
      freightId,
      newStatus: FreightStatus.CANCELED,
    });

    // Prepara e envia notificação de cancelamento
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