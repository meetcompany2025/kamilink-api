import { Inject, Injectable } from '@nestjs/common';
import { REVIEWS_REPOSITORY, ReviewsRepositoryInterface } from '../repositories/reviews.repository.interface';

@Injectable()
export class GetDriverReviewsUseCase {
  constructor(
    @Inject(REVIEWS_REPOSITORY)
    private readonly reviewsRepo: ReviewsRepositoryInterface,
  ) {}

  async execute(driverId: string) {
    return this.reviewsRepo.findManyByDriverId(driverId);
  }
}
