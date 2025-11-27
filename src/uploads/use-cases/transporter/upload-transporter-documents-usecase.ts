// src/uploads/use-cases/upload-transporter-documents.use-case.ts
import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { ImageType, TransporterDocumentType } from '@prisma/client';
import { IMAGES_REPOSITORY, ImagesRepositoryInterface } from 'src/uploads/repositories/images.repository.interface';
import { UploadService } from 'src/uploads/upload.service';
import { UpdateTransporterStatusUseCase } from './upload-transporter-status-usecase';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UploadTransporterDocumentsUseCase {
    constructor(
        @Inject(IMAGES_REPOSITORY)
        private readonly imagesRepo: ImagesRepositoryInterface,
        private readonly uploadService: UploadService,
        private readonly updateTransporterStatusUseCase: UpdateTransporterStatusUseCase,
        private readonly prisma: PrismaService,
    ) { }

    async execute(
        transporterId: string,
        files: {
            identification?: Express.Multer.File[];
            driverLicense?: Express.Multer.File[];
        },
        documentTypes: string[], // ['BI' ou 'NIF', 'DRIVER_LICENSE']
    ) {

        // ✅ PRIMEIRO: Buscar o transporter para pegar o userId

        // Buscar o transporter
        const transporter = await this.prisma.transporter.findUnique({
            where: { id: transporterId },
            select: { userId: true, id: true }
        });

        console.log('🔍 DEBUG - TRANSPORTER FOUND:', transporter);

        if (!transporter) {
            throw new BadRequestException('Transportador não encontrado');
        }

        const userId = transporter.userId;
        // Validações básicas
        if (!transporterId) {
            throw new BadRequestException('transporterId é obrigatório');
        }

        if (!files.identification || files.identification.length === 0) {
            throw new BadRequestException('Documento de identificação (BI ou NIF) é obrigatório');
        }

        if (!files.driverLicense || files.driverLicense.length === 0) {
            throw new BadRequestException('Carta de condução é obrigatória');
        }

        if (files.identification.length > 1) {
            throw new BadRequestException('Apenas um documento de identificação é permitido');
        }

        if (files.driverLicense.length > 1) {
            throw new BadRequestException('Apenas uma carta de condução é permitida');
        }

        // Valida tipos de documentos
        if (documentTypes.length !== 2) {
            throw new BadRequestException('Devem ser informados 2 tipos de documento');
        }

        const validTypes = ['BI', 'NIF', 'DRIVER_LICENSE'];
        for (const type of documentTypes) {
            if (!validTypes.includes(type)) {
                throw new BadRequestException(`Tipo de documento inválido: ${type}`);
            }
        }

        // Verifica se tem BI ou NIF e DRIVER_LICENSE
        const hasIdentification = documentTypes.includes('BI') || documentTypes.includes('NIF');
        const hasDriverLicense = documentTypes.includes('DRIVER_LICENSE');

        if (!hasIdentification) {
            throw new BadRequestException('Deve ser enviado BI ou NIF');
        }

        if (!hasDriverLicense) {
            throw new BadRequestException('Carta de condução é obrigatória');
        }

        const saved: any[] = [];

        // 1) Upload do documento de identificação (BI ou NIF)
        const identificationFile = files.identification[0];
        const identificationType = documentTypes.find(type => type === 'BI' || type === 'NIF') as TransporterDocumentType;

        const savedIdentification = await this.uploadService.handleUpload(
            identificationFile,
            ImageType.PROFILE_DOCUMENT,
            {
                userId: userId, // Usando userId para associar ao transportador
                documentTypeTransporter: identificationType as TransporterDocumentType
            }
        );
        saved.push(savedIdentification);

        // 2) Upload da carta de condução
        const driverLicenseFile = files.driverLicense[0];
        const savedDriverLicense = await this.uploadService.handleUpload(
            driverLicenseFile,
            ImageType.PROFILE_DOCUMENT,
            {
                userId: userId,
                documentTypeTransporter: TransporterDocumentType.DRIVER_LICENSE
            }
        );
        saved.push(savedDriverLicense);

        // 3) Verificar se todos os documentos obrigatórios foram enviados
        const transporterDocs = await this.imagesRepo.findDocumentsByTransporter(transporterId);
        const uploadedDocTypes = transporterDocs.map(doc => doc.documentTypeTransporter).filter(Boolean);

        // Documentos obrigatórios: pelo menos BI ou NIF, e DRIVER_LICENSE
        const hasBIorNIF = uploadedDocTypes.includes('BI') || uploadedDocTypes.includes('NIF');
        const hasDriverLicenseDoc = uploadedDocTypes.includes('DRIVER_LICENSE');

        if (hasBIorNIF && hasDriverLicenseDoc) {
            // Atualiza status do transportador para ativo
            try {
                await this.updateTransporterStatusUseCase.execute(transporterId, true);
            } catch (err) {
                console.error('Erro ao atualizar status do transportador:', err);
            }
        }

        return {
            message: 'Upload de documentos do transportador concluído',
            uploadedCount: saved.length,
            uploaded: saved,
            transporterStatusUpdated: (hasBIorNIF && hasDriverLicenseDoc),
        };
    }
}