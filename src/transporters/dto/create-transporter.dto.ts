// src/transporter/dto/create-transporter.dto.ts
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateTransporterDto {
  // Transporter (se profile === TRANSPORTER)

  @IsOptional()
  @IsNumber()
  experienceYears?: number | null;

  @IsOptional()
  @IsString()
  licensePlate?: string | null;

  @IsOptional()
  @IsString()
  driverLicense?: string;

  @IsOptional()
  @IsBoolean()
  availability?: boolean | null;
}
