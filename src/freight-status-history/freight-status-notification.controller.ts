// src/modules/freight-status-history/controller/freight-status-notification.controller.ts

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { RegisterFreightStatusChangeUseCase } from './use-cases/register-freight-status-change.use-case';
import { RegisterFreightStatusChangeDto } from './dto/register-freight-status-change.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserProfile } from '@prisma/client';

@Controller('freight-status-history')
export class FreightStatusNotificationController {
    constructor(
        private readonly registerStatusChangeUseCase: RegisterFreightStatusChangeUseCase,
    ) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserProfile.TRANSPORTER)
    @Post()
    async register(@Body() body: RegisterFreightStatusChangeDto) {
        await this.registerStatusChangeUseCase.execute(body);
        return { message: 'Status registrado com sucesso.' };
    }
}
