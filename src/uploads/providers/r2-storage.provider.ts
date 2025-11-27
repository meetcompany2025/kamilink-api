// 📁 src/uploads/providers/r2-storage.provider.ts

import { Injectable } from '@nestjs/common';
import { StorageProvider } from './storage.provider';
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

/**
 * Provider de storage para Cloudflare R2.
 * Implementa a interface StorageProvider para manter consistência com o sistema.
 * Pode ser facilmente substituído por outro provider (LocalStorage, AWS S3, etc).
 */
@Injectable()
export class R2StorageProvider implements StorageProvider {
    private client: S3Client;        // Cliente S3 (compatível R2)
    private bucketName: string;       // Nome do bucket no R2
    private endpoint: string;         // Endpoint do R2

    constructor() {
        this.bucketName = process.env.R2_BUCKET_NAME || '';
        this.endpoint = process.env.R2_ENDPOINT || '';

        // Configura o cliente S3 com as credenciais do R2
        this.client = new S3Client({
            region: process.env.R2_REGION || 'auto',
            endpoint: this.endpoint || '',
            credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY || '',
                secretAccessKey: process.env.R2_SECRET_KEY || '',
            },
        });
    }

    /**
     * Faz o upload de um arquivo para o bucket R2.
     * @param file - Arquivo recebido do Multer (buffer)
     * @param folder - Pasta dentro do bucket
     * @returns string - A "key" do arquivo no bucket (para salvar no banco)
     */
    async upload(file: Express.Multer.File, folder: string): Promise<string> {
        const fileKey = `${folder}/${randomUUID()}-${file.originalname}`; // Gera nome único

        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: fileKey,
            Body: file.buffer,
            ContentType: file.mimetype, // Mantém o tipo MIME
        });

        await this.client.send(command); // Executa o upload

        return fileKey; // Retorna key para salvar no banco
    }

    /**
     * Remove um arquivo do bucket R2.
     * @param fileKey - A key do arquivo
     */
    async delete(fileKey: string): Promise<void> {
        const command = new DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: fileKey,
        });

        await this.client.send(command);
    }

    /**
     * Gera URL temporária para download (pre-signed URL)
     * @param fileKey - A key do arquivo no bucket
     * @param expiresInSeconds - Tempo de expiração em segundos (default 5 min)
     * @returns string - URL assinada
     */
    async getDownloadUrl(fileKey: string, expiresInSeconds = 300): Promise<string> {
        const command = new GetObjectCommand({
            Bucket: this.bucketName,
            Key: fileKey,
        });

        const signedUrl = await getSignedUrl(this.client, command, {
            expiresIn: expiresInSeconds,
        });

        return signedUrl;
    }
}
