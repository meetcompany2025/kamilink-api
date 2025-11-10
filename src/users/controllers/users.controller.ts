import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserUseCase } from '../use-cases/create-user.usecase';
import { GetUsersUseCase } from '../use-cases/get-users.usecase';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id-usecase';
import { UserProfile } from '@prisma/client';
import { JWTPayload } from 'src/auth/jwt.strategy';
import { Request } from 'express';
import { GetUserDashboardCase } from '../use-cases/get-user-dashboard.usecase';
@Controller('users')
export class UsersController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getusersUseCase: GetUsersUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private getUserDashboardUseCase: GetUserDashboardCase,
  ) {}

  // register user
  @Post()
  async create(@Body() body: CreateUserDto) {
    try {
      const user = await this.createUserUseCase.execute(body);
      return user;
    } catch (error) {
      // Erro esperado do tipo HttpException
      if (error instanceof HttpException) {
        throw error;
      }

      // Erro genérico
      throw new HttpException(
        'Erro interno no servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // get all users
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.CLIENT, UserProfile.ADMIN, UserProfile.TRANSPORTER)
  @Get()
  async getUsers() {
    const users = await this.getusersUseCase.execute();
    return users;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.CLIENT, UserProfile.ADMIN, UserProfile.TRANSPORTER)
  @Get('dashboard')
  async getUserDashboard(@Req() req: Request) {
    const user = req.user as JWTPayload;
    console.log('Apresentar o user: ', user);
    const dashboard = await this.getUserDashboardUseCase.execute(
      user.userId,
      user.profile,
    );

    console.log('Apresentar o dashboard: ', dashboard);

    return dashboard;
  }

  // get user by id
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.CLIENT, UserProfile.ADMIN, UserProfile.TRANSPORTER)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.getUserByIdUseCase.execute(id);
    return user;
  }

}
