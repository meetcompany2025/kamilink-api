import { CreateFreightLocationTrackingDto } from '../dto/create-freight-location-tracking.dto';
import { Injectable } from '@nestjs/common';
import { FreightLocationTrackingRepositoryInterface } from './freight-location-tracking.repository.interface';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class FreightLocationTrackingRepository implements FreightLocationTrackingRepositoryInterface {
    constructor(
        private prisma: PrismaService
    ) { }
    async create(data: CreateFreightLocationTrackingDto) {
        await this.prisma.freightLocationTracking.create({ data });
    }

    // Busca o último registro de rastreamento do frete
    // Ordena por data de criação em ordem decrescente e seleciona o primeiro
    async findLatestByFreightId(freightId: string) {
        const freightLastedLocalization = await this.prisma.freightLocationTracking.findFirst({
            where: { freightId },
            orderBy: { createdAt: 'desc' },
            select: {
                latitude: true,
                longitude: true,
                speed: true,
                direction: true,
                updatedAt: true,
            },
        });

        if (!freightLastedLocalization) {
            return null;
        }

        const { latitude, longitude, speed, direction, updatedAt } = freightLastedLocalization;

        return {
            latitude,
            longitude,
            updatedAt,
            ...(speed !== null ? { speed } : {}),
            ...(direction !== null ? { direction } : {}),
        };
    }

    async isUserRelatedToFreight(userId: string, role: string, freightId: string) {
        const freight = await this.prisma.freight.findUnique({
            where: { id: freightId },
            select: {
                clientId: true,
                transporterId: true,
            },
        });

        if (!freight) return false;

        if (role === 'CLIENT') return freight.clientId === userId;
        if (role === 'TRANSPORTER') return freight.transporterId === userId;

        return false;
    }


}
