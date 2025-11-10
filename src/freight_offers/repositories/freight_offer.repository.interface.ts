/*import { FreightOffer, FreightStatus, User } from '@prisma/client';
import { CreateFreightOfferDto } from '../dto/create-freight_offer.dto';

export const FREIGHT_OFFER_REPOSITORY = 'FREIGHT_OFFER_REPOSITORY';

export abstract class FreightOfferRepositoryInterface {
  abstract create(data: CreateFreightOfferDto): Promise<FreightOffer>;
  abstract findAll(): Promise<FreightOffer[]>;
  abstract findById(id: string): Promise<FreightOffer | null>;
  abstract findAvailableFreights(): Promise<FreightOffer[]>;
  /*abstract updateStatusAndAssignDriver(
    freightId: string,
    driverId: string,
  ): Promise<Freight>;
  abstract updateStatus(
    freightId: string,
    status: FreightStatus,
  ): Promise<Freight>;
  abstract findByClient(clientId: string): Promise<Freight[]>;
  abstract findByDriver(driverId: string): Promise<Freight[]>;*/
//}
