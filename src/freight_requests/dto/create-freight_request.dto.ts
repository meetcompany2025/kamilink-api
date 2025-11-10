// src/freight/dto/create-freight-request.dto.ts
import {
  IsUUID,
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
 
} from 'class-validator';

export class CreateFreightRequestDto {

  clientId: string;

  @IsString()
  id: string;

  @IsString()
  originAddress: string;

  @IsString()
  originCity: string;

  @IsString()
  originState: string;

  @IsString()
  destinationAddress: string;

  @IsString()
  destinationCity: string;

  @IsString()
  destinationState: string;

  @IsString()
  cargoType: string;

  @IsString()
  weight: string;

  @IsOptional()
  @IsString()
  dimensions?: string;

  @IsString()
  quantity: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  pickupDate: string;

  @IsDateString()
  deliveryDate: string;

  @IsOptional()
  @IsBoolean()
  requiresLoadingHelp?: boolean;

  @IsOptional()
  @IsBoolean()
  requiresUnloadingHelp?: boolean;

  @IsOptional()
  @IsBoolean()
  hasInsurance?: boolean;
}
