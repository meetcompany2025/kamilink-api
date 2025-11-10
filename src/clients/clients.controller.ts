import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateClientUseCase } from './use-cases/create-client.usecase';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { GetAllClientsUseCase } from './use-cases/get-all-clients.usecase';
import { GetClientByNIFUseCase } from './use-cases/get-client-by-nif.usecase';
import { GetClientByIdUseCase } from './use-cases/get-client-by-id.usecase';

@Controller('clients')
export class ClientsController {
  constructor(
    private getAllClientsUseCase: GetAllClientsUseCase,
    private getClientByNIFUseCase: GetClientByNIFUseCase,
    private getClientByIdUseCase: GetClientByIdUseCase,
  ) {}

  @Get()
  findAll() {
    return this.getAllClientsUseCase.execute();
  }

  @Get('nif/:id')
  findByNif(@Param('id') id: string) {
    return this.getClientByNIFUseCase.execute(id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.getClientByIdUseCase.execute(id);
  }
}
