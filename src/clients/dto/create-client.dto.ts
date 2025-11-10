/*import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  MinLength,
  Matches,
  IsString,
} from 'class-validator';

export enum AccountType {
  PERSONAL = 'personal',
  BUSINESS = 'business',
}

export enum UserProfile {
  CLIENT = 'CLIENT',
  TRANSPORTER = 'TRANSPORTER',
  ADMIN = 'ADMIN',
}
export class CreateClientDto {
  @IsEnum(AccountType)
  accountType: AccountType;

  @IsNotEmpty()
  provincia: string;

  @IsOptional()
  companyName?: string;

  @IsOptional()
  nif?: string;

  
  //Dados do user
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(UserProfile)
  profile?: UserProfile;

  @IsString()
  documentType: string;

  @IsString()
  documentNumber: string;*/
// src/client/dto/create-client.dto.ts
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AccountType } from '@prisma/client';

export class CreateClientDto {
  // Client (se profile === CLIENT)
  @IsOptional()
  @IsEnum(AccountType)
  accountType?: AccountType;

  @IsOptional()
  @IsString()
  companyName?: string | null;

  @IsOptional()
  @IsString()
  nif?: string | null;
}
