// src/uploads/use-cases/delete-image.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IMAGES_REPOSITORY, ImagesRepositoryInterface } from '../repositories/images.repository.interface';
import { STORAGE_PROVIDER } from '../upload.tokens';
import { StorageProvider } from '../providers/storage.provider';

@Injectable()
export class DeleteImageUseCase {
  constructor(
    @Inject(IMAGES_REPOSITORY)
    private readonly imagesRepository: ImagesRepositoryInterface,

    @Inject(STORAGE_PROVIDER)
    private readonly storageProvider: StorageProvider, // ✅ AGORA USA O PROVIDER
  ) { }

  async execute(id: string): Promise<void> {
    const image = await this.imagesRepository.findById(id);
    if (!image) {
      throw new NotFoundException('Imagem não encontrada');
    }

    // ✅ DELETA DO STORAGE (B2 ou Local) - COMPATÍVEL COM AMBOS
    await this.storageProvider.delete(image.path);

    // ✅ DELETA DO BANCO
    await this.imagesRepository.deleteById(id);
  }
}