// @Injectable()
// export class ValidateUserRegistrationUseCase {
//   constructor(
//     private readonly userRepository: UsersRepositoryInterface,
//     private readonly getPersonByDocumentNumberUseCase: GetPersonByDocumentNumberUseCase,
//     private readonly getClientByNIFUseCase: GetClientByNIFUseCase,
//     private readonly getTransporterByDriverLicenceUseCase: GetTransporterByDriverLicenceUseCase,
//     private readonly getTransporterByLicencePlateUseCase: GetTransporterByLicencePlateUseCase,
//   ) {}

//   async execute(dto: CreateUserDto): Promise<void> {
//     const existsEmail = await this.userRepository.findByEmail(dto.email);
//     if (existsEmail) throw new ConflictException('Email Already Exists.');

//     await this.getPersonByDocumentNumberUseCase.execute(dto.documentNumber);

//     if (dto.profile === UserProfile.CLIENT) {
//       await this.getClientByNIFUseCase.execute(dto.nif);
//     }
//     if (dto.profile === UserProfile.TRANSPORTER) {
//       await this.getTransporterByDriverLicenceUseCase.execute(dto.driverLicense);
//       await this.getTransporterByLicencePlateUseCase.execute(dto.licensePlate);
//     }
//     if (dto.profile === UserProfile.TRANSPORTER) {
//       await this.getTransporterByDriverLicenceUseCase.execute(dto.driverLicense);
//       await this.getTransporterByLicencePlateUseCase.execute(dto.licensePlate);
//     }
//   }
// }
// // import { UsersRepositoryInterface, USERS_REPOSITORY } from '../repositories/users-repository.interface';
// import { ConflictException, Inject, Injectable } from '@nestjs/common';