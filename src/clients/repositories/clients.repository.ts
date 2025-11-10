import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ClientsRepositoryInterface } from './clients.repository.interface';

@Injectable()
export class ClientsRepository implements ClientsRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ClientCreateInput) {
    return await this.prisma.client.create({ data });
  }

  // Find a transporter by their driver license
  async findByNIF(nif: string) {
    const client = await this.prisma.client.findFirst({
      where: { nif },
      take: 1, // Ensure only one record is returned
    });

    return client;
  }

  async findByUserId(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    return client;
  }

  async findAll() {
    const clients = await this.prisma.client.findMany({
      include: {
        user: {
          include: {
            person: true
          }
        }
      }
    });

    return clients;
  }

  async findById(id: string) {
    const transporter = await this.prisma.client.findUnique({
      where: { id },
      include: {
        user: {
          include: {
            person: true,
            freightsAsClient: true
          }
        }
      }
    });

    return transporter;
  }
}
