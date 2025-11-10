// src/modules/freight-status-history/repositories/freight-status-history.repository.interface.ts

import { FreightStatus } from "@prisma/client";


export interface CreateFreightStatusHistoryInput {
  freightId: string;
  status: FreightStatus;
  timestamp: Date;
}

export const FREIGHTS_STATUS_HISTORY_REPOSITORY = 'FREIGHTS_STATUS_HISTORY_REPOSITORY';

export abstract class FreightStatusHistoryRepository {
  abstract create(input: CreateFreightStatusHistoryInput): Promise<void>;
}
