// src/uploads/use-cases/view-image.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IMAGES_REPOSITORY, ImagesRepositoryInterface } from '../repositories/images.repository.interface';
import { StorageProvider } from '../providers/storage.provider';
import { STORAGE_PROVIDER } from '../upload.tokens';

@Injectable()
export class ViewImageUseCase {
  constructor(
    @Inject(IMAGES_REPOSITORY)
    private readonly imageRepo: ImagesRepositoryInterface,

    @Inject(STORAGE_PROVIDER)
    private readonly storageProvider: StorageProvider,
  ) { }

  async execute(id: string): Promise<{ filename: string; stream?: any; url?: string }> {
    const image = await this.imageRepo.findById(id);
    if (!image) throw new NotFoundException('Registro da imagem não encontrado.');

    // 1) Tentar streaming (para exibição direta)
    if (this.storageProvider.getFileStream) {
      const file = await this.storageProvider.getFileStream(image.path);
      if (file) {
        return { filename: file.filename, stream: file.stream };
      }
    }

    // 2) Para bucket PRIVADO: gerar URL assinada temporária
    if (this.storageProvider.getDownloadUrl) {
      try {
        // URL expira em 1 hora para segurança
        const url = await this.storageProvider.getDownloadUrl(image.path, 3600);
        return { filename: image.filename, url };
      } catch (error) {
        console.error('Erro ao gerar URL assinada:', error);
        throw new NotFoundException('Não foi possível acessar o arquivo.');
      }
    }

    throw new NotFoundException('Não foi possível acessar o arquivo da imagem.');
  }
}