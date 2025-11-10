import { Injectable } from '@nestjs/common';

import { People } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { PeopleRepositoryInterface } from './people-repository.interface';

@Injectable()
export class PeopleRepository implements PeopleRepositoryInterface {
    constructor(private readonly prisma: PrismaService) { }

    async findByDocumentNumber(documentNumber: string ) {
        const person = await this.prisma.people.findUnique({
            where: {documentNumber}
        })

        return person
    }

    async create(data: Omit<People, 'id' | 'createdAt' | 'updatedAt'>) {
        return await this.prisma.people.create({ data });
    }
}
