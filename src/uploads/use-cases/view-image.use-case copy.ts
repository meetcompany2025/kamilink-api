// import { Inject, Injectable, NotFoundException } from '@nestjs/common';
// import { IMAGES_REPOSITORY, ImagesRepositoryInterface } from 'src/uploads/repositories/images.repository.interface';
// import { Image } from '@prisma/client';
// import { join } from 'path';
// import * as fs from 'fs';

// @Injectable()
// export class ViewImageUseCase {
//   constructor(
//     @Inject(IMAGES_REPOSITORY)
//     private readonly imagesRepository: ImagesRepositoryInterface,
//   ) {}

//   async execute(id: string): Promise<{ stream: fs.ReadStream; filename: string }> {
//     const image = await this.imagesRepository.findById(id);
//     if (!image) {
//       throw new NotFoundException('Imagem não encontrada');
//     }

//     const filePath = join(process.cwd(), image.path);
//     if (!fs.existsSync(filePath)) {
//       throw new NotFoundException('Arquivo não existe no disco');
//     }

//     const stream = fs.createReadStream(filePath);
//     return { stream, filename: image.filename };
//   }
// }
