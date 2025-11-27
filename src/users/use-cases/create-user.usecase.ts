// com use-cases separados
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

import { UserProfile } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {
  USERS_REPOSITORY,
  UsersRepositoryInterface,
} from '../repositories/users.repository.interface';
import { CreatePeopleUseCase } from 'src/people/use-cases/create-people.usecase';
import { CreateClientUseCase } from 'src/clients/use-cases/create-client.usecase';
import { CreateTransporterUseCase } from 'src/transporters/use-cases/create-transporter.usecase';
import { GetPersonByDocumentNumberUseCase } from 'src/people/use-cases/get-person-by-document-number.usecase';
import { GetTransporterByDriverLicenseUseCase } from 'src/transporters/use-cases/get-transporter-by-driver-license.usecase';
// import { GetTransporterByLicensePlateUseCase } from 'src/transporters/use-cases/get-transporter-by-license-plate.usecase';
import { GetClientByNIFUseCase } from 'src/clients/use-cases/get-client-by-nif.usecase';
import { SendEmailConfirmationUseCase } from 'src/email-confirmation/use-cases/send-email-confirmation.usecase';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly userRepository: UsersRepositoryInterface,

    private readonly getPersonByDocumentNumberUseCase: GetPersonByDocumentNumberUseCase,
    private readonly createPeopleUseCase: CreatePeopleUseCase,

    private readonly createClientUseCase: CreateClientUseCase,
    private readonly getClientByNIFUseCase: GetClientByNIFUseCase,

    private readonly getTransporterByDriverLicenseUseCase: GetTransporterByDriverLicenseUseCase,
    // private readonly getTransporterByLicensePlateUseCase: GetTransporterByLicensePlateUseCase,
    private readonly createTransporterUseCase: CreateTransporterUseCase,

    private readonly sendEmailConfirmationUseCase: SendEmailConfirmationUseCase,
  ) { }

  async execute(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    let person;
    let client;
    let transporter;

    const existsEmail = await this.userRepository.findByEmail(dto.email);

    if (existsEmail) {
      throw new ConflictException('Email Already Exists.');
    }

    await this.getPersonByDocumentNumberUseCase.execute(dto.documentNumber);
    if (dto.profile === UserProfile.CLIENT) {
      await this.getClientByNIFUseCase.execute(dto.nif!);
    }

    // if (dto.profile === UserProfile.TRANSPORTER) {
    //   await this.getTransporterByDriverLicenseUseCase.execute(
    //     dto.driverLicense!,
    //   );
    //   await this.getTransporterByLicensePlateUseCase.execute(dto.licensePlate!);
    // }

    // create user
    const user = await this.userRepository.create({
      email: dto.email,
      password: hashedPassword,
      profile: dto.profile,
      isVerified: true,
    });

    // const userId = user.id;

    // create people
    person = await this.createPeopleUseCase.execute(user.id, dto);

    // create client
    if (dto.profile === UserProfile.CLIENT) {
      client = await this.createClientUseCase.execute(user.id, dto);
    }

    // create transporter
    if (dto.profile === UserProfile.TRANSPORTER) {
      transporter = await this.createTransporterUseCase.execute(user.id, dto);
    }

    // Enviar email de confirmação
    let emailConfirmationSent = true;

    try {
      await this.sendEmailConfirmationUseCase.execute(user.id, user.email);
    } catch (err) {
      console.log(
        'Serviço de Email Indisponível no momento, tente validar a sua conta mais tarde.',
      );
      emailConfirmationSent = false;
    }

    return { person, user, client, transporter, emailConfirmationSent };
  }
}

// import { ConflictException, Inject, Injectable } from '@nestjs/common';
// import { CreateUserDto } from '../dto/create-user.dto';

// import { UserProfile } from '@prisma/client';
// import * as bcrypt from 'bcrypt';
// import { USERS_REPOSITORY, UsersRepositoryInterface } from '../repositories/users.repository.interface';
// import { PeopleRepositoryInterface } from 'src/people/repositories/people-repository.interface';
// import { TransporterRepositoryInterface } from 'src/transporters/repositories/transporter-repository.interface';
// import { ClientsRepositoryInterface } from 'src/clients/repositories/clients.repository.interface';

// @Injectable()
// export class CreateUserUseCase {
//   constructor(
//     @Inject(USERS_REPOSITORY)
//     private readonly userRepository: UsersRepositoryInterface,

//     @Inject('PEOPLE_REPOSITORY')
//     private readonly peopleRepository: PeopleRepositoryInterface,

//     @Inject('CLIENTS_REPOSITORY')
//     private readonly clientRepository: ClientsRepositoryInterface,

//     @Inject('TRANSPORTERS_REPOSITORY')
//     private readonly transporterRepository: TransporterRepositoryInterface,
//   ) { }

//   async execute(dto: CreateUserDto) {
//     const hashedPassword = await bcrypt.hash(dto.password, 10);

//     const exists = await this.userRepository.findByEmail(dto.email);

//       if (exists) {
//       throw new ConflictException('User Already Exists.');
//     }

//     const user = await this.userRepository.create({
//       email: dto.email,
//       password: hashedPassword,
//       profile: dto.profile,
//     });

//     await this.peopleRepository.create({
//       fullName: dto.fullName,
//       documentNumber: dto.documentNumber,
//       phone: dto.phone,
//       provincia: dto.provincia,
//       userId: user.id,
//     });

//     if (dto.profile === UserProfile.CLIENT) {
//       await this.clientRepository.create({
//         user: {
//           connect: { id: user.id },
//         },
//         accountType: dto.accountType!,
//         companyName: dto.companyName ?? null,
//         nif: dto.nif ?? null,
//       });
//     }

//     if (dto.profile === UserProfile.TRANSPORTER) {
//       await this.transporterRepository.create({
//         user: {
//           connect: { id: user.id },
//         },
//         vehicleTypes: dto.vehicleTypes!,
//         experienceYears: dto.experienceYears ?? null,
//         licensePlate: dto.licensePlate!,
//         driverLicense: dto.driverLicense!,
//       });
//     }

//     return user;
//   }
// }
