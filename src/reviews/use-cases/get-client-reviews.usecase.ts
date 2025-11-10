import { Inject, Injectable } from '@nestjs/common';
import { REVIEWS_REPOSITORY, ReviewsRepositoryInterface } from '../repositories/reviews.repository.interface';

@Injectable()
export class GetClientReviewsUseCase {
  constructor(
    @Inject(REVIEWS_REPOSITORY)
    private readonly reviewsRepository: ReviewsRepositoryInterface,
  ) {}

  /** */
  async execute(clientId: string) {
    return this.reviewsRepository.findManyByClientId(clientId);
  }
}
