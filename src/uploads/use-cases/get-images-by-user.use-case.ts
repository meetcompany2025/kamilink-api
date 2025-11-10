

import { Inject, Injectable } from '@nestjs/common';
import { Image } from '@prisma/client';
import { IMAGES_REPOSITORY, ImagesRepositoryInterface } from '../repositories/images.repository.interface';

@Injectable()
export class GetImagesByUserUseCase {
  constructor(
    @Inject(IMAGES_REPOSITORY)
    private imagesRepo: ImagesRepositoryInterface,
  ) {}

  async execute(userId: string): Promise<Image[]> {
    return this.imagesRepo.findByUserId(userId);
  }
}
