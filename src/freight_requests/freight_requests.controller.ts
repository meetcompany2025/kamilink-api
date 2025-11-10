/*import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FreightRequestsService } from './freight_requests.service';
import { CreateFreightRequestDto } from './dto/create-freight_request.dto';
import { UpdateFreightRequestDto } from './dto/update-freight_request.dto';
import { JWTPayload } from 'src/auth/jwt.strategy';
import { Request } from 'express';
import { CreateFreightRequestUseCase } from './use-cases/create-freight.usecase';
import { GetClientFreightRequestsUseCase } from './use-cases/get-client-freights.usecase';
import { GetTransporterFreightRequestsUseCase } from './use-cases/get-transporter-freights.usecase';
import { GetFreightRequestDetailUseCase } from './use-cases/get-freight-detail.usecase';
import { GetAvailableFreightsUseCase } from './use-cases/get-available-freights.usecase';
import { AcceptFreightUseCase } from './use-cases/accept-freight.usecase';
import { CancelFreightUseCase } from './use-cases/cancel-freight.usecase';
import { FinishFreightUseCase } from './use-cases/finish-freight.usecase';
import { StartFreightUseCase } from './use-cases/start-freight.usecase';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UserProfile } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('freight-requests')
export class FreightRequestsController {
  constructor(
    private createFreightRequestUseCase: CreateFreightRequestUseCase,
    private getClientFreightRequestsUseCase: GetClientFreightRequestsUseCase,
    private getTransporterFreightRequestsUseCase: GetTransporterFreightRequestsUseCase,
    private getFreightRequestDetailUseCase: GetFreightRequestDetailUseCase,
    private getAvailableFreightsUseCase: GetAvailableFreightsUseCase,
    private acceptFreightUseCase: AcceptFreightUseCase,
    private startFreightUseCase: StartFreightUseCase,
    private finishFreightUseCase: FinishFreightUseCase,
    private cancelFreightUseCase: CancelFreightUseCase,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createFreightRequestDto: CreateFreightRequestDto,
    @Req() req: Request,
  ) {
    const user = req.user as JWTPayload;
    createFreightRequestDto.clientId = user.userId;
    return this.createFreightRequestUseCase.execute(createFreightRequestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  findAll(@Req() req: Request) {
    const user = req.user as JWTPayload;
    return this.getClientFreightRequestsUseCase.execute(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('transporter/my')
  findByTransporter(@Req() req: Request) {
    const user = req.user as JWTPayload;
    return this.getTransporterFreightRequestsUseCase.execute(user.userId);
  }

  /**
   * Endpoint to get available freights.
   * Only accessible by users with the DRIVER or ADMIN roles.
   */
  
  /*@UseGuards(JwtAuthGuard)
  @Roles(UserProfile.TRANSPORTER, UserProfile.ADMIN)
  @Get('available')
  getAvailableFreights() {
    console.log('Entrou');
    const getFreightsAvailables = this.getAvailableFreightsUseCase.execute();
    return getFreightsAvailables;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getFreightRequestDetailUseCase.execute(id);
  }

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
    const freights = await this.getAllFreightsUseCas.execute();
    return freights;
  }

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
  acceptFreight(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as JWTPayload;
    return this.acceptFreightUseCase.execute(id, user.userId);
  }

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
  startFreight(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as JWTPayload;

    const startedFreitgh = this.startFreightUseCase.execute(id, user.userId);
    return startedFreitgh;
  }

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
  finishFreight(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as JWTPayload;
    return this.finishFreightUseCase.execute(id, user.userId);
  }

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
  cancelFreight(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as JWTPayload;
    return this.cancelFreightUseCase.execute(id, user.userId, user.profile);
  }

  /*@Get()
  findAll() {
    return this.freightRequestsService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFreightRequestDto: UpdateFreightRequestDto,
  ) {
    return this.freightRequestsService.update(+id, updateFreightRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.freightRequestsService.remove(+id);
  }*/
//}
