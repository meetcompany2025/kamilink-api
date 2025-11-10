/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/*import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { FreightStatus } from '@prisma/client';
import { CreateFreightOfferDto } from '../dto/create-freight_offer.dto';
import { FreightOfferRepositoryInterface } from './freight_offer.repository.interface';

@Injectable()
export class FreightOfferRepository implements FreightOfferRepositoryInterface {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateFreightOfferDto) {
    const freight = await this.prisma.freightOffer.create({
      data: data,
    });

    return freight; 
  }

  //   get all freight
  async findAll() {
    const freights = await this.prisma.freightOffer.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return freights;
  }

  //   get freight by ID
  async findById(id: string) {
    const freight = await this.prisma.freightOffer.findUnique({
      where: { id },
    });
    return freight;
  }

  //   get freithts availables
  async findAvailableFreights() {
    const freightsAvailables = await this.prisma.freightOffer.findMany({
      where: {
        status: FreightStatus.PENDING,
      },
    });

    return freightsAvailables;
  }

  //   update status freight to ACCEPTED and assign driver
  //   @param freightId - The ID of the freight to update.
  /*async updateStatusAndAssignDriver(freightId: string, driverId: string) {
    const freight = await this.prisma.freight.update({
      where: { id: freightId },
      data: {
        status: 'ACCEPTED',
        driverId: driverId,
      },
    });
    return freight;
  }
  //   update status freight
  async updateStatus(freightId: string, status: FreightStatus) {
    const freight = await this.prisma.freight.update({
      where: { id: freightId },
      data: { status },
    });
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

  //   get freights by driver ID
  //   @param driverId - The ID of the driver to filter freights.
  async findByDriver(driverId: string) {
    const freights = await this.prisma.freight.findMany({
      where: { driverId },
      orderBy: { createdAt: 'desc' },
    });

    return freights;
  }*/
//}
