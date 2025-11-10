import { SetMetadata } from '@nestjs/common';

/**
 * Decorator para definir os perfis permitidos em uma rota.
 * Exemplo: @Roles('ADMIN', 'DRIVER')
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
