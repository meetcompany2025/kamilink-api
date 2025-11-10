import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Request } from 'express';
import { CreateFreightDto } from './dto/create-freight_offer.dto';
import { CreateFreightUseCase } from './use-cases/create-freight.usecase';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JWTPayload } from 'src/auth/jwt.strategy';
import { GetAvailableFreightsUseCase } from './use-cases/get-available-freights.usecase';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AcceptFreightUseCase } from './use-cases/accept-freight.usecase';
import { GetAllFreightsUseCase } from './use-cases/get-all-freights.usecase';
import { StartFreightUseCase } from './use-cases/start-freight.usecase';
import { FinishFreightUseCase } from './use-cases/finish-freight.usecase';
import { CancelFreightUseCase } from './use-cases/cancel-freight.usecase';
import { ListClientFreightsUseCase } from './use-cases/list-client-freights.usecase';
import { ListDriverFreightsUseCase } from './use-cases/list-driver-freights.usecase';
import { ListAllFreightsUseCase } from './use-cases/list-all-freights.usecase';
import { GetFreightDetailUseCase } from './use-cases/get-freight-details.usecase';
import { UserProfile } from '@prisma/client';
import { CancelFreightDto } from './dto/cancel-freight.dto';
import { UpdateFreightDto } from './dto/update-freight_offer.dto';
import { UpdateFreightUseCase } from './use-cases/update-freight.usecase';

@Controller('freights')
export class FreightsController {
  constructor(
    private createFreightUseCase: CreateFreightUseCase,
    private getAllFreightsUseCase: GetAllFreightsUseCase,
    private getAvailableFreightsUseCase: GetAvailableFreightsUseCase,
    private acceptFreightUseCase: AcceptFreightUseCase,
    private startFreightUseCase: StartFreightUseCase,
    private finishFreightUseCase: FinishFreightUseCase,
    private cancelFreightUseCase: CancelFreightUseCase,
    private listClientFreights: ListClientFreightsUseCase,
    private listDriverFreights: ListDriverFreightsUseCase,
    private listAllFreights: ListAllFreightsUseCase,
    private getFreightDetailUseCase: GetFreightDetailUseCase,
    private updateFreightUseCase: UpdateFreightUseCase,
  ) {}

  /**
   * Endpoint to create a new freight.
   * Only accessible by users with the CLIENT role.
   * @param body - The data transfer object containing freight details.
   * @param req - The request object containing user information.
   * @returns The created freight.
   */
  /**
   * Endpoint to create a new freight.
   * Only accessible by users with the CLIENT role.
   */

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.CLIENT)
  async create(@Body() body: CreateFreightDto, @Req() req: Request) {
    const user = req.user as JWTPayload;
    // console.log(body, 'body from request');
    // console.log(user.userId, 'user id from request');
    return this.createFreightUseCase.execute(body, user.userId);
  }

  /**
   * Endpoint to get available freights.
   * Only accessible by users with the DRIVER or ADMIN roles.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.TRANSPORTER, UserProfile.ADMIN)
  @Get('available')
  async getAvailableFreights() {
    const getFreightsAvailables =
      await this.getAvailableFreightsUseCase.execute();
    return getFreightsAvailables;
  }
  // This controller handles freight-related operations such as creating a new freight and retrieving available freights.
  // It uses guards to ensure that only authenticated users with the appropriate roles can access these endpoints.

  /**
   * Endpoint to get all freights.
   * Only accessible by users with the DRIVER or ADMIN roles.
   * @returns A list of all freights.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.TRANSPORTER, UserProfile.ADMIN)
  @Get()
  async getAllFreights() {
    const freights = await this.getAllFreightsUseCase.execute();
    return freights;
  }

  /**
   * Endpoint to get user-specific freights.
   * Accessible by users with the CLIENT, DRIVER, or ADMIN roles.
   * @param req - The request object containing user information.
   * @returns A list of freights specific to the user.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('client/my')
  async getUserFreights(@Req() req: Request) {
    const user = req.user as any;

    if (user.profile === 'CLIENT') {
      return this.listClientFreights.execute(user.userId);
    }

    if (user.profile === 'TRANSPORTER') {
      return this.listDriverFreights.execute(user.userId);
    }

    if (user.profile === 'ADMIN') {
      return this.listAllFreights.execute();
    }
  }

  /**
   * Endpoint to start a freight.
   * Only accessible by users with the DRIVER role.
   * @param id - The ID of the freight to start.
   * @param req - The request object containing user information.
   * @returns The updated freight after starting.
   */
  @Patch(':id/start')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.TRANSPORTER)
  async startFreight(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as JWTPayload;

    const startedFreitgh = await this.startFreightUseCase.execute(
      id,
      user.userId,
    );
    return startedFreitgh;
  }

  /**
   * Endpoint to finish a freight.
   * Only accessible by users with the DRIVER role.
   * @param id - The ID of the freight to finish.
   * @param req - The request object containing user information.
   * @returns The updated freight after finishing.
   */
  @Patch(':id/finish')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.TRANSPORTER)
  async finishFreight(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as JWTPayload;
    return this.finishFreightUseCase.execute(id, user.userId);
  }


  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.CLIENT)
  async update(@Body() body: UpdateFreightDto, @Req() req: Request) {
    const user = req.user as JWTPayload;
    // console.log(body, 'body from request');
    // console.log(user.userId, 'user id from request');
    return this.updateFreightUseCase.execute(body, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getFreightDetailUseCase.execute(id);
  }

  /**
   * Endpoint to accept a freight.
   * Only accessible by users with the DRIVER role.
   * @param id - The ID of the freight to accept.
   * @param req - The request object containing user information.
   * @returns The updated freight after acceptance.
   */
  @Patch(':id/accept')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.TRANSPORTER)
  async acceptFreight(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as JWTPayload;
    return this.acceptFreightUseCase.execute(id, user.userId);
  }

  
  /**
   * Endpoint to cancel a freight.
   * Accessible by users with the CLIENT, DRIVER, or ADMIN roles.
   * @param id - The ID of the freight to cancel.
   * @param req - The request object containing user information.
   * @returns The updated freight after cancellation.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.CLIENT, UserProfile.TRANSPORTER, UserProfile.ADMIN)
  @Patch(':id/cancel')
  async cancelFreight(
    @Param('id') id: string,
    @Body() cancelDto: CancelFreightDto,
    @Req() req: Request,
  ) {
    const user = req.user as any;
    return this.cancelFreightUseCase.execute(
      id,
      user.userId,
      user.profile,
      cancelDto.reason,
    );
  }

  /**
   * Endpoint to create a new freight.
   * Only accessible by users with the CLIENT role.
   * @param body - The data transfer object containing freight details.
   * @param req - The request object containing user information.
   * @returns The created freight.
   */
  /**
   * Endpoint to create a new freight.
   * Only accessible by users with the CLIENT role.
   */
}
