// src/uploads/providers/local.storage.ts
import { Injectable } from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { resolve } from 'path';
import { Stream } from 'stream';

/**
 * LocalStorageProvider agora implementa a interface assíncrona.
 * Mantemos comportamento idêntico, mas retornamos Promise para compatibilidade.
 */
@Injectable()
export class LocalStorageProvider {
  private readonly basePath = resolve('uploads');

  /**
   * Retorna Promise<{ stream, filename } | null>
   */
  async getFileStream(filename: string): Promise<{ stream: Stream; filename: string } | null> {
    const fullPath = resolve(this.basePath, filename);

    if (!existsSync(fullPath)) {
      return null;
    }

    const stream = createReadStream(fullPath);
    return { stream, filename };
  }

  async upload(file: Express.Multer.File, folder: string): Promise<string> {
    const fs = await import('fs/promises');
    const dir = resolve(this.basePath, folder);
    await fs.mkdir(dir, { recursive: true });

    // salvar com nome original (ou gerar uuid se preferir)
    const savedName = `${Date.now()}-${file.originalname}`;
    const fullPath = resolve(dir, savedName);
    await fs.writeFile(fullPath, file.buffer);
    // salvamos o path relativo (por exemplo "uploads/folder/name")
    return `${folder}/${savedName}`;
  }

  async delete(filePath: string): Promise<void> {
    const fs = await import('fs/promises');
    const fullPath = resolve(this.basePath, filePath);
    if (existsSync(fullPath)) {
      await fs.unlink(fullPath).catch(() => { });
    }
  }

  // -----------------------------------------------------------
  // 🔥 NOVO (opcional): URL direta para o arquivo local
  // Mantém compatibilidade com providers que usam signed URLs.
  // -----------------------------------------------------------
  async getDownloadUrl(fileKey: string): Promise<string> {
    // Exemplo:
    // fileKey = "vehicle/123-title.jpg"
    return `http://localhost:3000/uploads/${fileKey}`;
  }
}
