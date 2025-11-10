import { FreightLastLocation } from '@prisma/client';
import { UpdateFreightLastLocationDto } from '../dto/update-last-location.dto';

export const FREIGHT_LAST_LOCATION_REPOSITORY = 'FREIGHT_LAST_LOCATION_REPOSITORY';
// This interface defines the contract for the FreightLastLocation repository.
// It specifies the methods that must be implemented by any class that wants to
// interact with the FreightLastLocation data in the database.
export abstract class FreightLastLocationRepositoryInterface {
    abstract upsertByFreightId(dto: UpdateFreightLastLocationDto): Promise<FreightLastLocation | null>;
}