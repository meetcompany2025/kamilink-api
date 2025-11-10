import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsNumber,
  IsOptional,
  IsArray,
  IsDateString,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { FreightStatus } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateFreightDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsUUID()
  vehicleId?: string;

  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @Type(() => Number)
  weightKg?: number;

  @IsOptional()
  @Type(() => Number)
  quantity?: number;

  @IsOptional()
  @Type(() => Number)
  lengthCm?: number;

  @IsOptional()
  @Type(() => Number)
  widthCm?: number;

  @IsOptional()
  @Type(() => Number)
  heightCm?: number;

  @IsOptional()
  pickupDate?: string;

  @IsOptional()
  deliveryDate?: string;

  // 🔹 Campos que estavam em falta
  @IsOptional()
  @IsString()
  transporterId?: string;

  @IsOptional()
  @IsEnum(FreightStatus)
  status?: FreightStatus;

  @IsString()
  @IsNotEmpty()
  originState: string;

  @IsString()
  @IsNotEmpty()
  destinationState: string;

  @IsString()
  @IsNotEmpty()
  cargoType: string;

  @IsString()
  @IsNotEmpty()
  originCoordinates: string;

  @IsString()
  @IsNotEmpty()
  destinationCoordinates: string;

  @Type(() => Number)
  @IsNotEmpty()
  estimatedDistance: number;

  @Type(() => Number)
  @IsNotEmpty()
  estimatedTime: number;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @IsBoolean()
  @IsNotEmpty()
  requiresLoadingHelp: boolean;

  @IsBoolean()
  @IsNotEmpty()
  requiresUnloadingHelp: boolean;

  @IsBoolean()
  @IsNotEmpty()
  hasInsurance: boolean;
}
