export type JwtPayload = {
  sub: string; // ID do usuário
  profile: string; // ou outro campo que você adicionou no token
};