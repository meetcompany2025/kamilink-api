// src/modules/freight-status-history/infra/prisma/freight-status-history.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateFreightStatusHistoryInput, FreightStatusHistoryRepository } from './freight-status-history.repository.interface';

@Injectable()
export class PrismaFreightStatusHistoryRepository implements FreightStatusHistoryRepository {
  constructor(private readonly prisma: PrismaService) {}

    async create(input: CreateFreightStatusHistoryInput) {
    await this.prisma.freightStatusHistory.create({
      data: {
        freightId: input.freightId,
        status: input.status,
        timestamp: input.timestamp,
      },
    });
  }

}
