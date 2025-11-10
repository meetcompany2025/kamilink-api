

import { Image, ImageType } from '@prisma/client';

export const IMAGES_REPOSITORY = 'IMAGES_REPOSITORY';

export abstract class ImagesRepositoryInterface {
  abstract createImage(data: {
    type: ImageType;
    path: string;
    filename: string;
    userId?: string;
    vehicleId?: string;
    freightId?: string;
  }): Promise<Image>;

  abstract findByUserId(userId: string): Promise<Image[]>;
  abstract findByVehicleId(vehicleId: string): Promise<Image[]>;
  abstract findByFreightId(freightId: string): Promise<Image[]>;

  abstract findById(id: string): Promise<Image | null>;
  abstract deleteById(id: string): Promise<void>;
}
