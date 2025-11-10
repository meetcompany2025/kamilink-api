import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { USERS_REPOSITORY } from 'src/users/repositories/users.repository.interface';
import { UsersRepository } from 'src/users/repositories/prisma-users.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CLIENTS_REPOSITORY } from 'src/clients/repositories/clients.repository.interface';
import { ClientsRepository } from 'src/clients/repositories/clients.repository';
import { MailService } from 'src/shared/providers/mail/mail.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'jhjahhkahsj892182..@£@£4hjsdhjwe', // Depois vem do .env
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
    MailService,
    {
      provide: USERS_REPOSITORY,
      useClass: UsersRepository,
    },
    {
      provide: CLIENTS_REPOSITORY,
      useClass: ClientsRepository,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
