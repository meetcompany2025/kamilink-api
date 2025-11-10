import { JWTPayload } from 'src/auth/jwt.strategy'; // ou onde está seu tipo

declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload;
        }
    }
}
