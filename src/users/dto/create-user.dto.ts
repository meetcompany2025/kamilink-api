// src/users/dto/create-user.dto.ts
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsBoolean,
  IsArray,
  IsNumber,
  Min,
  MinLength,
} from 'class-validator'
import { UserProfile, AccountType } from '@prisma/client'

export class CreateUserDto {
  // User
  @IsEmail()
  email: string

  @MinLength(5)
  @IsString()
  password: string

  @IsEnum(UserProfile)
  profile: UserProfile

  // People (dados pessoais comuns)
  @IsString()
  fullName: string

  @IsString()
  documentNumber: string

  @IsString()
  phone: string // renomeado para evitar conflito com o phone do User

  @IsString()
  provincia: string

  // Client (se profile === CLIENT)
  @IsOptional()
  @IsEnum(AccountType)
  accountType?: AccountType

  @IsOptional()
  @IsString()
  companyName?: string | null

  @IsOptional()
  @IsString()
  nif?: string | null

  // Transporter (se profile === TRANSPORTER)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  vehicleTypes?: string[] | null

  @IsOptional()
  @IsNumber()
  experienceYears?: number | null

  @IsOptional()
  @IsString()
  licensePlate?: string | null

  @IsOptional()
  @IsString()
  driverLicense?: string

  @IsOptional()
  @IsBoolean()
  availability?: boolean | null
}
