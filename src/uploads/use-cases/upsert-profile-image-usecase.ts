// src/uploads/use-cases/upsert-profile-image.use-case.ts
import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { ImageType } from '@prisma/client';
import { UploadService } from '../upload.service';
import { DeleteImageUseCase } from './delete-image.use-case';
import { IMAGES_REPOSITORY, ImagesRepositoryInterface } from '../repositories/images.repository.interface';

@Injectable()
export class UpsertProfileImageUseCase {
    constructor(
        private readonly uploadService: UploadService,
        private readonly deleteImageUseCase: DeleteImageUseCase,

        @Inject(IMAGES_REPOSITORY)
        private readonly imagesRepository: ImagesRepositoryInterface,
    ) { }

    async execute(
        file: Express.Multer.File,
        userId: string,
    ) {
        // 1. Validar arquivo
        if (!file) {
            throw new BadRequestException('Nenhum arquivo foi enviado.');
        }

        if (!file.mimetype.startsWith('image/')) {
            throw new BadRequestException('Apenas imagens são permitidas para foto de perfil.');
        }

        // 2. Deletar TODAS as imagens de perfil existentes
        const deletedCount = await this.deleteAllExistingProfileImages(userId);
        console.log(`🗑️ Deletadas ${deletedCount} imagens de perfil existentes para o usuário ${userId}`);

        // 3. Criar nova imagem
        const newImage = await this.uploadService.handleUpload(file, ImageType.PROFILE_IMAGE, {
            userId,
        });

        console.log(`✅ Nova imagem de perfil criada: ${newImage.id}`);

        return newImage;
    }

    /**
     * Deleta TODAS as imagens de perfil existentes para o usuário
     */
    private async deleteAllExistingProfileImages(userId: string): Promise<number> {
        try {
            // Buscar todas as imagens do usuário
            const userImages = await this.imagesRepository.findByUserId(userId);

            // Filtrar apenas imagens de perfil
            const profileImages = userImages.filter(img => img.type === ImageType.PROFILE_IMAGE);

            console.log(`🔍 Encontradas ${profileImages.length} imagens de perfil para deletar`);

            // Deletar cada imagem
            for (const image of profileImages) {
                try {
                    await this.deleteImageUseCase.execute(image.id);
                    console.log(`✅ Imagem ${image.id} deletada com sucesso`);
                } catch (deleteError) {
                    console.error(`❌ Erro ao deletar imagem ${image.id}:`, deleteError);
                    // Continuar mesmo se uma falhar
                }
            }

            return profileImages.length;

        } catch (error) {
            console.error('❌ Erro ao buscar imagens existentes:', error);
            return 0;
        }
    }
}