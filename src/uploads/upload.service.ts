import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { ImageType, TransporterDocumentType, VehicleDocumentType } from '@prisma/client';
import { IMAGES_REPOSITORY, ImagesRepositoryInterface } from './repositories/images.repository.interface';
import { STORAGE_PROVIDER } from './upload.tokens';
import { StorageProvider } from './providers/storage.provider';

/**
 * Serviço responsável por lidar com uploads.
 * Agora utiliza o provider de storage injetável.
 */
@Injectable()
export class UploadService {
  constructor(
    @Inject(IMAGES_REPOSITORY)
    private imagesRepo: ImagesRepositoryInterface,

    @Inject(STORAGE_PROVIDER)
    private storageProvider: StorageProvider, // Provider genérico (R2, Local, S3)
  ) { }

  /**
   * Faz o upload do arquivo para o storage e salva no banco
   * @param file - arquivo recebido do Multer
   * @param type - tipo de imagem (Enum ImageType)
   * @param options - IDs relacionados (userId, vehicleId, freightId)
   * @returns A imagem salva
   */
  async handleUpload(
    file: Express.Multer.File,
    type: ImageType,
    options: {
      userId?: string;
      vehicleId?: string;
      freightId?: string;
      documentType?: VehicleDocumentType;
      documentTypeTransporter?: TransporterDocumentType; // ✅ Deve existir
    },
  ) {
    if (!file) throw new BadRequestException('Arquivo não enviado');

    // Validação do documentType para veículos
    if (type === ImageType.VEHICLE_DOCUMENT && !options.documentType) {
      throw new BadRequestException('documentType é obrigatório para documentos de veículo');
    }

    const fileKey = await this.storageProvider.upload(file, 'uploads');

    const savedImage = await this.imagesRepo.createImage({
      type,
      documentType: options.documentType,
      documentTypeTransporter: options.documentTypeTransporter, // ✅ NOVO
      path: fileKey,
      filename: file.originalname,
      ...options,
    });

    return savedImage;
  }

  // async handleUpload(
  //   file: Express.Multer.File,
  //   type: ImageType,
  //   options: { userId?: string; vehicleId?: string; freightId?: string },
  // ) {
  //   if (!file) throw new BadRequestException('Arquivo não enviado');

  //   // Faz upload no provider (R2) e recebe a key
  //   const fileKey = await this.storageProvider.upload(file, 'uploads');

  //   // Salva a referência no banco
  //   const savedImage = await this.imagesRepo.createImage({
  //     type,
  //     path: fileKey,
  //     filename: file.originalname,
  //     ...options,
  //   });

  //   return savedImage;
  // }
}
