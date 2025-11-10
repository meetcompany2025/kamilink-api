/*import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FreightStatus } from '@prisma/client';
import { UserProfile } from 'src/users/dto/create-user.dto';
import {
  FREIGHTS_REPOSITORY,
  FreightsRepositoryInterface,
} from '../repositories/freights.repository.interface';

@Injectable()
export class CancelFreightUseCase {
  constructor(
    @Inject(FREIGHTS_REPOSITORY)
    private freightsRepository: FreightsRepositoryInterface,
  ) { }

  async execute(freightId: string, userId: string, userProfile: UserProfile) {
    const freight = await this.freightsRepository.findById(freightId);

    if (!freight) throw new NotFoundException('Frete não encontrado.');

    // Regras de cancelamento
    if (userProfile === 'CLIENT' && freight.clientId !== userId) {
      throw new ForbiddenException('Você não pode cancelar este frete. 1');
    }
    if (userProfile === 'TRANSPORTER' && freight.driverId !== userId) {
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
    return this.freightsRepository.updateStatus(
      freightId,
      FreightStatus.CANCELED,
    );
  }
}
*/