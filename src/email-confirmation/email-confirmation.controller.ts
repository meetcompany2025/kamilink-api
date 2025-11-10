import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { ResendConfirmationDto } from './dto/resend-confirmation.dto';
import { ConfirmUserEmailUseCase } from './use-cases/confirm-user-email.usecase';
import { ResendEmailConfirmationUseCase } from './use-cases/resend-email-confirmation.usecase';

@Controller('email-confirmation')
export class EmailConfirmationController {
  constructor(
    private readonly confirmUseCase: ConfirmUserEmailUseCase,
    private readonly resendUseCase: ResendEmailConfirmationUseCase,
  ) {}

  @Get('confirm')
  async confirmViaLink(@Query('token') token: string, @Res() res: Response) {
    await this.confirmUseCase.execute(token);

    // Redireciona para uma página (ex: login ou sucesso)
    return res.redirect('http://localhost:3000/auth/confirm-email');
  }

  @Post('confirm')
  async confirm(@Body() dto: ConfirmEmailDto) {
    await this.confirmUseCase.execute(dto.token);
    return { message: 'Conta verificada com sucesso.' };
  }

  @Post('resend')
  async resend(@Body() dto: ResendConfirmationDto) {
    await this.resendUseCase.execute(dto.email);
    return { message: 'E-mail de confirmação reenviado.' };
  }
}
