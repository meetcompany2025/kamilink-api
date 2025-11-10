import { ConflictException, Inject, Injectable } from '@nestjs/common';

import {
  CLIENTS_REPOSITORY,
  ClientsRepositoryInterface,
} from 'src/clients/repositories/clients.repository.interface';

@Injectable()
export class GetClientByIdUseCase {
  constructor(
    @Inject(CLIENTS_REPOSITORY)
    private readonly clientRepository: ClientsRepositoryInterface,
  ) {}

  async execute(id: string) {
    const client = await this.clientRepository.findById(id);

    return client;
  }
}
