import { Inject, Injectable } from '@nestjs/common';

import { PEOPLE_REPOSITORY, PeopleRepositoryInterface } from 'src/people/repositories/people-repository.interface';
import { CreatePeopleDto } from '../dto/create-people.dto';

@Injectable()
export class CreatePeopleUseCase {
    constructor(
        @Inject(PEOPLE_REPOSITORY)
        private readonly peopleRepository: PeopleRepositoryInterface,

    ) { }

    async execute(userId: string, dto: CreatePeopleDto) {


        const person = await this.peopleRepository.create({
            fullName: dto.fullName,
            documentNumber: dto.documentNumber,
            phone: dto.phone,
            provincia: dto.provincia,
            userId: userId,
        });

        return person;
    }
}
