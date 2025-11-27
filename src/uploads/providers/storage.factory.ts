// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { StorageProvider } from './storage.provider';
// import { B2StorageProvider } from './b2-storage.provider';
// import { LocalStorageProvider } from './local-storage.provider';

// export type StorageType = 'local' | 'b2';

// @Injectable()
// export class StorageFactory {
//     constructor(private configService: ConfigService) { }

//     createStorageProvider(): StorageProvider {
//         const storageType = this.configService.get<StorageType>('STORAGE_PROVIDER', 'local');

//         switch (storageType) {
//             case 'b2':
//                 return new B2StorageProvider();
//             case 'local':
//             default:
//                 return new LocalStorageProvider();
//         }
//     }
// }