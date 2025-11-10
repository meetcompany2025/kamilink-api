import { Module } from '@nestjs/common';
import { EmailConfirmationController } from './email-confirmation.controller';
import { ConfirmUserEmailUseCase } from './use-cases/confirm-user-email.usecase';
import { ResendEmailConfirmationUseCase } from './use-cases/resend-email-confirmation.usecase';
import { SendEmailConfirmationUseCase } from './use-cases/send-email-confirmation.usecase';
import { EmailConfirmationTokenRepository } from './repositories/email-confirmation-token.repository';
import { EMAIL_CONFIRMATION_REPOSITORY } from './repositories/email-confirmation-token.repository.interface';
import { USERS_REPOSITORY } from 'src/users/repositories/users.repository.interface';
import { UsersRepository } from 'src/users/repositories/prisma-users.repository';
import { PrismaService } from 'src/database/prisma.service';
import { MailModule } from 'src/shared/providers/mail/mail.module';

@Module({
  imports: [MailModule],
  controllers: [EmailConfirmationController],
  providers: [
    PrismaService,
    ConfirmUserEmailUseCase,
    ResendEmailConfirmationUseCase,
    SendEmailConfirmationUseCase,
    {
      provide: EMAIL_CONFIRMATION_REPOSITORY,
      useClass: EmailConfirmationTokenRepository,
    },
    {
      provide: USERS_REPOSITORY,
      useClass: UsersRepository,
    },
  ],
  exports: [SendEmailConfirmationUseCase],
})
export class EmailConfirmationModule {}
