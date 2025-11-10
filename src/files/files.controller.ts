// src/files/files.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { UploadFileDto } from './dto/upload-file.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  /*@Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto: UploadFileDto,
  ) {
    const results = await Promise.all(
      files.map(async (file) => {
        return this.filesService.uploadFiles(file, dto);
      }),
    );

    return results;
  }*/
}
