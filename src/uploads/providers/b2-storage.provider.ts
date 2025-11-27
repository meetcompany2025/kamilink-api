// src/uploads/providers/b2-storage.provider.ts
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Stream } from 'stream';
import { StorageProvider } from './storage.provider';

@Injectable()
export class B2StorageProvider implements StorageProvider, OnModuleInit {
    private readonly logger = new Logger(B2StorageProvider.name);
    private s3Client: S3Client;
    private bucketName: string;

    constructor(private configService: ConfigService) { }

    onModuleInit() {
        this.initializeClient();
    }

    private initializeClient() {
        try {
            const endpoint = this.getRequiredConfig('B2_ENDPOINT');
            const region = this.getRequiredConfig('B2_REGION');
            const accessKeyId = this.getRequiredConfig('B2_ACCESS_KEY_ID');
            const secretAccessKey = this.getRequiredConfig('B2_SECRET_ACCESS_KEY');

            this.bucketName = this.getRequiredConfig('B2_BUCKET_NAME');

            // ✅ VALIDAÇÃO DO ENDPOINT
            this.validateEndpoint(endpoint);

            this.s3Client = new S3Client({
                endpoint: endpoint,
                region: region,
                credentials: {
                    accessKeyId: accessKeyId,
                    secretAccessKey: secretAccessKey,
                },
                forcePathStyle: true,
            });

            this.logger.log('✅ B2 Storage Provider inicializado');
            this.logger.log(`📦 Bucket: ${this.bucketName}`);
            this.logger.log(`🌐 Endpoint: ${endpoint}`);
            this.logger.log(`📍 Região: ${region}`);

        } catch (error) {
            this.logger.error('❌ Falha ao inicializar B2 Storage Provider');
            this.logger.error(`💡 Detalhes: ${error.message}`);
            throw error;
        }
    }

    private validateEndpoint(endpoint: string) {
        try {
            new URL(endpoint);
        } catch (error) {
            throw new Error(`Endpoint inválido: "${endpoint}". Deve ser uma URL válida como: https://s3.us-east-005.backblazeb2.com`);
        }
    }

    private getRequiredConfig(key: string): string {
        const value = this.configService.get<string>(key);
        if (!value) {
            throw new Error(`Configuração ${key} é obrigatória para B2 Storage`);
        }
        return value;
    }

    async upload(file: Express.Multer.File, folder: string): Promise<string> {
        // ✅ VALIDAÇÃO DO ARQUIVO
        if (!file || !file.buffer) {
            throw new Error('Arquivo inválido ou vazio');
        }

        try {
            const timestamp = Date.now();
            const safeFileName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
            const fileKey = `${folder}/${timestamp}-${safeFileName}`;

            this.logger.log(`📤 Iniciando upload: ${fileKey} (${file.size} bytes)`);

            const command = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: fileKey,
                Body: file.buffer,
                ContentType: file.mimetype,
                Metadata: {
                    originalName: file.originalname,
                    uploadedAt: timestamp.toString(),
                },
            });

            await this.s3Client.send(command);

            this.logger.log(`✅ Upload realizado com sucesso: ${fileKey}`);
            return fileKey;
        } catch (error) {
            this.logger.error(`❌ Erro no upload para B2:`);
            this.logger.error(`🔍 Detalhes: ${error.message}`);
            this.logger.error(`💡 Stack: ${error.stack}`);

            throw new Error(`Falha no upload para B2: ${error.message}`);
        }
    }

    // ... (manter os outros métodos delete, getFileStream, getDownloadUrl)
    async delete(filePath: string): Promise<void> {
        try {
            const command = new DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: filePath,
            });

            await this.s3Client.send(command);
            this.logger.log(`✅ Arquivo deletado: ${filePath}`);
        } catch (error) {
            this.logger.error(`❌ Erro ao deletar ${filePath}: ${error.message}`);
        }
    }

    async getFileStream(filename: string): Promise<{ stream: Stream; filename: string } | null> {
        try {
            const command = new GetObjectCommand({
                Bucket: this.bucketName,
                Key: filename,
            });

            const response = await this.s3Client.send(command);

            if (!response.Body) {
                return null;
            }

            const originalName = response.Metadata?.originalname || filename.split('/').pop() || filename;

            return {
                stream: response.Body as Stream,
                filename: originalName,
            };
        } catch (error) {
            if (error.name === 'NoSuchKey' || error.name === 'NotFound') {
                return null;
            }
            this.logger.error(`❌ Erro ao obter stream: ${error.message}`);
            return null;
        }
    }

    async getDownloadUrl(fileKey: string, expiresInSeconds: number = 3600): Promise<string> {
        try {
            const command = new GetObjectCommand({
                Bucket: this.bucketName,
                Key: fileKey,
            });

            return await getSignedUrl(this.s3Client, command, {
                expiresIn: expiresInSeconds
            });
        } catch (error) {
            this.logger.error(`❌ Erro ao gerar URL: ${error.message}`);
            throw error;
        }
    }
}