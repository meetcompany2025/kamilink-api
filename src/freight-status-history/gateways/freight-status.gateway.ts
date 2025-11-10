// src/modules/freight-status-history/gateways/freight-status.gateway.ts

import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
  namespace: '/freight-status-tracking',
})
export class FreightStatusGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`[WS CONNECT] Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`[WS DISCONNECT] Cliente desconectado: ${client.id}`);
  }

  emitStatusChange(
    freightId: string,
    status: string,
    timestamp: Date,
    location?: { lat: number; lng: number },
  ) {
    const payload: any = {
      freightId,
      status,
      timestamp: timestamp.toISOString(),
    };

    if (location) {
      payload.location = location;
    }

    console.log(
      '[GATEWAY] Emitindo evento:',
      `freight-status:${freightId}`,
      'Payload:',
      payload,
    );

    this.server.emit(`freight-status:${freightId}`, payload);
  }
}
