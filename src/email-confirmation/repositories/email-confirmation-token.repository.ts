import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { EmailConfirmationTokenRepositoryInterface } from './email-confirmation-token.repository.interface';
import { EmailConfirmationToken } from '@prisma/client';

@Injectable()
export class EmailConfirmationTokenRepository
  implements EmailConfirmationTokenRepositoryInterface
{
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    token: string,
    expiresAt: Date,
  ): Promise<EmailConfirmationToken> {
    return this.prisma.emailConfirmationToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  }

  async findByToken(token: string): Promise<EmailConfirmationToken | null> {
    return this.prisma.emailConfirmationToken.findUnique({ where: { token } });
  }

  async markAsUsed(token: string): Promise<void> {
    await this.prisma.emailConfirmationToken.update({
      where: { token },
      data: { usedAt: new Date() },
    });
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.prisma.emailConfirmationToken.deleteMany({ where: { userId } });
  }
}
