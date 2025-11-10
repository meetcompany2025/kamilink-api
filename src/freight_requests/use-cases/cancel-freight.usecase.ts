/*import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FreightStatus, UserProfile } from '@prisma/client';
import {
  FREIGHT_REQUEST_REPOSITORY,
  FreightRequestRepositoryInterface,
} from '../repositories/freight_request.repository.interface';

@Injectable()
export class CancelFreightUseCase {
  constructor(
    @Inject(FREIGHT_REQUEST_REPOSITORY)
    private freightsRepository: FreightRequestRepositoryInterface,
  ) {}

  async execute(freightId: string, userId: string, userProfile: UserProfile) {
    const freight = await this.freightsRepository.findById(freightId);

    if (!freight) throw new NotFoundException('Frete não encontrado.');

    // Regras de cancelamento
    if (userProfile === UserProfile.CLIENT && freight.clientId !== userId) {
      throw new ForbiddenException('Você não pode cancelar este frete. 1');
    }
    if (
      userProfile === UserProfile.TRANSPORTER &&
      freight.assignedTransporterId !== userId
    ) {
      throw new ForbiddenException('Você não pode cancelar este frete. 2');
    }

    // Restrições de status conforme o perfil
    if (
      userProfile === UserProfile.CLIENT &&
      freight.status !== FreightStatus.PENDING
    ) {
      throw new BadRequestException('Só é possível cancelar fretes pendentes.');
    }
    if (
      userProfile === UserProfile.TRANSPORTER &&
      freight.status !== FreightStatus.IN_PROGRESS
    ) {
      throw new BadRequestException(
        'Só é possível cancelar fretes em andamento.',
      );
    }

    // Admin pode cancelar qualquer frete
    return this.freightsRepository.updateStatus(
      freightId,
      FreightStatus.CANCELLED,
    );
  }
}*/
