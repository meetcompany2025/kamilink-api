/*import { FreightRequest, FreightStatus } from '@prisma/client';
import { CreateFreightRequestDto } from '../dto/create-freight_request.dto';

export const FREIGHT_REQUEST_REPOSITORY = 'FREIGHT_REQUEST_REPOSITORY';

export abstract class FreightRequestRepositoryInterface {
  abstract create(data: CreateFreightRequestDto): Promise<FreightRequest>;
  abstract findAll(): Promise<FreightRequest[]>;
  abstract findById(id: string): Promise<FreightRequest | null>;
  abstract findAvailableFreights(): Promise<FreightRequest[]>;
  abstract findByClient(clientId: string): Promise<FreightRequest[]>;
  abstract findByTransporter(transporterId: string): Promise<FreightRequest[]>; 
  abstract updateStatusAndAssignDriver(
    freightId: string,
    driverId: string,
  ): Promise<FreightRequest>;
  abstract updateStatus(
    freightId: string,
    status: FreightStatus,
  ): Promise<FreightRequest>;
  
  //abstract findByDriver(driverId: string): Promise<Freight[]>;
}*/
