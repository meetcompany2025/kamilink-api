// 📁 src/uploads/uploads.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

// Controllers
import { UploadController } from './upload.controller';

// Services e Use-Cases
import { UploadService } from './upload.service';
import { GetImagesByUserUseCase } from './use-cases/get-images-by-user.use-case';
import { GetImagesByVehicleUseCase } from './use-cases/get-images-by-vehicle.use-case';
import { GetImagesByFreightUseCase } from './use-cases/get-images-by-freight.use-case';
import { ViewImageUseCase } from './use-cases/view-image.use-case';
import { DeleteImageUseCase } from './use-cases/delete-image.use-case';

// Repositórios
import { ImagesRepository } from './repositories/images.repository';
import { IMAGES_REPOSITORY } from './repositories/images.repository.interface';

// Storage Provider (R2 por padrão)
import { STORAGE_PROVIDER } from './upload.tokens';

// Prisma
import { PrismaService } from 'src/database/prisma.service';
// import { R2StorageProvider } from './providers/r2-storage.provider';
import { LocalStorageProvider } from './providers/local-storage.provider';
import { B2StorageProvider } from './providers/b2-storage.provider';
import { UpdateVehicleStatusUseCase } from 'src/vehicles/use-cases/update-vehicle-status.usecase';
import { VehiclesModule } from 'src/vehicles/vehicles.module';
import { UploadTransporterDocumentsUseCase } from './use-cases/transporter/upload-transporter-documents-usecase';
import { UpdateTransporterStatusUseCase } from './use-cases/transporter/upload-transporter-status-usecase';
import { UpsertProfileImageUseCase } from './use-cases/upsert-profile-image-usecase';
import { ConfigModule } from '@nestjs/config';

/**
 * Módulo responsável por toda lógica de upload.
 * Aqui configuramos:
 * - Multer (em memória, pois enviamos arquivos diretamente ao R2)
 * - Provider de Storage (R2, mas pode ser trocado por Local/S3)
 * - Repositórios
 * - Casos de uso
 */
@Module({
  imports: [
    ConfigModule,
    MulterModule.register({
      storage: memoryStorage(), // arquivos ficam na memória (ideal para R2)
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB por arquivo
      },
    }),
    forwardRef(() => VehiclesModule),
  ],

  controllers: [UploadController],

  providers: [
    PrismaService,

    // Serviço principal
    UploadService,

    // Repositório de imagens
    {
      provide: IMAGES_REPOSITORY,
      useClass: ImagesRepository,
    },

    // Storage Provider (Cloudflare R2)
    // // {
    // //   provide: STORAGE_PROVIDER,
    // //   useClass: R2StorageProvider,
    // // },

    // Provider de testes (LocalStorage)
    // { provide: STORAGE_PROVIDER, useClass: LocalStorageProvider },
    { provide: STORAGE_PROVIDER, useClass: B2StorageProvider },

    // Casos de uso
    GetImagesByUserUseCase,
    GetImagesByVehicleUseCase,
    GetImagesByFreightUseCase,
    ViewImageUseCase,
    DeleteImageUseCase,
    ImagesRepository,
    UpdateVehicleStatusUseCase,
    UploadTransporterDocumentsUseCase,
    UpdateTransporterStatusUseCase,
    UpsertProfileImageUseCase,

  ],

  exports: [
    STORAGE_PROVIDER, ImagesRepository// permite usar o provider em outros módulos
  ],
})
export class UploadsModule { }
