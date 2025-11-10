import { Inject, Injectable } from '@nestjs/common';
import { FreightLocationTrackingGateway } from '../gateways/freight-location-tracking.gateway';
import { RegisterFreightLocationDto } from '../dto/register-freight-location.dto';
import { UpdateLastLocationUseCase } from 'src/freight-last-location/use-cases/update-last-location.usecase';
import { FREIGHT_LAST_LOCATION_REPOSITORY } from 'src/freight-last-location/repositories/freight-last-location.repository.interface';
import { UpdateFreightLastLocationDto } from 'src/freight-last-location/dto/update-last-location.dto';

@Injectable()
export class FreightLocationTrackingUseCase {
  constructor(
    private readonly gateway: FreightLocationTrackingGateway,
    
    @Inject(FREIGHT_LAST_LOCATION_REPOSITORY)
    private readonly updateLastLocationUseCase: UpdateLastLocationUseCase,
  ) {}

  async registerLocation(dto: UpdateFreightLastLocationDto) {
    // Atualiza a última localização do frete no banco
    await this.updateLastLocationUseCase.execute(dto);

    // Emite a nova localização em tempo real via WebSocket
    this.gateway.broadcastLocation(dto.freightId, {
      lat: dto.latitude,
      lng: dto.longitude,
      timestamp: dto.timestamp,
    });

    return { success: true };
  }
}
