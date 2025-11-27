import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { ReviewsRepositoryInterface } from './reviews.repository.interface';

@Injectable()
export class ReviewsRepository implements ReviewsRepositoryInterface {
  constructor(private prisma: PrismaService) { }
  // Implementing the findByFreightId method
  // This method will return a review by its freight ID or null if not found.
  async findByFreightId(freightId: string) {
    const review = await this.prisma.review.findFirst({
      where: { freightId },
    });

    return review;
  }

  // Implementing the create method
  // This method will create a new review in the database.
  async create(data: CreateReviewDto, userId: string) {
    const review = await this.prisma.review.create({

      data: {
        userId,
        ...data
      },
    });

    return review;
  }

  // Implementing the findManyByClientId method
  // This method will return all reviews made by a specific client.
  async findManyByClientId(clientId: string) {
    return this.prisma.review.findMany({
      where: {
        freight: {
          clientId: clientId,
        },
      },
      include: {
        freight: true,
      },
    });
  }

  /**
   * Endpoint to get reviews made by the authenticated client.
   * Only accessible by users with the CLIENT role.
   * @param req - The request object containing user information.
   * @returns A list of reviews made by the client.
   */
  async findManyByDriverId(transporterId: string) {
    return this.prisma.review.findMany({
      where: {
        freight: {
          transporterId: transporterId,
        },
      },
      include: {
        freight: true,
      },
    });
  }

  // Implementing the findAllWithFilters method
  // This method will return all reviews with optional filters for clientId, driverId, start
  async findAllWithFilters(filters?: {
    clientId?: string;
    transporterId?: string;
    startDate?: Date;
    endDate?: Date;
  }) {
    const { clientId, transporterId, startDate, endDate } = filters || {};

    return this.prisma.review.findMany({
      where: {
        freight: {
          ...(clientId && { clientId }),
          ...(transporterId && { transporterId }),
        },
        ...(startDate && { createdAt: { gte: startDate } }),
        ...(endDate && { createdAt: { lte: endDate } }),
      },
      include: {
        freight: true,
      },
    });
  }
}
