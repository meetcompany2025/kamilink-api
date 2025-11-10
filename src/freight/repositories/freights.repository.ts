import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { FreightStatus } from '@prisma/client';
import { FreightsRepositoryInterface } from './freights.repository.interface';
import { CreateFreightDto } from '../dto/create-freight_offer.dto';
import { notificationTemplates } from 'src/notification/notification-helper';
import { UpdateFreightDto } from '../dto/update-freight_offer.dto';
import { randomUUID } from 'node:crypto';

@Injectable()
export class FreightsRepository implements FreightsRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateFreightDto, clientId: string) {
    const freight = this.prisma.freight.create({
      data: {
        ...data,
        // id: randomUUID(),
        pickupDate: data.pickupDate ? new Date(data.pickupDate) : null,
        deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : null,
        clientId,
        vehicleId: data.vehicleId ?? null,
      },
    });

    return freight;
  }

  //   get all freight
  async findAll() {
    const freights = await this.prisma.freight.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return freights;
  }

  //   get freight by ID
  async findById(id: string) {
    const freight = await this.prisma.freight.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            person: true,
          },
        },
      },
    });
    return freight;
  }

  //   get freithts availables
  async findAvailableFreights() {
    const freightsAvailables = await this.prisma.freight.findMany({
      where: {
        status: FreightStatus.PENDING,
        transporterId: null,
      },
      include: {
        client: {
          select: {
            person: true,
          },
        },
      },
    });

    return freightsAvailables;
  }

  async update(clientId: string, data: UpdateFreightDto) {
    const freight = await this.prisma.freight.update({
      where: { id: data.id, clientId: clientId },
      data: {
        ...data,
        pickupDate: data.pickupDate ? new Date(data.pickupDate) : null,
        deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : null,
      },
    });
    return freight;
  }

  //   update status freight to ACCEPTED and assign transporter
  //   @param freightId - The ID of the freight to update.
  async updateStatusAndAssignDriver(freightId: string, transporterId: string) {
    const freight = await this.prisma.freight.update({
      where: { id: freightId },
      data: {
        status: 'ACCEPTED',
        transporterId: transporterId,
      },
    });
    return freight;
  }
  //   update status freight
  async updateStatus(freightId: string, status: FreightStatus, reason: string) {
    let freight;

    if (reason) {
      freight = await this.prisma.freight.update({
        where: { id: freightId },
        data: { status, cancelationReason: reason, canceledAt: new Date() },
      });
    } else {
      freight = await this.prisma.freight.update({
        where: { id: freightId },
        data: { status, attributedAt: new Date() },
      });
    }

    return freight;
  }

  //   get freights by client ID
  //   @param clientId - The ID of the client to filter freights.
  async findByClient(clientId: string) {
    const freights = await this.prisma.freight.findMany({
      where: { clientId },
      orderBy: { createdAt: 'desc' },
    });

    return freights;
  }

  //   get freights by transporter ID
  //   @param transporterId - The ID of the transporter to filter freights.
  async findByDriver(transporterId: string) {
    const freights = await this.prisma.freight.findMany({
      where: { transporterId },
      orderBy: { createdAt: 'desc' },
    });

    return freights;
  }

  // Contar todos os fretes de um cliente
  async countByClientId(clientId: string): Promise<number> {
    return this.prisma.freight.count({
      where: { clientId },
    });
  }

  // Buscar fretes ativos (ex: em andamento)
  async findActiveByClientId(clientId: string) {
    return this.prisma.freight.findMany({
      where: {
        clientId,
        status: {
          in: ['IN_PROGRESS', 'ACCEPTED', 'PENDING'],
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Buscar fretes concluídos
  async findCompletedByClientId(clientId: string) {
    return this.prisma.freight.findMany({
      where: {
        clientId,
        status: 'COMPLETED',
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  // Buscar fretes pendentes (ex: aguardando confirmação)
  async findPendingByClientId(clientId: string) {
    return this.prisma.freight.findMany({
      where: {
        clientId,
        status: 'PENDING',
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  // Histórico de fretes (pode incluir concluídos, cancelados, etc.)
  async findHistoryByClientId(clientId: string) {
    return this.prisma.freight.findMany({
      where: {
        clientId,
        status: {
          in: ['COMPLETED', 'CANCELED'], // ou outros que considerar "histórico"
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findActiveByTransporterId(transporterId: string) {
    return this.prisma.freight.findMany({
      where: {
        transporterId,
        status: {
          in: ['ACCEPTED', 'IN_PROGRESS'],
        },
      },
    });
  }

  async findUpcomingByTransporterId(transporterId: string) {
    return this.prisma.freight.findMany({
      where: {
        transporterId,
        status: {
          in: ['ACCEPTED'],
        },
      },
      orderBy: { pickupDate: 'asc' },
    });
  }

  //Adicionar coluna completedAt
  async findCompletedByTransporterId(transporterId: string) {
    return this.prisma.freight.findMany({
      where: { transporterId, status: 'COMPLETED' },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findRecentByTransporterId(transporterId: string) {
    return this.prisma.freight.findMany({
      where: { transporterId },
      orderBy: { createdAt: 'desc' },
      take: 5, // últimos 5 fretes
    });
  }

  async cancelExpiredFreights(currentDate: Date): Promise<number> {
    const result = await this.prisma.freight.updateMany({
      where: {
        pickupDate: { lt: currentDate },
        status: { notIn: ['CANCELED', 'COMPLETED'] },
      },
      data: {
        status: FreightStatus.CANCELED,
        canceledAt: new Date(),
        cancelationReason: 'Data de recolha expirada',
      },
    });

    return result.count;
  }
}
