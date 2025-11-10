import { BadRequestException, ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { REVIEWS_REPOSITORY, ReviewsRepositoryInterface } from "../repositories/reviews.repository.interface";
import { FREIGHTS_REPOSITORY, FreightsRepositoryInterface } from "src/freight/repositories/freights.repository.interface";
import { CreateReviewDto } from "../dto/create-review.dto";


@Injectable()
export class CreateReviewUseCase {
  constructor(
    @Inject(REVIEWS_REPOSITORY)
    private reviewsRepo: ReviewsRepositoryInterface,

    @Inject(FREIGHTS_REPOSITORY)
    private freightsRepo: FreightsRepositoryInterface,
  ) { }

  async execute(dto: CreateReviewDto, userId: string) {
    const freight = await this.freightsRepo.findById(dto.freightId);

    if (!freight) {
      throw new BadRequestException('Frete não encontrado.');
    }

    if (freight.clientId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para avaliar este frete.',
      );
    }

    if (freight.status !== 'COMPLETED') {
      throw new BadRequestException(
        'Só é possível avaliar fretes finalizados.',
      );
    }

    const existingReview = await this.reviewsRepo.findByFreightId(
      dto.freightId,
    );
    if (existingReview) {
      throw new BadRequestException('Este frete já foi avaliado.');
    }

    return this.reviewsRepo.create(dto);
  }
}
