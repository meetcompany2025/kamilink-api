import { PrismaService } from 'src/database/prisma.service';
import { ReviewsController } from './reviews.controller';
import { CreateReviewUseCase } from './use-cases/create-review.usecase';
import { REVIEWS_REPOSITORY } from './repositories/reviews.repository.interface';
import { ReviewsRepository } from './repositories/reviews.repository';
import { Module } from '@nestjs/common';
import { GetClientReviewsUseCase } from './use-cases/get-client-reviews.usecase';
import { GetDriverReviewsUseCase } from './use-cases/get-driver-reviews.usecase';
import { GetAllReviewsUseCase } from './use-cases/get-all-reviews.usecase';
import { FREIGHTS_REPOSITORY } from 'src/freight/repositories/freights.repository.interface';
import { FreightsRepository } from 'src/freight/repositories/freights.repository';

@Module({
  controllers: [ReviewsController],
  providers: [
    CreateReviewUseCase,
    GetClientReviewsUseCase,
    GetDriverReviewsUseCase,
    GetAllReviewsUseCase,
    PrismaService,
    {
      provide: REVIEWS_REPOSITORY,
      useClass: ReviewsRepository,
    },
    {
      provide: FREIGHTS_REPOSITORY,
      useClass: FreightsRepository,
    },
  ],
})
export class ReviewsModule { }
