import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { TransporterRepositoryInterface } from './transporter-repository.interface';
import { UpdateTransporterDto } from '../dto/update-transporter.dto';

@Injectable()
export class TransportersRepository implements TransporterRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new transporter
  async create(data: Prisma.TransporterCreateInput) {
    return await this.prisma.transporter.create({ data });
  }

  // Find a transporter by their driver license
  async findByDriverLicence(driverLicense: string) {
    const transporter = await this.prisma.transporter.findUnique({
      where: { driverLicense },
    });

    return transporter;
  }

  // Find a transporter by their license plate
  async findByLicensePlate(licensePlate: string) {
    const transporter = await this.prisma.transporter.findUnique({
      where: { licensePlate },
    });

    return transporter;
  }

  // Find a transporter by their license plate
  async findById(id: string) {
    const transporter = await this.prisma.transporter.findUnique({
      where: { id },
      include: {
        user: {
          include: {
            person: true,
            vehicles: true,
            freightsAsTransporter: true
          }
        }
      }
    });

    return transporter;
  }

  // Find a transporter by their driver license
  async findAll() {
    const transporter = await this.prisma.transporter.findMany({
      include: {
        user: {
          include: {
            person: true
          }
        }
      }
    });

    return transporter;
  }

  // Update a transporter data
  async update(id: string, data: Prisma.TransporterUpdateInput) {
    const transporter = await this.prisma.transporter.update({
      data,
      where: {
        id
      }
    });

    return transporter;
  }
}
