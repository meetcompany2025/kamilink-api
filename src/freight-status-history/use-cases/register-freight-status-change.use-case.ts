// src/modules/freight-status/use-cases/register-freight-status-change.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { FreightStatusGateway } from '../gateways/freight-status.gateway';
import { RegisterFreightStatusChangeDto } from '../dto/register-freight-status-change.dto';
import {
  FREIGHTS_STATUS_HISTORY_REPOSITORY,
  FreightStatusHistoryRepository,
} from '../repositories/freight-status-history.repository.interface';

@Injectable()
export class RegisterFreightStatusChangeUseCase {
  constructor(
    @Inject(FREIGHTS_STATUS_HISTORY_REPOSITORY)
    private readonly historyRepository: FreightStatusHistoryRepository,
    private readonly gateway: FreightStatusGateway,
  ) {}

  async execute({
    freightId,
    newStatus,
    location, // { lat, lng }
  }: RegisterFreightStatusChangeDto & {
    location?: { lat: number; lng: number };
  }) {
    const timestamp = new Date();

    const record = await this.historyRepository.create({
      freightId,
      status: newStatus,
      timestamp,
    });

    this.gateway.emitStatusChange(freightId, newStatus, timestamp, location);

    return record;
  }
}
