/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/*import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { FreightStatus } from '@prisma/client';
import { CreateFreightRequestDto } from '../dto/create-freight_request.dto';
import { FreightRequestRepositoryInterface } from './freight_request.repository.interface';

@Injectable()
export class FreightRequestRepository
  implements FreightRequestRepositoryInterface
{
  constructor(private prisma: PrismaService) {}

  async create(data: CreateFreightRequestDto) {
    const freight = await this.prisma.freightRequest.create({
      data: {
        id: data.id,
        cargoType: data.cargoType,
        deliveryDate: new Date(data.deliveryDate).toISOString(),
        destinationAddress: data.destinationAddress,
        destinationCity: data.destinationCity,
        destinationState: data.destinationState,
        originAddress: data.originAddress,
        originCity: data.originCity,
        originState: data.originState,
        pickupDate: new Date(data.pickupDate).toISOString(),
        quantity: data.quantity,
        weight: data.weight,
        clientId: data.clientId,
        description: data.description,
        dimensions: data.dimensions,
        hasInsurance: data.hasInsurance,
        requiresLoadingHelp: data.requiresLoadingHelp,
        requiresUnloadingHelp: data.requiresLoadingHelp,
      },
    });

    return freight;
  }

  //   get all freight
  async findAll() {
    const freights = await this.prisma.freightRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return freights;
  }

  //   get freight by ID
  async findById(id: string) {
    const freight = await this.prisma.freightRequest.findUnique({
      where: { id },
      include: {
        client: true
      }
    });
    return freight;
  }

  //   get freithts availables
  async findAvailableFreights() {
    const freightsAvailables = await this.prisma.freightRequest.findMany({
      where: {
        status: FreightStatus.PENDING,
      },
      include: {
        client: true
      }
    });

    return freightsAvailables;
  }

  //   get freights by client ID
  //   @param clientId - The ID of the client to filter freights.
  async findByClient(clientId: string) {
    const freights = await this.prisma.freightRequest.findMany({
      where: { clientId },
      orderBy: { createdAt: 'desc' },
    });

    return freights;
  }


  //   get freights by transporter ID
  //   @param transporterId - The ID of the transporter to filter freights.
  async findByTransporter(transporterId: string) {
    const freights = await this.prisma.freightRequest.findMany({
      where: { assignedTransporterId: transporterId },
      include: { client: true },
      orderBy: { createdAt: 'desc' },
    });

    return freights;
  }

  //   update status freight to ACCEPTED and assign driver
  //   @param freightId - The ID of the freight to update.
  async updateStatusAndAssignDriver(freightId: string, driverId: string) {
    const freight = await this.prisma.freightRequest.update({
      where: { id: freightId },
      data: {
        status: 'ACCEPTED',
        assignedTransporterId: driverId,
        attributedAt: new Date()
      },
    });
    return freight;
  }
  //   update status freight
  async updateStatus(freightId: string, status: FreightStatus) {
    let freight;
    if (FreightStatus.CANCELED) {
      freight = await this.prisma.freightRequest.update({
        where: { id: freightId },
        data: { status, cancelledAt: new Date() },
      });
    } else {
      freight = await this.prisma.freightRequest.update({
        where: { id: freightId },
        data: { status },
      });
    }

    return freight;
  }*/

  //   get freights by driver ID
  //   @param driverId - The ID of the driver to filter freights.
  /*async findByDriver(driverId: string) {
    const freights = await this.prisma.freight.findMany({
      where: { driverId },
      orderBy: { createdAt: 'desc' },
    });

    return freights;
  }*/
//}
