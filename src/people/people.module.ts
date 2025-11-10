import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { PEOPLE_REPOSITORY } from "./repositories/people-repository.interface";
import { PeopleRepository } from "./repositories/people.repository";
import { CreatePeopleUseCase } from "./use-cases/create-people.usecase";
import { GetPersonByDocumentNumberUseCase } from "./use-cases/get-person-by-document-number.usecase";

@Module({
    providers: [
        CreatePeopleUseCase,
        GetPersonByDocumentNumberUseCase,
        PrismaService,
        {
            provide: PEOPLE_REPOSITORY,
            useClass: PeopleRepository,
        },
    ],
    exports: [PEOPLE_REPOSITORY, CreatePeopleUseCase, GetPersonByDocumentNumberUseCase],
})
export class PeopleModule { }
