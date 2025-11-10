import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
import { PrismaService } from 'src/database/prisma.service';
import { UploadFileDto } from './dto/upload-file.dto';

@Injectable()
export class FilesService {
  private supabase;
  private readonly STORAGE_BUCKET = 'uploaded-files';

  /*constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL'),
      this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY'),
    );
  }*/

  /*async uploadFiles(
    file: Express.Multer.File,
    dto: UploadFileDto,
  ): Promise<string> {
    let filePath = '';

    if (dto.type === 'document') {
      if (!dto.userId) {
        throw new BadRequestException(
          'userId é obrigatório para documentos pessoais',
        );
      }

      filePath = `documentos_usuario_${dto.userId}/${file.originalname}`;
    } else if (dto.type === 'freight') {
      if (!dto.userId || !dto.freightId) {
        throw new BadRequestException(
          'userId e freightId são obrigatórios para upload de imagem de frete',
        );
      }

      filePath = `cliente_${dto.userId}/frete_${dto.freightId}/${file.originalname}`;
    } else {
      throw new BadRequestException('Tipo de upload inválido');
    }

    const { data, error } = await this.supabase.storage
      .from(this.STORAGE_BUCKET)
      .upload(filePath, file.buffer, { contentType: file.mimetype });

    if (error) {
      throw new BadRequestException(`Erro ao fazer upload: ${error.message}`);
    }

    return `${this.configService.get<string>('SUPABASE_URL')}/storage/v1/object/${this.STORAGE_BUCKET}/${filePath}`;
  }*/

  findAll() {
    return `This action returns all files`;
  }
}
