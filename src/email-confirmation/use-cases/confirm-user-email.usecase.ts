import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import {
  USERS_REPOSITORY,
  UsersRepositoryInterface,
} from 'src/users/repositories/users.repository.interface';
import {
  EMAIL_CONFIRMATION_REPOSITORY,
  EmailConfirmationTokenRepositoryInterface,
} from '../repositories/email-confirmation-token.repository.interface';

@Injectable()
export class ConfirmUserEmailUseCase {
  constructor(
    @Inject(EMAIL_CONFIRMATION_REPOSITORY)
    private readonly tokenRepo: EmailConfirmationTokenRepositoryInterface,

    @Inject(USERS_REPOSITORY)
    private readonly userRepo: UsersRepositoryInterface,
  ) {}

  async execute(token: string) {
    const tokenData = await this.tokenRepo.findByToken(token);
    if (!tokenData) throw new NotFoundException('Token inválido.');

    if (tokenData.usedAt)
      throw new BadRequestException('Token já foi utilizado.');
    if (tokenData.expiresAt < new Date())
      throw new BadRequestException('Token expirado.');

    await this.userRepo.updateVerificationStatus(tokenData.userId, true);
    await this.tokenRepo.markAsUsed(token);
  }
}
