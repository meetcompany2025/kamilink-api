// Alternativa: usando Prisma diretamente
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UpdateTransporterStatusUseCase {
    constructor(private prisma: PrismaService) { }

    async execute(transporterId: string, isActive: boolean) {
        // Atualiza o User através do Transporter usando relação
        return this.prisma.transporter.update({
            where: { id: transporterId },
            data: {
                user: {
                    update: {
                        isActive: isActive
                    }
                }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        isActive: true,
                        isVerified: true
                    }
                }
            }
        });
    }
}