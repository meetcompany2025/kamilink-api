/*import {
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
import { UserProfile } from 'src/users/dto/create-user.dto';
import { Request } from 'express';
import { CreateFreightOfferDto } from './dto/create-freight_offer.dto';
import { CreateFreightUseCase } from './use-cases/create-freight.usecase';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JWTPayload } from 'src/auth/jwt.strategy';
import { GetAvailableFreightsUseCase } from './use-cases/get-available-freights.usecase';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AcceptFreightUseCase } from './use-cases/accept-freight.usecase';
import { GetAllFreightsUseCase } from './use-cases/get-all-freights.usecase';
import { ListAllFreightsUseCase } from './use-cases/list-all-freights.usecase';

@Controller('freight_offers')
export class FreightOfferController {
  constructor(
    private createFreightUseCase: CreateFreightUseCase,
    private getAllFreightsUseCase: GetAllFreightsUseCase,
    private getAvailableFreightsUseCase: GetAvailableFreightsUseCase,
    private acceptFreightUseCase: AcceptFreightUseCase,
    //private listAllFreights: ListAllFreightsUseCase,
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

/*@UseGuards(JwtAuthGuard)
  @Roles(UserProfile.CLIENT)
  @Post()
  async create(@Body() body: CreateFreightOfferDto, @Req() req: Request) {
    const user = req.user as JWTPayload;
    console.log(user.userId, 'user id from request');
    return this.createFreightUseCase.execute(body);
  }*/

/**
 * Endpoint to get available freights.
 * Only accessible by users with the DRIVER or ADMIN roles.
 */
/*@UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.TRANSPORTER, UserProfile.ADMIN)
  @Get('available')
  async getAvailableFreights() {
    const getFreightsAvailables =
      await this.getAvailableFreightsUseCase.execute();
    return getFreightsAvailables;
  }*/
// This controller handles freight-related operations such as creating a new freight and retrieving available freights.
// It uses guards to ensure that only authenticated users with the appropriate roles can access these endpoints.

/**
 * Endpoint to get all freights.
 * Only accessible by users with the DRIVER or ADMIN roles.
 * @returns A list of all freights.
 */

/*@UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.TRANSPORTER, UserProfile.ADMIN)
  @Get()
  async getAllFreights() {
    const freights = await this.getAllFreightsUseCase.execute();
    return freights;
  }*/

/**
 * Endpoint to accept a freight.
 * Only accessible by users with the TRANSPORTER role.
 * @param id - The ID of the freight to accept.
 * @param req - The request object containing user information.
 * @returns The updated freight after acceptance.
 */
/*@Patch(':id/accept')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.TRANSPORTER)
  async acceptFreight(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as JWTPayload;
    return this.acceptFreightUseCase.execute(id /*, user.userId);
  }*/

/**
 * Endpoint to start a freight.
 * Only accessible by users with the TRANSPORTER role.
 * @param id - The ID of the freight to start.
 * @param req - The request object containing user information.
 * @returns The updated freight after starting.
 */
/*@Patch(':id/start')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.TRANSPORTER)
  async startFreight(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as JWTPayload;

    const startedFreitgh = await this.startFreightUseCase.execute(
      id,
      user.userId,
    );
    return startedFreitgh;
  }*/

/**
 * Endpoint to finish a freight.
 * Only accessible by users with the TRANSPORTER role.
 * @param id - The ID of the freight to finish.
 * @param req - The request object containing user information.
 * @returns The updated freight after finishing.
 */
/*@Patch(':id/finish')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.TRANSPORTER)
  async finishFreight(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as JWTPayload;
    return this.finishFreightUseCase.execute(id, user.userId);
  }*/

/**
 * Endpoint to cancel a freight.
 * Accessible by users with the CLIENT, TRANSPORTER, or ADMIN roles.
 * @param id - The ID of the freight to cancel.
 * @param req - The request object containing user information.
 * @returns The updated freight after cancellation.
 */
/*@UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.CLIENT, UserProfile.TRANSPORTER, UserProfile.ADMIN)
  @Patch(':id/cancel')
  async cancelFreight(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as any;
    return this.cancelFreightUseCase.execute(id, user.userId, user.profile);
  }*/

/**
 * Endpoint to get user-specific freights.
 * Accessible by users with the CLIENT, DRIVER, or ADMIN roles.
 * @param req - The request object containing user information.
 * @returns A list of freights specific to the user.
 */
/*@UseGuards(JwtAuthGuard, RolesGuard)
  @Get('my')
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
  }*/
//}
