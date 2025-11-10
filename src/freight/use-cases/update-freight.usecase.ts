import { Inject, Injectable } from '@nestjs/common';
import {
  FREIGHTS_REPOSITORY,
  FreightsRepositoryInterface,
} from '../repositories/freights.repository.interface';
import { UpdateFreightDto } from '../dto/update-freight_offer.dto';
import { notificationTemplates } from 'src/notification/notification-helper';
import { CreateNotificationUseCase } from 'src/notification/use-cases/create-notification.usecase';

@Injectable()
export class UpdateFreightUseCase {
  constructor(
    @Inject(FREIGHTS_REPOSITORY)
    private freightsRepository: FreightsRepositoryInterface,

    @Inject(CreateNotificationUseCase) // Importa o caso de uso de notificação
    private createNotificationUseCase: CreateNotificationUseCase,
  ) { }
  /**
   * Executes the use case to create a new freight.
   * @param dto - The data transfer object containing freight details.
   * @param clientId - The ID of the client creating the freight.
   * @returns The created freight.
   */
  async execute(dto: UpdateFreightDto, clientId: string) {
    const freight = await this.freightsRepository.update(clientId, dto);

    // 🔔 Criar notificação ao cliente
    const template = notificationTemplates.freightStatus({
      freightId: freight.id,
    });

    await this.createNotificationUseCase.execute({
      userId: clientId,
      title: template.title,
      message: template.message,
      type: template.type,
      relatedId: freight.id,
    });

    return freight;
  }
}



