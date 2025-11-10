import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IMAGES_REPOSITORY, ImagesRepositoryInterface } from 'src/uploads/repositories/images.repository.interface';
import { unlink } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class DeleteImageUseCase {
  constructor(
    @Inject(IMAGES_REPOSITORY)
    private readonly imagesRepository: ImagesRepositoryInterface,
  ) {}

  async execute(id: string): Promise<void> {
    const image = await this.imagesRepository.findById(id);
    if (!image) {
      throw new NotFoundException('Imagem não encontrada');
    }

    await this.imagesRepository.deleteById(id);

    const filePath = join(process.cwd(), image.path);
    try {
      await unlink(filePath);
    } catch {
      // Arquivo já não existia — não lançar erro
    }
  }
}
