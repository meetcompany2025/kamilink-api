// src/uploads/repositories/images.repository.interface.ts

import { Image, ImageType, VehicleDocumentType } from '@prisma/client';

/**
 * Constante para injeção de dependência no NestJS
 */
export const IMAGES_REPOSITORY = 'IMAGES_REPOSITORY';

/**
 * Interface abstrata para o repositório de imagens.
 * Define todos os métodos que o repositório concreto deve implementar.
 * Inclui suporte a documentos de veículo via VehicleDocumentType.
 */
export abstract class ImagesRepositoryInterface {
  /**
   * Cria uma nova imagem no banco.
   * @param data - informações da imagem, incluindo tipo, caminho, nome de arquivo, IDs relacionados e tipo de documento (opcional)
   * @returns A imagem criada
   */
  abstract createImage(data: {
    type: ImageType;
    path: string;
    filename: string;
    userId?: string;
    vehicleId?: string;
    freightId?: string;
    documentType?: VehicleDocumentType; // Adicionado para suportar documentos de veículo
  }): Promise<Image>;

  /**
   * Busca todas as imagens de um usuário específico
   * @param userId - ID do usuário
   * @returns Lista de imagens
   */
  abstract findByUserId(userId: string): Promise<Image[]>;

  /**
   * Busca todas as imagens de um veículo específico
   * @param vehicleId - ID do veículo
   * @returns Lista de imagens
   */
  abstract findByVehicleId(vehicleId: string): Promise<Image[]>;

  /**
   * Busca todas as imagens de um frete específico
   * @param freightId - ID do frete
   * @returns Lista de imagens
   */
  abstract findByFreightId(freightId: string): Promise<Image[]>;

  /**
   * Busca uma imagem pelo seu ID
   * @param id - ID da imagem
   * @returns A imagem encontrada ou null
   */
  abstract findById(id: string): Promise<Image | null>;

  /**
   * Deleta uma imagem pelo seu ID
   * @param id - ID da imagem
   */
  abstract deleteById(id: string): Promise<void>;

  /**
   * Busca todos os documentos de um veículo (TITLE, INSURANCE, IPO, IVM)
   * @param vehicleId - ID do veículo
   * @returns Lista de imagens/documentos do veículo
   */
  abstract findDocumentsByVehicle(vehicleId: string): Promise<Image[]>;

  /**
   * Busca imagens de um veículo filtrando por tipo de documento
   * @param vehicleId - ID do veículo
   * @param documentType - Tipo de documento (VehicleDocumentType)
   * @returns Lista de imagens do veículo com o tipo especificado
   */
  abstract findByVehicleAndDocumentType(vehicleId: string, documentType: VehicleDocumentType): Promise<Image[]>;
  abstract findDocumentsByTransporter(userId: string): Promise<Image[]>;
}
