// src/repositories/images.repository.ts

import { Injectable } from '@nestjs/common';
import { ImageType } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ImagesRepositoryInterface } from './images.repository.interface';

@Injectable()
export class ImagesRepository implements ImagesRepositoryInterface {
  constructor(private prisma: PrismaService) { }

  // Método para criar uma nova imagem
  async createImage(data: {
    type: ImageType;
    path: string;
    filename: string;
    userId?: string;
    vehicleId?: string;
    freightId?: string;
  }) {
    return this.prisma.image.create({ data });
  }

  // Método para encontrar imagens por ID de usuário
  async findByUserId(userId: string) {
    const images = await this.prisma.image.findMany({ where: { userId } });
    return images;
  }

  // Método para encontrar imagens por ID de veículo
  async findByVehicleId(vehicleId: string) {
    const images = await this.prisma.image.findMany({ where: { vehicleId } });
    return images;
  }

  // Método para encontrar imagens por ID de frete
  async findByFreightId(freightId: string) {
    const images = await this.prisma.image.findMany({ where: { freightId } });
    return images;
  }

  // Método para encontrar uma imagem pelo ID
  async findById(id: string) {
    const image = await this.prisma.image.findUnique({ where: { id } });
    return image;
  }

  // Método para deletar uma imagem pelo ID
  async deleteById(id: string) {
    await this.prisma.image.delete({ where: { id } });
  }

}
