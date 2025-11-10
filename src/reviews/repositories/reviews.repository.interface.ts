import { Review } from '@prisma/client';
import { CreateReviewDto } from '../dto/create-review.dto';

export const REVIEWS_REPOSITORY = 'REVIEWS_REPOSITORY';

export abstract class ReviewsRepositoryInterface {
  abstract create(data: CreateReviewDto): Promise<Review>;
  abstract findByFreightId(freightId: string): Promise<Review | null>;
  abstract findManyByClientId(clientId: string): Promise<Review[]>;
  abstract findManyByDriverId(driverId: string): Promise<Review[]>;
  abstract findAllWithFilters(filters?: {
    clientId?: string;
    driverId?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<Review[]>;
}
