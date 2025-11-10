import { Inject, Injectable } from '@nestjs/common';
import { IMAGES_REPOSITORY, ImagesRepositoryInterface } from 'src/uploads/repositories/images.repository.interface';
import { Image } from '@prisma/client';

@Injectable()
export class GetImagesByVehicleUseCase {
  constructor(
    @Inject(IMAGES_REPOSITORY)
    private readonly imagesRepository: ImagesRepositoryInterface,
  ) {}

  async execute(vehicleId: string): Promise<Image[]> {
    return this.imagesRepository.findByVehicleId(vehicleId);
  }
}
