import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ImagesRepository } from './repositories/images.repository';
import { IMAGES_REPOSITORY } from './repositories/images.repository.interface';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PrismaService } from 'src/database/prisma.service';
import { GetImagesByUserUseCase } from './use-cases/get-images-by-user.use-case';
import { GetImagesByVehicleUseCase } from './use-cases/get-images-by-vehicle.use-case';
import { ViewImageUseCase } from './use-cases/view-image.use-case';
import { DeleteImageUseCase } from './use-cases/delete-image.use-case';
import { GetImagesByFreightUseCase } from './use-cases/get-images-by-freight.use-case';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [
    UploadService,
    PrismaService,
    ImagesRepository,
    {
      provide: IMAGES_REPOSITORY,
      useClass: ImagesRepository,
    },
    GetImagesByUserUseCase,
    GetImagesByVehicleUseCase,
    GetImagesByFreightUseCase,
    ViewImageUseCase,
    DeleteImageUseCase,
  ],
})
export class UploadsModule {}
