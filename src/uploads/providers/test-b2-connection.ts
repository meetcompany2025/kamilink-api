// // test-b2-connection.ts (crie temporariamente)
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';

// async function testB2Connection() {
//     console.log('🧪 Testando conexão com B2...');

//     const config = new ConfigService();

//     const endpoint = config.get('B2_ENDPOINT');
//     const accessKeyId = config.get('B2_ACCESS_KEY_ID');
//     const secretAccessKey = config.get('B2_SECRET_ACCESS_KEY');

//     console.log('🔍 Configurações:');
//     console.log('Endpoint:', endpoint);
//     console.log('Access Key ID:', accessKeyId?.substring(0, 10) + '...');
//     console.log('Secret Key:', secretAccessKey?.substring(0, 10) + '...');

//     try {
//         const s3Client = new S3Client({
//             endpoint: endpoint,
//             region: 'us-east-005',
//             credentials: {
//                 accessKeyId: accessKeyId,
//                 secretAccessKey: secretAccessKey,
//             },
//             forcePathStyle: true,
//         });

//         // Teste simples de listar buckets
//         const command = new ListBucketsCommand({});
//         const result = await s3Client.send(command);

//         console.log('✅ Conexão bem-sucedida!');
//         console.log('📦 Buckets disponíveis:', result.Buckets?.map(b => b.Name));

//     } catch (error) {
//         console.log('❌ Erro na conexão:');
//         console.log('Mensagem:', error.message);
//         console.log('Code:', error.code);
//         console.log('Stack:', error.stack);
//     }
// }

// // Execute o teste
// testB2Connection();