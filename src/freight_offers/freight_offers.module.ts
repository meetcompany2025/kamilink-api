/*import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { FreightOfferController } from './freight_offers.controller';
import { CreateFreightUseCase } from './use-cases/create-freight.usecase';
import { FreightOfferRepository } from './repositories/freights_offer.repository';
import { GetAvailableFreightsUseCase } from './use-cases/get-available-freights.usecase';
import { AcceptFreightUseCase } from './use-cases/accept-freight.usecase';
import { GetAllFreightsUseCase } from './use-cases/get-all-freights.usecase';

import { ListAllFreightsUseCase } from './use-cases/list-all-freights.usecase';
import { FREIGHT_OFFER_REPOSITORY } from './repositories/freight_offer.repository.interface';

@Module({
  controllers: [FreightOfferController],
  providers: [
    CreateFreightUseCase,
    FreightOfferRepository,   
    GetAllFreightsUseCase,
    GetAvailableFreightsUseCase,
    AcceptFreightUseCase,
    ListAllFreightsUseCase,
    PrismaService,
    {
      provide: FREIGHT_OFFER_REPOSITORY,
      useClass: FreightOfferRepository,
    },
    // The PrismaService is injected to handle database operations
  ],
})
export class FreightOfferModule { }
*/