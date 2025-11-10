import { People } from '@prisma/client';

export const PEOPLE_REPOSITORY = 'PEOPLE_REPOSITORY'
export abstract class PeopleRepositoryInterface {
    abstract create(data: Omit<People, 'id' | 'createdAt' | 'updatedAt'>): Promise<People>;
    abstract findByDocumentNumber(documentNumber: string): Promise<People | null>;
}
