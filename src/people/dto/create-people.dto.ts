// src/modules/auth/dto/create-user.dto.ts
import {
    IsNotEmpty,
    IsString,
} from 'class-validator'

export class CreatePeopleDto {

    // People (dados pessoais comuns)
    @IsNotEmpty()
    @IsString()
    fullName: string

    @IsString()
    documentNumber: string

    @IsString()
    phone: string // renomeado para evitar conflito com o phone do User

    @IsString()
    provincia: string

}
