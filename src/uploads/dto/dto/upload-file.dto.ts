// src/uploads/dto/upload-file.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadFileDto {
  @IsNotEmpty()
  @IsString()
  freightId: string;
}
