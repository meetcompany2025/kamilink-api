import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { UserProfile } from '@prisma/client';

export interface JWTPayload {
  email: string;
  userId: string;
  profile: UserProfile;
}


const JWTScret =
  process.env.JWT_SECRET?.toString() || 'jhjahhkahsj892182..@£@£4hjsdhjwe';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWTScret,
    });
  }

  async validate(payload: any) {
    // Aqui pode buscar o usuário do banco se quiser mais segurança
    return {
      userId: payload.sub,
      email: payload.email,
      profile: payload.profile,
    };
  }
}
