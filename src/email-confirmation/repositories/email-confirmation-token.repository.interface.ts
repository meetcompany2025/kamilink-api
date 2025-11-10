import { EmailConfirmationToken } from '@prisma/client';

export const EMAIL_CONFIRMATION_REPOSITORY = 'EMAIL_CONFIRMATION_REPOSITORY';

export interface EmailConfirmationTokenRepositoryInterface {
  create(
    userId: string,
    token: string,
    expiresAt: Date,
  ): Promise<EmailConfirmationToken>;
  findByToken(token: string): Promise<EmailConfirmationToken | null>;
  markAsUsed(token: string): Promise<void>;
  deleteByUserId(userId: string): Promise<void>; // útil para reenviar
}
