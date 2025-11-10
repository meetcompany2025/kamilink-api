import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { PEOPLE_REPOSITORY, PeopleRepositoryInterface } from '../repositories/people-repository.interface';

@Injectable()
export class GetPersonByDocumentNumberUseCase {
  constructor(
        @Inject(PEOPLE_REPOSITORY)
        private readonly peopleRepository: PeopleRepositoryInterface,

    ) { }

  async execute(documentNumber: string) {

    const person = await this.peopleRepository.findByDocumentNumber(documentNumber);

    if (person) {
      throw new ConflictException('Document Number Already Exists.');
    }

    return person;
  }
}
