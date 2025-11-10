// src/freight/dto/create-freight-offer.dto.ts
import { IsUUID, IsNumber, IsOptional, IsDateString, IsString } from 'class-validator';

export class CreateFreightOfferDto {
  @IsUUID()
  transporterId: string;

  @IsUUID()
  @IsOptional()
  freightRequestId?: string;

  @IsUUID()
  @IsOptional()
  vehicleId?: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsDateString()
  estimatedDeliveryDate?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
