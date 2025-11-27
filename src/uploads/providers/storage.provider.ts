// src/uploads/providers/storage.provider.ts
import { Stream } from 'stream';

/**
 * Interface genérica para providers de storage.
 *
 * Nota: getFileStream agora é ASSÍNCRONO (Promise) para suportar providers remotos (R2/B2/S3)
 * que precisam fazer chamadas de rede para obter o objeto.
 */
export interface StorageProvider {
  /**
   * Faz o upload de um arquivo e retorna a key ou path no storage.
   */
  upload(file: Express.Multer.File, folder: string): Promise<string>;

  /**
   * Remove um arquivo armazenado.
   */
  delete(filePath: string): Promise<void>;

  /**
   * Retorna URL assinada (opcional) para providers que suportam signed URLs (R2/S3/B2).
   */
  getDownloadUrl?(fileKey: string, expiresInSeconds?: number): Promise<string>;

  /**
   * Retorna o stream de um arquivo (opcional).
   * Agora é async: Promise<{ stream, filename } | null>.
   * - LocalStorage provider também implementará como async (retornando Promise).
   */
  getFileStream?(filename: string): Promise<{ stream: Stream; filename: string } | null>;
}
