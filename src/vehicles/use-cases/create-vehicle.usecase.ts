// src/vehicles/use-cases/create-vehicle.usecase.ts

import { Inject, Injectable } from '@nestjs/common';
import { VEHICLES_REPOSITORY, VehiclesRepositoryInterface } from '../repositories/vehicles.repository.interface';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { ImagesRepository } from 'src/uploads/repositories/images.repository';
import { VehicleDocumentType } from '@prisma/client'; // ✅ Importa enum correto

@Injectable()
export class CreateVehicleUseCase {
  constructor(
    @Inject(VEHICLES_REPOSITORY)
    private vehiclesRepo: VehiclesRepositoryInterface,
    private imagesRepo: ImagesRepository, // injetamos repository de imagens para validação
  ) { }

  /**
   * Executa a criação de um veículo.
   * 1. Cria veículo com status inicial "PENDENTE"
   * 2. Verifica se todos os documentos obrigatórios já foram enviados
   * 3. Atualiza status para "Disponível" se todos os documentos estiverem presentes
   *
   * @param userId - ID do usuário que está criando o veículo
   * @param dto - dados do veículo
   * @returns veículo criado, com status atualizado se aplicável
   */
  async execute(userId: string, dto: CreateVehicleDto) {
    // 1️⃣ Cria veículo com status inicial "PENDENTE"
    const vehicle = await this.vehiclesRepo.create(userId, dto);

    // 2️⃣ Busca todos os documentos obrigatórios enviados para este veículo
    const images = await this.imagesRepo.findDocumentsByVehicle(vehicle.id);

    // 3️⃣ Lista de documentos obrigatórios usando enum correto
    const requiredDocs: VehicleDocumentType[] = [
      VehicleDocumentType.TITLE,
      VehicleDocumentType.INSURANCE,
      VehicleDocumentType.IPO,
      VehicleDocumentType.IVM,
    ];

    // 4️⃣ Mapeia os documentos que já foram enviados
    // img.documentType já é VehicleDocumentType | null, filtramos nulos
    const uploadedDocs: VehicleDocumentType[] = images
      .map(img => img.documentType)
      .filter((doc): doc is VehicleDocumentType => doc !== null); // ✅ garante tipo correto

    // 5️⃣ Verifica se todos os documentos obrigatórios estão presentes
    const allDocsPresent = requiredDocs.every(doc => uploadedDocs.includes(doc));

    // 6️⃣ Atualiza o status do veículo se todos os documentos foram enviados
    if (allDocsPresent) {
      await this.vehiclesRepo.updateStatus(vehicle.id, 'Disponível');
    }

    return vehicle;
  }
}
