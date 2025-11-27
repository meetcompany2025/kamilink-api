// import { Injectable } from '@nestjs/common';
// import { StorageProvider } from './storage.provider';
// import { randomUUID } from 'crypto';
// import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
// import { Readable } from 'stream';

// /**
//  * Provider B2 adaptado à interface StorageProvider
//  * AGORA com implementação completa do getFileStream
//  */
// @Injectable()
// export class B2StorageProvider implements StorageProvider {
//     private client: S3Client;
//     private bucketName: string;

//     constructor() {
//         this.bucketName = process.env.B2_BUCKET_NAME || 'uploads-kamilink';

//         this.client = new S3Client({
//             region: process.env.B2_REGION || 'us-west-002',
//             endpoint: `https://${process.env.B2_ACCOUNT_ID}.s3.${process.env.B2_REGION}.backblazeb2.com`,
//             credentials: {
//                 accessKeyId: process.env.B2_KEY_ID || '',
//                 secretAccessKey: process.env.B2_APPLICATION_KEY || '',
//             },
//         });
//     }

//     async upload(file: Express.Multer.File, folder: string): Promise<string> {
//         const fileKey = `${folder}/${randomUUID()}-${file.originalname}`;
//         const cmd = new PutObjectCommand({
//             Bucket: this.bucketName,
//             Key: fileKey,
//             Body: file.buffer,
//             ContentType: file.mimetype,
//         });
//         await this.client.send(cmd);
//         return fileKey;
//     }

//     async delete(fileKey: string): Promise<void> {
//         const cmd = new DeleteObjectCommand({ Bucket: this.bucketName, Key: fileKey });
//         await this.client.send(cmd);
//     }

//     // ✅ AGORA IMPLEMENTADO: getFileStream para B2
//     async getFileStream(fileKey: string): Promise<{ stream: Readable; filename: string } | null> {
//         try {
//             const cmd = new GetObjectCommand({
//                 Bucket: this.bucketName,
//                 Key: fileKey
//             });

//             const response = await this.client.send(cmd);

//             if (!response.Body) {
//                 return null;
//             }

//             // Converte o Body do B2 para Readable Stream
//             const stream = response.Body as Readable;
//             const filename = fileKey.split('/').pop() || fileKey;

//             return { stream, filename };
//         } catch (error) {
//             console.error('Erro ao obter stream do B2:', error);
//             return null;
//         }
//     }

//     // ✅ URL temporária para downloads diretos
//     async getDownloadUrl(fileKey: string, expiresInSeconds = 3600): Promise<string> {
//         const cmd = new GetObjectCommand({ Bucket: this.bucketName, Key: fileKey });
//         return getSignedUrl(this.client, cmd, { expiresIn: expiresInSeconds });
//     }
// }