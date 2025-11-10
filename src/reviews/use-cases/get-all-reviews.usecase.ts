import { Inject, Injectable } from '@nestjs/common';
import { REVIEWS_REPOSITORY, ReviewsRepositoryInterface } from '../repositories/reviews.repository.interface';

/**
 * Use case for retrieving all reviews with optional filters.
 * This use case allows filtering by client ID, driver ID, and date range.
 */
@Injectable()
export class GetAllReviewsUseCase {
    constructor(
        @Inject(REVIEWS_REPOSITORY)
        private readonly reviewsRepository: ReviewsRepositoryInterface,
    ) { }

    async execute(filters?: {
        clientId?: string;
        driverId?: string;
        startDate?: Date;
        endDate?: Date;
    }) {
        return this.reviewsRepository.findAllWithFilters(filters);
    }
}
