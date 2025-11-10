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
import { SendEmailConfirmationUseCase } from './send-email-confirmation.usecase';

@Injectable()
export class ResendEmailConfirmationUseCase {
  constructor(
    private readonly sendEmailConfirmation: SendEmailConfirmationUseCase,
    @Inject(USERS_REPOSITORY)
    private readonly userRepo: UsersRepositoryInterface,
  ) {}

  async execute(email: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new NotFoundException('Usuário não encontrado.');

    if (user.isVerified)
      throw new BadRequestException('Usuário já verificado.');

    await this.sendEmailConfirmation.execute(user.id, user.email);
  }
}
