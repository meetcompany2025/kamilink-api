import { Inject, Injectable } from '@nestjs/common';

import { TransporterRepositoryInterface, TRANSPORTERS_REPOSITORY } from 'src/transporters/repositories/transporter-repository.interface';
import { CreateTransporterDto } from '../dto/create-transporter.dto';

@Injectable()
export class CreateTransporterUseCase {
    constructor(
        @Inject(TRANSPORTERS_REPOSITORY)
        private readonly transporterRepository: TransporterRepositoryInterface,
    ) { }

    async execute(userId: string, dto: CreateTransporterDto) {

        
        const transporter = await this.transporterRepository.create({
            user: {
                connect: { id: userId },
            },
            experienceYears: dto.experienceYears ?? null,
            licensePlate: dto.licensePlate!,
            driverLicense: dto.driverLicense!,
        });

        return transporter;
    }
}
