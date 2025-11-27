// import { Injectable, BadRequestException, Inject } from '@nestjs/common';
// import { ImageType } from '@prisma/client';
// import {
//   IMAGES_REPOSITORY,
//   ImagesRepositoryInterface,
// } from './repositories/images.repository.interface';

// @Injectable()
// export class UploadService {
//   constructor(
//     @Inject(IMAGES_REPOSITORY)
//     private imagesRepo: ImagesRepositoryInterface,
//   ) { }

//   /**
//    * Handles the file upload process.
//    * @param file - The file to be uploaded.
//    * @param type - The type of the image.
//    * @param options - Additional options including userId, vehicleId, and freightId.
//    * @returns The saved image information.
//    */
//   async handleUpload(
//     file: Express.Multer.File,
//     type: ImageType,
//     options: { userId?: string; vehicleId?: string; freightId?: string },
//   ) {
//     if (!file) throw new BadRequestException('Arquivo não enviado');

//     const savedImage = await this.imagesRepo.createImage({
//       type,
//       path: file.path,
//       filename: file.filename,
//       ...options,
//     });

//     return savedImage;
//   }
// }
