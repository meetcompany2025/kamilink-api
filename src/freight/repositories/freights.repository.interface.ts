import { Freight, FreightStatus, User } from '@prisma/client';
import { CreateFreightDto } from '../dto/create-freight_offer.dto';
import { UpdateFreightDto } from '../dto/update-freight_offer.dto';

export const FREIGHTS_REPOSITORY = 'FREIGHTS_REPOSITORY';

export abstract class FreightsRepositoryInterface {
  abstract create(data: CreateFreightDto, clientId: string): Promise<Freight>;
  abstract findAll(): Promise<Freight[]>;
  abstract findById(id: string): Promise<Freight | null>;
  abstract findAvailableFreights(): Promise<Freight[]>;
  abstract update(clientId: string, data: UpdateFreightDto): Promise<Freight>; 
  abstract updateStatusAndAssignDriver(
    freightId: string,
    driverId: string,
  ): Promise<Freight>;
  abstract updateStatus(
    freightId: string,
    status: FreightStatus,
    reason?: string
  ): Promise<Freight>;

  abstract cancelExpiredFreights(currentDate: Date): Promise<number>;

  abstract findByClient(clientId: string): Promise<Freight[]>;
  abstract findByDriver(driverId: string): Promise<Freight[]>;
  abstract countByClientId(clientId: string): Promise<number>;
  abstract findActiveByClientId(clientId: string);
  abstract findCompletedByClientId(clientId: string);
  abstract findPendingByClientId(clientId: string);
  abstract findHistoryByClientId(clientId: string);

  abstract findActiveByTransporterId(transporterId: string);
  abstract findUpcomingByTransporterId(transporterId: string);
  abstract findCompletedByTransporterId(transporterId: string);
  abstract findRecentByTransporterId(transporterId: string);
}