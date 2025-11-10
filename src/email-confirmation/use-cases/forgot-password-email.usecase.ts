import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { EmailConfirmationTokenRepositoryInterface } from '../repositories/email-confirmation-token.repository.interface';
import { UsersRepositoryInterface } from 'src/users/repositories/users.repository.interface';
import { EMAIL_CONFIRMATION_REPOSITORY } from '../repositories/email-confirmation-token.repository.interface';
import { USERS_REPOSITORY } from 'src/users/repositories/users.repository.interface';
import { MailService } from 'src/shared/providers/mail/mail.service';
// EmailService pode ser implementado depois, com SMTP ou mockado por enquanto

@Injectable()
export class SendEmailConfirmationUseCase {
  constructor(
    @Inject(EMAIL_CONFIRMATION_REPOSITORY)
    private readonly tokenRepo: EmailConfirmationTokenRepositoryInterface,

    @Inject(USERS_REPOSITORY)
    private readonly userRepo: UsersRepositoryInterface,

    private readonly mailService: MailService, // Use ResendService ou MailService conforme sua implementação
  ) {}

  async execute(userId: string, email: string) {
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 1); // 1h

    await this.tokenRepo.deleteByUserId(userId); // remove tokens antigos
    await this.tokenRepo.create(userId, token, expiresAt);

    // Aqui você pode usar um EmailService real ou mock
    const confirmLink = `http://localhost:3000/email-confirmation/confirm?token=${token}`;
    await this.mailService.sendMail(
      email,
      'Confirmação de Conta - KimaLink',
      `<p>Olá,</p><p>Por favor, confirme seu e-mail clicando no link abaixo:</p><a href="${confirmLink}">${confirmLink}</a>`,
    );
    // console.log(`Enviar e-mail para ${email} com link: ${confirmLink}`);
  }
}
