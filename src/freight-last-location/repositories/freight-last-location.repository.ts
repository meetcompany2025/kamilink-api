import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { FreightLastLocationRepositoryInterface } from './freight-last-location.repository.interface';
import { UpdateFreightLastLocationDto } from '../dto/update-last-location.dto';

@Injectable()
export class FreightLastLocationRepository implements FreightLastLocationRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async upsertByFreightId(dto: UpdateFreightLastLocationDto) {
    return await this.prisma.freightLastLocation.upsert({
      where: { freightId: dto.freightId },
      update: {
        latitude: dto.latitude,
        longitude: dto.longitude,
        speed: dto.speed,
        direction: dto.direction,
        timestamp: dto.timestamp ?? new Date(),
      },
      create: {
        freightId: dto.freightId,
        latitude: dto.latitude,
        longitude: dto.longitude,
        speed: dto.speed,
        direction: dto.direction,
        timestamp: dto.timestamp ?? new Date(),
      },
    });
  }
}
