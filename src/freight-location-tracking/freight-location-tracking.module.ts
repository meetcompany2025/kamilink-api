import { Module } from '@nestjs/common';
import { FreightLocationTrackingGateway } from './gateways/freight-location-tracking.gateway';
import { RegisterFreightLocationTrackingUseCase } from './use-cases/register-freight-location-tracking.usecase';
import { FreightLocationTrackingRepository } from './repositories/freight-location-tracking.repository';
import { FREIGHT_LOCALIZATION_TRACKING_REPOSITORY } from './repositories/freight-location-tracking.repository.interface';
import { PrismaService } from 'src/database/prisma.service';
import { GetLatestFreightLocationTrackingUseCase } from './use-cases/get-latest-freight-location-tracking.usecase';
import { FreightLocationTrackingController } from './freight-location-tracking.controller';
import { FreightStatusHistoryModule } from 'src/freight-status-history/freight-status-history.module';
import { FreightLocationTrackingUseCase } from './use-cases/freight-location-tracking.usecase.';
import { UpdateLastLocationUseCase } from 'src/freight-last-location/use-cases/update-last-location.usecase';
import { FreightLastLocationRepository } from 'src/freight-last-location/repositories/freight-last-location.repository';
import { FREIGHT_LAST_LOCATION_REPOSITORY } from 'src/freight-last-location/repositories/freight-last-location.repository.interface';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports: [FreightStatusHistoryModule, JwtModule.register({ secret: process.env.JWT_SECRET })], // <== isso aqui resolve seu problema
    controllers: [FreightLocationTrackingController],
    providers: [
        FreightLocationTrackingGateway,
        RegisterFreightLocationTrackingUseCase,
        GetLatestFreightLocationTrackingUseCase,
        FreightLocationTrackingUseCase,
        UpdateLastLocationUseCase,
        JwtService,
        PrismaService,
        {
            provide: FREIGHT_LOCALIZATION_TRACKING_REPOSITORY,
            useClass: FreightLocationTrackingRepository,
        },
        {
            provide: FREIGHT_LAST_LOCATION_REPOSITORY,
            useClass: FreightLastLocationRepository,
        },
    ],
})
export class FreightLocationTrackingModule { }
