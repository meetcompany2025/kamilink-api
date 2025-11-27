// 📁 src/uploads/upload.controller.ts

import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  Delete,
  Res,
  BadRequestException,
  NotFoundException,
  UploadedFiles,
  Inject,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { lookup } from 'mime-types';

import { ImageType, UserProfile, VehicleDocumentType } from '@prisma/client';

import { UploadService } from './upload.service';

// Auth & Role Guards
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { JWTPayload } from 'src/auth/jwt.strategy';

// Use-cases
import { GetImagesByUserUseCase } from './use-cases/get-images-by-user.use-case';
import { GetImagesByVehicleUseCase } from './use-cases/get-images-by-vehicle.use-case';
import { GetImagesByFreightUseCase } from './use-cases/get-images-by-freight.use-case';
import { ViewImageUseCase } from './use-cases/view-image.use-case';
import { DeleteImageUseCase } from './use-cases/delete-image.use-case';
import { UpdateVehicleStatusUseCase } from 'src/vehicles/use-cases/update-vehicle-status.usecase';
import { UploadTransporterDocumentsUseCase } from './use-cases/transporter/upload-transporter-documents-usecase';
import { UpsertProfileImageUseCase } from './use-cases/upsert-profile-image-usecase';

@Controller('uploads')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly getImagesByUser: GetImagesByUserUseCase,
    private readonly getImagesByVehicle: GetImagesByVehicleUseCase,
    private readonly getImagesByFreight: GetImagesByFreightUseCase,
    private readonly viewImageUseCase: ViewImageUseCase,
    private readonly deleteImageUseCase: DeleteImageUseCase,

    private readonly uploadTransporterDocumentsUseCase: UploadTransporterDocumentsUseCase,
    private readonly updateVehicleStatusUseCase: UpdateVehicleStatusUseCase,
    private readonly upsertProfileImageUseCase: UpsertProfileImageUseCase,
    // private readonly vehiclesRepo: VehiclesRepository,

  ) { }

  // -------------------------------------------------------------------------
  // 📌 1. Upload de Arquivo
  // -------------------------------------------------------------------------
  /**
   * Faz o upload de um arquivo para o provedor escolhido (R2).
   * Disponível para CLIENT, TRANSPORTER e ADMIN.
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.CLIENT, UserProfile.TRANSPORTER, UserProfile.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('type') type: ImageType,
    @Req() req: Request,
    @Body('vehicleId') vehicleId?: string,
    @Body('freightId') freightId?: string,
  ) {
    // ----------------------------
    // 🔎 Validações manuais
    // ----------------------------
    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado.');
    }

    if (!type) {
      throw new BadRequestException(
        'O campo "type" é obrigatório (front, back, document...).',
      );
    }

    const user = req.user as JWTPayload;

    return this.uploadService.handleUpload(file, type, {
      userId: user.userId,
      vehicleId,
      freightId,
    });
  }

  // -------------------------------------------------------------------------
  // 📌 2. Buscar imagens por usuário
  // -------------------------------------------------------------------------
  @Get('user/:userId')
  async getByUser(@Param('userId') userId: string) {
    return await this.getImagesByUser.execute(userId);
  }

  // -------------------------------------------------------------------------
  // 📌 3. Buscar imagens por veículo
  // -------------------------------------------------------------------------
  @Get('vehicle/:vehicleId')
  async getByVehicle(@Param('vehicleId') vehicleId: string) {
    return await this.getImagesByVehicle.execute(vehicleId);
  }

  // -------------------------------------------------------------------------
  // 📌 4. Buscar imagens por frete
  // -------------------------------------------------------------------------
  @Get('freight/:freightId')
  async getByFreight(@Param('freightId') freightId: string) {
    return await this.getImagesByFreight.execute(freightId);
  }

  // -------------------------------------------------------------------------
  // 📌 5. Visualizar imagem (stream)
  // -------------------------------------------------------------------------
  /**
   * Faz o streaming de uma imagem usando o nome/mime real.
   */

  /**
   * Endpoint para visualizar imagem inline no navegador
   * GET /images/:id/view
   */
  @Get(':id/view')
  async view(@Param('id') id: string, @Res() res: Response) {
    // { stream, filename }
    const { stream, filename } = await this.viewImageUseCase.execute(id);

    if (!stream) {
      throw new NotFoundException('Não foi possível criar stream do arquivo.');
    }

    // MIME type real baseado no nome do arquivo
    const mimeType = lookup(filename) || 'application/octet-stream';

    res.set({
      'Content-Type': mimeType,
      'Content-Disposition': `inline; filename="${filename}"`,
    });

    // Envia o stream diretamente para o cliente
    return stream.pipe(res);
  }

  // -------------------------------------------------------------------------
  // 📌 6. Deletar imagem
  // -------------------------------------------------------------------------
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteImageUseCase.execute(id);
    return { message: 'Imagem excluída com sucesso' };
  }

  // ROTA: POST /uploads/vehicle-documents/:vehicleId/upload
  // Recebe:
  //  - vehicleImage (file)  => chave "vehicleImage"
  //  - documents (up to 4)  => chave "documents" (vários arquivos, mesma key)
  //  - documentTypes (string) => JSON string array ["TITLE","INSURANCE","IPO","IVM"]
  // ---------------------------------------------------------------
  @Post('vehicle-documents/:vehicleId/upload')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'vehicleImage', maxCount: 1 },
    { name: 'documents', maxCount: 4 },
  ]))
  async uploadVehicleDocuments(
    @Param('vehicleId') vehicleId: string,
    @UploadedFiles()
    files: {
      vehicleImage?: Express.Multer.File[];
      documents?: Express.Multer.File[];
    },
    @Body('documentTypes') documentTypesRaw?: string, // JSON string: '["TITLE","INSURANCE","IPO","IVM"]'
    @Req() req?: Request, // caso precise do user logado
  ) {
    // validações básicas
    if (!vehicleId) throw new BadRequestException('vehicleId é obrigatório');
    if (!files || (!files.vehicleImage || files.vehicleImage.length === 0)) {
      throw new BadRequestException('vehicleImage (foto) é obrigatória');
    }
    if (!files.documents || files.documents.length < 4) {
      throw new BadRequestException('Devem ser enviados 4 documentos obrigatórios');
    }

    // parse do documentTypes: preferimos que o frontend envie como JSON string
    let documentTypes: string[] = [];
    if (documentTypesRaw) {
      try {
        documentTypes = JSON.parse(documentTypesRaw);
      } catch (err) {
        throw new BadRequestException('documentTypes deve ser um JSON válido (ex: ["TITLE","INSURANCE","IPO","IVM"])');
      }
    }

    // se documentTypes fornecido, deve ter mesmo comprimento que documents (ou pelo menos 4 tipos)
    if (documentTypes.length > 0 && documentTypes.length !== files.documents.length) {
      throw new BadRequestException('documentTypes deve ter o mesmo número de items que "documents" ou ser omitido');
    }

    const saved: any[] = [];

    // 1) foto do veículo (VEHICLE_IMAGE)
    const vehicleImageFile = files.vehicleImage[0];
    const savedVehicleImage = await this.uploadService.handleUpload(
      vehicleImageFile,
      ImageType.VEHICLE_IMAGE,
      { vehicleId }
    );
    saved.push(savedVehicleImage);

    // 2) documentos (VEHICLE_DOCUMENT) — associando documentType por index se informado
    for (let i = 0; i < files.documents.length; i++) {
      const file = files.documents[i];
      const docType = documentTypes.length ? documentTypes[i] : undefined;

      // se não tiver documentType, você pode optar por falhar ou usar null — aqui validamos e exigimos
      if (!docType) {
        throw new BadRequestException('documentType ausente para um dos arquivos. Envie documentTypes como JSON array em ordem.');
      }

      const savedDoc = await this.uploadService.handleUpload(
        file,
        ImageType.VEHICLE_DOCUMENT,
        { vehicleId, documentType: docType as any /* VehicleDocumentType */ }
      );
      saved.push(savedDoc);
    }

    // 3) após salvar todos, verificar se agora o veículo possui todos os documentos obrigatórios
    //    e atualizar status caso positivo
    // buscar documentos do veículo
    const docs = await (this.getImagesByVehicle ? this.getImagesByVehicle.execute(vehicleId) : null);

    // caso não tenha use-case getImagesByVehicle: podemos usar imagesRepo.findDocumentsByVehicle diretamente
    // aqui assumimos que getImagesByVehicle.execute retorna array de imagens com documentType
    const uploadedDocTypes = (docs || []).map((d: any) => d.documentType).filter(Boolean);

    const requiredDocs = ['TITLE', 'INSURANCE', 'IPO', 'IVM'];
    const allPresent = requiredDocs.every(r => uploadedDocTypes.includes(r));

    if (allPresent) {
      // atualiza status do veículo para "Disponível"
      try {
        // await this.vehiclesRepo.updateStatus(vehicleId, 'Disponível');
        await this.updateVehicleStatusUseCase.execute(vehicleId, 'Disponível');
      } catch (err) {
        // logue, mas não faz rollback dos uploads; opcional: enviar aviso ao usuário
        console.error('Erro ao atualizar status do veículo:', err);
      }
    }

    return {
      message: 'Upload concluído',
      uploadedCount: saved.length,
      uploaded: saved,
      vehicleStatusUpdatedToAvailable: allPresent,
    };
  }

  // Adicionar no src/uploads/upload.controller.ts
  @Post('transporter-documents/:transporterId/upload')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'identification', maxCount: 1 }, // BI ou NIF
    { name: 'driverLicense', maxCount: 1 },  // Carta de Condução
  ]))
  async uploadTransporterDocuments(
    @Param('transporterId') transporterId: string,
    @UploadedFiles()
    files: {
      identification?: Express.Multer.File[];
      driverLicense?: Express.Multer.File[];
    },
    @Body('documentTypes') documentTypesRaw: string, // JSON string: '["BI", "DRIVER_LICENSE"]' ou '["NIF", "DRIVER_LICENSE"]'
  ) {

    // console.log('🚀 TRANSPORTER UPLOAD STARTED');
    // console.log('transporterId:', transporterId);
    // console.log('Files keys:', Object.keys(files));
    // console.log('identification files:', files.identification?.length);
    // console.log('driverLicense files:', files.driverLicense?.length);
    // console.log('documentTypesRaw:', documentTypesRaw);
    // Parse do documentTypes
    let documentTypes: string[] = [];
    try {
      documentTypes = JSON.parse(documentTypesRaw);
    } catch (err) {
      throw new BadRequestException('documentTypes deve ser um JSON válido (ex: ["BI", "DRIVER_LICENSE"])');
    }

    return await this.uploadTransporterDocumentsUseCase.execute(
      transporterId,
      files,
      documentTypes
    );
  }


  // upload image profile
  @Post('profile-image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserProfile.CLIENT, UserProfile.TRANSPORTER, UserProfile.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado.');
    }

    // Validar se é imagem
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Apenas imagens são permitidas para foto de perfil.');
    }

    const user = req.user as JWTPayload;

    return this.upsertProfileImageUseCase.execute(file, user.userId);
  }

}
