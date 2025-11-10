import { ConflictException, Inject, Injectable } from '@nestjs/common';

import {
  CLIENTS_REPOSITORY,
  ClientsRepositoryInterface,
} from 'src/clients/repositories/clients.repository.interface';

@Injectable()
export class GetClientByNIFUseCase {
  constructor(
    @Inject(CLIENTS_REPOSITORY)
    private readonly clientRepository: ClientsRepositoryInterface,
  ) {}

  async execute(nif: string) {
    console.log('If', nif);
    if (nif) {
      const client = await this.clientRepository.findByNIF(nif);

      if (client) {
        throw new ConflictException('NIF Already Exists.');
      }

      return;
    }

    return;
  }
}
