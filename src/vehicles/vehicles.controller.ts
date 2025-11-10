import { GetVehicleDetailUseCase } from './use-cases/get-vehicle-detail.usecase';
import { Body, Controller, Post, Get, Req, UseGuards, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Request } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JWTPayload } from 'src/auth/jwt.strategy';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { CreateVehicleUseCase } from './use-cases/create-vehicle.usecase';
import { UserProfile } from '@prisma/client';
import { GetTransporterVehiclesUseCase } from './use-cases/get-transporter-vehicles.usecase';

@Controller('vehicles')
export class VehiclesController {
  constructor(
    private createVehicleUseCase: CreateVehicleUseCase,
    private getTransporterVehiclesUseCase: GetTransporterVehiclesUseCase,
    private getVehicleDetailUseCase: GetVehicleDetailUseCase,
  ) {}

  /**
   * Endpoint to create a new vehicle.
   * Only accessible by users with the DRIVER or ADMIN role.
   * @param body - The data transfer object containing vehicle details.
   * @param req - The request object containing user information.
   * @returns The created vehicle.
   */

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.TRANSPORTER, UserProfile.ADMIN)
  @Post()
  async createAuth(@Body() body: CreateVehicleDto, @Req() req: Request) {
    const user = req.user as JWTPayload;
    const vehicle = await this.createVehicleUseCase.execute(user.userId, body);
    // console.log(vehicle, 'vehicle created');

    return vehicle;
  }

  @Post('/register')
  async create(@Body() body: CreateVehicleDto) {
    const vehicle = await this.createVehicleUseCase.execute(body.userId, body);

    return vehicle;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.TRANSPORTER)
  @Get('/my')
  async getTransporterVehicles(@Req() req: Request) {
    const user = req.user as JWTPayload;
    const vehicle = await this.getTransporterVehiclesUseCase.execute(
      user.userId,
    );

    return vehicle;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.TRANSPORTER)
  @Get(':id')
  async getVehicleDetail(@Param('id') id: string) {
    const vehicle = await this.getVehicleDetailUseCase.execute(id);

    return vehicle;
  }
}
