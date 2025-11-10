import { Inject, Injectable } from '@nestjs/common';

import {
  CLIENTS_REPOSITORY,
  ClientsRepositoryInterface,
} from 'src/clients/repositories/clients.repository.interface';
import { CreateClientDto } from '../dto/create-client.dto';

@Injectable()
export class CreateClientUseCase {
  constructor(
    @Inject(CLIENTS_REPOSITORY)
    private readonly clientRepository: ClientsRepositoryInterface,
  ) {}

  async execute(userId: string, dto: CreateClientDto) {
    const client = await this.clientRepository.create({
      user: {
        connect: { id: userId },
      },
      accountType: dto.accountType!,
      companyName: dto.companyName ?? null,
      nif: dto.nif ?? null,
    });

    return client;
  }
}
