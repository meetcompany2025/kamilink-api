// src/repositories/images.repository.ts

import { Injectable } from '@nestjs/common';
import { ImageType, VehicleDocumentType } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ImagesRepositoryInterface } from './images.repository.interface';

@Injectable()
export class ImagesRepository implements ImagesRepositoryInterface {
  constructor(private prisma: PrismaService) { }

  /**
   * Cria uma nova imagem no banco de dados.
   * @param data - informações da imagem, incluindo tipo, path, filename, IDs relacionados
   */
  async createImage(data: {
    type: ImageType;
    documentType?: VehicleDocumentType; // usar enum correto
    path: string;
    filename: string;
    userId?: string;
    vehicleId?: string;
    freightId?: string;
  }) {
    // console.log('🔍 DEBUG - IMAGE CREATE DATA:', data);
    return this.prisma.image.create({ data });
  }

  /**
   * Busca imagens por ID do veículo e filtra por tipo de documento.
   * Útil para verificar se todos os documentos obrigatórios foram enviados.
   * @param vehicleId - ID do veículo
   * @param documentType - tipo de documento: "TITLE", "INSURANCE", "IPO", "IVM"
   */
  async findByVehicleAndDocumentType(vehicleId: string, documentType: VehicleDocumentType) {
    return this.prisma.image.findMany({
      where: { vehicleId, documentType },
    });
  }

  /**
   * Busca todos os documentos obrigatórios de um veículo.
   * Retorna apenas documentos do tipo TITLE, INSURANCE, IPO e IVM.
   * @param vehicleId - ID do veículo
   */
  async findDocumentsByVehicle(vehicleId: string) {
    return this.prisma.image.findMany({
      where: {
        vehicleId,
        documentType: {
          in: ['TITLE', 'INSURANCE', 'IPO', 'IVM'],
        },
      },
    });
  }

  // --- Métodos já existentes, mantidos ---
  async findByUserId(userId: string) {
    return this.prisma.image.findMany({ where: { userId } });
  }

  async findByVehicleId(vehicleId: string) {
    return this.prisma.image.findMany({ where: { vehicleId } });
  }

  async findByFreightId(freightId: string) {
    return this.prisma.image.findMany({ where: { freightId } });
  }

  async findById(id: string) {
    return this.prisma.image.findUnique({ where: { id } });
  }

  async deleteById(id: string) {
    await this.prisma.image.delete({ where: { id } });
  }

  // No images.repository.ts - o método deve buscar por userId
  async findDocumentsByTransporter(userId: string) {
    return this.prisma.image.findMany({
      where: {
        userId, // ← Buscar pelo userId, não transporterId
        documentTypeTransporter: {
          in: ['BI', 'NIF', 'DRIVER_LICENSE'],
        },
      },
    });
  }
}
