import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Request } from 'express';
import { CreateReviewUseCase } from './use-cases/create-review.usecase';
import { CreateReviewDto } from './dto/create-review.dto';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { JWTPayload } from 'src/auth/jwt.strategy';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { Review } from './entities/review.entity';
import { GetClientReviewsUseCase } from './use-cases/get-client-reviews.usecase';
import { GetDriverReviewsUseCase } from './use-cases/get-driver-reviews.usecase';
import { GetAllReviewsUseCase } from './use-cases/get-all-reviews.usecase';
import { UserProfile } from '@prisma/client';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private createReviewUseCase: CreateReviewUseCase,
    private getClientReviewsUseCase: GetClientReviewsUseCase,
    private getDriverReviewsUseCase: GetDriverReviewsUseCase,
    private getAllReviewsUseCase: GetAllReviewsUseCase,
  ) {}

  /**
   * Endpoint to create a new review.
   * Only accessible by users with the CLIENT role.
   * @param dto - The data transfer object containing review details.
   * @param req - The request object containing user information.
   * @returns The created review.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth() // Indica necessidade do token Bearer
  @Roles(UserProfile.CLIENT)
  @Post()

  // swagger api description: 'Create a new review for a freight.'
  @ApiOperation({
    summary: 'Criar uma avaliação',
    description: 'Permite que clientes avaliem um frete finalizado.',
  })
  @ApiBody({ type: CreateReviewDto })
  @ApiResponse({
    status: 201,
    description: 'Avaliação criada com sucesso.',
    type: Review,
  })
  @ApiResponse({
    status: 403,
    description: 'Sem permissão ou regras violadas.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou frete não finalizado.',
  })
  async create(@Body() dto: CreateReviewDto, @Req() req: Request) {
    const user = req.user as JWTPayload;
    const review = await this.createReviewUseCase.execute(dto, user.userId);
    return review;
  }

  /**
   * Endpoint to get reviews made by the authenticated client.
   * Only accessible by users with the CLIENT role.
   * @param req - The request object containing user information.
   * @returns A list of reviews made by the client.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.CLIENT)
  @Get()
  @ApiOperation({
    summary: 'Listar avaliações feitas pelo cliente autenticado',
  })
  @ApiResponse({ status: 200, description: 'Lista de avaliações do cliente.' })
  async getClientReviews(@Req() req: Request) {
    const user = req.user as JWTPayload;
    return this.getClientReviewsUseCase.execute(user.userId);
  }

  /**
   * Endpoint to get reviews received by the authenticated driver.
   * Only accessible by users with the DRIVER role.
   * @param req - The request object containing user information.
   * @returns A list of reviews received by the driver.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.TRANSPORTER)
  @Get('received')
  @ApiOperation({
    summary: 'Listar avaliações recebidas pelo motorista autenticado',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de avaliações do motorista.',
  })
  async getDriverReviews(@Req() req: Request) {
    const user = req.user as JWTPayload;
    return this.getDriverReviewsUseCase.execute(user.userId);
  }

  /**
   * Endpoint to get all reviews with optional filters.
   * Only accessible by users with the ADMIN role.
   * @param clientId - Optional filter for client ID.
   * @param driverId - Optional filter for driver ID.
   * @param startDate - Optional filter for start date.
   * @param endDate - Optional filter for end date.
   * @returns A list of all reviews matching the filters.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.ADMIN)
  @Get('admin')
  @ApiOperation({ summary: 'Listar todas as avaliações (admin)' })
  @ApiQuery({ name: 'clientId', required: false })
  @ApiQuery({ name: 'driverId', required: false })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  async getAll(
    @Query('clientId') clientId?: string,
    @Query('driverId') driverId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.getAllReviewsUseCase.execute({
      clientId,
      driverId,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    });
  }
}
