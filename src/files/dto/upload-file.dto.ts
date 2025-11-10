// dto/upload-file.dto.ts
export class UploadFileDto {
  type: 'document' | 'freight' | 'exam';
  userId?: number;
  freightId?: number;
  id_exame?: number; // for exam completion logic
}
