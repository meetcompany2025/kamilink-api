import { CreateFreightLocationTrackingDto } from '../dto/create-freight-location-tracking.dto';

export const FREIGHT_LOCALIZATION_TRACKING_REPOSITORY = 'FREIGHT_LOCALIZATION_TRACKING_REPOSITORY';

export interface FreightLocationTrackingRepositoryInterface {
  create(data: CreateFreightLocationTrackingDto): Promise<void>;
  findLatestByFreightId(freightId: string): Promise<{
    latitude: number;
    longitude: number;
    speed?: number;
    direction?: string;
    updatedAt: Date;
  } | null>;
  isUserRelatedToFreight(
    profileId: string,
    role: string,
    freightId: string
  ): Promise<boolean>;
}
