import { ConflictException, Inject, Injectable } from '@nestjs/common';

import {
  CLIENTS_REPOSITORY,
  ClientsRepositoryInterface,
} from 'src/clients/repositories/clients.repository.interface';


@Injectable()
export class GetAllClientsUseCase {
  constructor(
    @Inject(CLIENTS_REPOSITORY)
    private readonly clientRepository: ClientsRepositoryInterface,
  ) {}

  async execute() {
    const clients = await this.clientRepository.findAll();

    return clients;
  }
}
