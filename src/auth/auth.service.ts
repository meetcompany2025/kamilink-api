// src/auth/auth.service.ts
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  USERS_REPOSITORY,
  UsersRepositoryInterface,
} from 'src/users/repositories/users.repository.interface';
import { AuthDTO } from './dto/auth.dto';
import { JwtPayload } from './types/jwt-payload';
import { People, UserProfile } from '@prisma/client';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/database/prisma.service';
import { MailService } from 'src/shared/providers/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private mailService: MailService,
    @Inject(USERS_REPOSITORY)
    private usersRepository: UsersRepositoryInterface,
  ) {}
  /**
   * Método para autenticar o usuário e gerar um token JWT.
   * @param email - Email do usuário.
   * @param password - Senha do usuário.
   * @returns Um objeto contendo o token de acesso.
   */
  async login({ email, password, phone, rememberMe }: AuthDTO) {
    console.log(email, password, phone);

    if (!email && !phone) throw new UnauthorizedException('Usuário Inválido.');

    let user;

    if (email) {
      user = await this.usersRepository.findByEmail(email);
      if (!user) throw new UnauthorizedException('Usuário Inválido.');
    }

    if (phone) {
      user = await this.usersRepository.findByPhone(phone);
      if (!user) throw new UnauthorizedException('Usuário Inválido.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Usuário Inválido.');

    if (!user.isVerified) {
      throw new UnauthorizedException(
        'Confirme seu e-mail antes de acessar a conta.',
      );
    }

    const payload = { sub: user.id, profile: user.profile };

    // Define a expiração com base no rememberMe
    const expiresIn = rememberMe ? '30d' : '1d';
    const maxAge = rememberMe
      ? 30 * 24 * 60 * 60 * 1000 // 30 dias
      : 24 * 60 * 60 * 1000; // 1 dia

    return {
      token: this.jwtService.sign(payload, { expiresIn }),
      maxAge,
    };
  }

  async getProfile(id: string): Promise<{
    id: string;
    email: string;
    profile: UserProfile;
    createdAt: Date;
  }> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }

    // Retorna apenas os dados que quiser expor
    return {
      id: user.id,
      email: user.email,
      profile: user.profile,
      createdAt: user.createdAt,
    };
  }

  async forgotPassword(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const resetToken = nanoid(64);
      await this.prisma.tokenReset.create({
        data: {
          token: resetToken,
          userId: user.id,
          expiryDate,
        },
      });

      const resetLink = `http://localhost:3000/auth/change-password?token=${resetToken}`;

      const subject = 'Pedido de reposição da password';
      const html = `<p>Pedido de reposição da password. Clique o link abaixo para repor a sua password: </p><a href="${resetLink}">${resetLink}</a>`;

      await this.mailService.sendMail(email, subject, html);
    }

    return {
      nessagem: 'Se este usuário existe, ele receberá um email de recuperação',
    };
  }

  async resetPassword(newPassword: string, resetToken: string) {
    // 1️⃣ Verifica se o token existe e ainda é válido
    const token = await this.prisma.tokenReset.findFirst({
      where: {
        token: resetToken,
        expiryDate: {
          gte: new Date(),
        },
      },
    });

    if (!token?.userId) {
      throw new UnauthorizedException(
        'Token inválido: utilizador não encontrado',
      );
    }

    const user = await this.usersRepository.findById(token.userId);
    if (!user) {
      throw new InternalServerErrorException('Utilizador não encontrado');
    }

    // 3️⃣ Gera o novo hash da senha
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // 4️⃣ Atualiza a senha do utilizador
    await this.usersRepository.update(user.id, { password: newHashedPassword });

    // 5️⃣ Remove o token de reset para evitar reutilização
    await this.prisma.tokenReset.delete({
      where: { id: token.id },
    });

    return { message: 'Senha redefinida com sucesso' };
  }
  /**
   * Método para validar o usuário com base no token JWT.
   * @param token - Token JWT do usuário.
   * @returns O usuário validado.
   */
  //   @Injectable()
  // export class JwtStrategy extends PassportStrategy(Strategy) {
  //   constructor(config: ConfigService) {
  //     super({
  //       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //       secretOrKey: config.get('JWT_SECRET') || 'chave_secreta',
  //     });
  //   }

  //   async validate(payload: any) {
  //     return { id: payload.sub, profile: payload.profile };
  //   }
  // }
}
