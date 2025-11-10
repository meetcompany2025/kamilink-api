// 📁 src/uploads/providers/local-storage.provider.ts

import { StorageProvider } from './storage.provider';
import { promises as fs } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';

export class LocalStorageProvider implements StorageProvider {
  private baseFolder = join(__dirname, '..', '..', '..', 'uploads');

  // Faz o upload de um arquivo e retorna o caminho salvo.
  async upload(file: Express.Multer.File, folder: string): Promise<string> {
    const fileName = `${randomUUID()}-${file.originalname}`;
    const targetFolder = join(this.baseFolder, folder);

    await fs.mkdir(targetFolder, { recursive: true });

    const filePath = join(targetFolder, fileName);
    await fs.writeFile(filePath, file.buffer);

    return `uploads/${folder}/${fileName}`; // para armazenar no banco se precisar
  }

  // Remove um arquivo armazenado.
  async delete(filePath: string): Promise<void> {
    const fullPath = join(this.baseFolder, '..', filePath);
    await fs.unlink(fullPath).catch(() => {});
  }
}
