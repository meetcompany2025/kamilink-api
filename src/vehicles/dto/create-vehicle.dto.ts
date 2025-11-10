import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateVehicleDto {

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @IsString()
  @IsNotEmpty()
  type: string; // Ex: Caminhão, Moto, Carro

  @IsInt()
  @IsNotEmpty()
  loadCapacity: number;

  @IsOptional()
  @IsString()
  trailerType: string;

  @IsString()
  @IsNotEmpty()
  baseProvince: string;

  @IsOptional()
  @IsString()
  userId: string;

}
