// notifications.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';


export const NOTIFICATIONS_GATEWAY = 'NOTIFICATIONS_GATEWAY';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log(`Client connected: ${client}`);
    const userId = client.handshake.query.userId;
    if (userId) {
      client.join(userId);
      console.log(`User ${userId} joined room`);
    }
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  sendNotification(userId: string, notification: any) {
    this.server.to(userId).emit('new-notification', notification);
  }
}
