import { Prisma, Transporter } from '@prisma/client';
import { UpdateTransporterDto } from '../dto/update-transporter.dto';

export const TRANSPORTERS_REPOSITORY = 'TRANSPORTERS_REPOSITORY';

export abstract class TransporterRepositoryInterface {
  abstract create(data: Prisma.TransporterCreateInput): Promise<Transporter>;
  abstract findByDriverLicence(
    driverLicense: string,
  ): Promise<Transporter | null>;
  // abstract findByLicensePlate(
  //   licensePlate: string,
  // ): Promise<Transporter | null>;
  abstract findById(id: string): Promise<any | null>;
  abstract findAll(): Promise<any | null>;
  abstract update(
    id: string,
    data: Prisma.TransporterUpdateInput,
  ): Promise<Transporter | null>;
}
