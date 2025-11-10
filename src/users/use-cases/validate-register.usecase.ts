// import { Injectable, ConflictException } from '@nestjs/common';
// import { GetPersonByDocumentNumberUseCase } from 'src/people/use-cases/get-person-by-document-number.usecase';
// import { GetClientByNIFUseCase } from 'src/clients/use-cases/get-client-by-nif.usecase';
// import { GetTransporterByDriverLicenceUseCase } from 'src/transporters/use-cases/get-transporter-by-driver-licence.usecase';
// import { GetTransporterByLicencePlateUseCase } from 'src/transporters/use-cases/get-transporter-by-licence-plate.usecase';
// import { UserProfile } from '@prisma/client'
// interface ValidateRegisterDTO {
//   nif?: string;
//   driverLicense?: string;
//   licensePlate?: string;
//   documentNumber: string
//   profile: UserProfile
// }

// @Injectable()
// export class ValidateRegisterUseCase {
//   constructor(
//     private readonly getPersonByDocumentNumberUseCase: GetPersonByDocumentNumberUseCase,
//     private readonly getClientByNIFUseCase: GetClientByNIFUseCase,
//     private readonly getTransporterByDriverLicenceUseCase: GetTransporterByDriverLicenceUseCase,
//     private readonly getTransporterByLicencePlateUseCase: GetTransporterByLicencePlateUseCase,
//   ) {}

//   async execute(dto: ValidateRegisterDTO) {

//     const person = await this.getPersonByDocumentNumberUseCase.execute(dto.documentNumber)

//     if(person) {
//         throw new ConflictException('Já existe um cliente com esse Número de Documento');
//       }

//     if (dto.profile === 'CLIENT') {
//       const client = await this.getClientByNIFUseCase.execute(dto.nif!);
//       if (client) {
//         throw new ConflictException('Já existe um cliente com esse NIF');
//       }
//     }

//     if (dto.profile === 'TRANSPORTER') {
//       const transporterByDL = await this.getTransporterByDriverLicenceUseCase.execute(dto.driverLicense!);
//       if (transporterByDL) {
//         throw new ConflictException('Já existe um transportador com essa carta de condução');
//       }

//       const transporterByPlate = await this.getTransporterByLicencePlateUseCase.execute(dto.licensePlate!);
//       if (transporterByPlate) {
//         throw new ConflictException('Já existe um transportador com essa matrícula');
//       }
//     }

//     // Para ADMIN, nenhuma validação específica neste momento
//   }
// }
