import { Client, Prisma } from '@prisma/client';

export const CLIENTS_REPOSITORY = 'CLIENTS_REPOSITORY';

export abstract class ClientsRepositoryInterface {
  abstract create(data: Prisma.ClientCreateInput): Promise<Client>;
  abstract findByNIF(nif: string): Promise<Client | null>;
  abstract findByUserId(id: string): Promise<Client | null>;
  abstract findAll(): Promise<any | null>;
  abstract findById(id: string): Promise<any | null>;
}

// import { Client } from '@prisma/client';

// export abstract class ClientRepository {
//   abstract create(data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client>;
// }
