import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RegisterFreightLocationTrackingUseCase } from '../use-cases/register-freight-location-tracking.usecase';
import { CreateFreightLocationTrackingDto } from '../dto/create-freight-location-tracking.dto';
import { Inject, UnauthorizedException, Logger } from '@nestjs/common';
import {
  FREIGHT_LOCALIZATION_TRACKING_REPOSITORY,
  FreightLocationTrackingRepositoryInterface,
} from '../repositories/freight-location-tracking.repository.interface';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ cors: true })
export class FreightLocationTrackingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger = new Logger(FreightLocationTrackingGateway.name);

  constructor(
    private readonly registerUseCase: RegisterFreightLocationTrackingUseCase,

    @Inject(FREIGHT_LOCALIZATION_TRACKING_REPOSITORY)
    private readonly repository: FreightLocationTrackingRepositoryInterface,

    private readonly jwtService: JwtService,
  ) {}

  // 🧠 Mapa de conexões: clientId => { userId, role, profileId }
  private clients: Map<
    string,
    { userId: string; role: string; profileId: string }
  > = new Map();

  // 🔐 Autentica e armazena usuário ao conectar
  async handleConnection(client: Socket) {
    //const token = client.handshake.auth?.token;
    const userId = client.handshake.query.userId;

    if (!userId) {
      this.logger.warn('Tentativa de conexão sem token');
      client.disconnect();
      return;
    }

    /*try {
      const payload = this.jwtService.verify(token);

      this.clients.set(client.id, {
        userId: payload.sub,
        role: payload.role,
        profileId: payload.profileId || payload.profile, // depende de como foi gerado o token
      });

      this.logger.log(`🔌 Usuário conectado: ${payload.sub} (${payload.role})`);
    } catch (err) {
      this.logger.error('❌ Token inválido:', err.message);
      client.disconnect();
    }*/
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client.id);
    this.logger.log(`🔌 Cliente desconectado: ${client.id}`);
  }

  // 🚛 Motorista envia localização
  @SubscribeMessage('freight.location.update')
  async handleLocationUpdate(
    @MessageBody() dto: CreateFreightLocationTrackingDto,
    @ConnectedSocket() client: Socket,
  ) {
    const identity = this.clients.get(client.id);
    if (!identity || identity.role !== 'TRANSPORTER') {
      throw new UnauthorizedException(
        'Apenas transportadores podem enviar localização',
      );
    }

    this.logger.debug(`📍 Localização recebida de ${identity.userId}:`, dto);

    await this.registerUseCase.execute(dto);

    this.server
      .to(`freight:${dto.freightId}`)
      .emit(`freight.${dto.freightId}.location`, {
        ...dto,
        timestamp: new Date().toISOString(),
      });
  }

  // 👀 Cliente/Admin/Motorista solicita última localização
  @SubscribeMessage('freight.location.request')
  async handleLocationRequest(
    @MessageBody() freightId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const identity = this.clients.get(client.id);
    if (!identity) throw new UnauthorizedException('Usuário não autenticado');

    const isAdmin = identity.role === 'ADMIN';
    const isRelated = await this.repository.isUserRelatedToFreight(
      identity.profileId,
      identity.role,
      freightId,
    );

    if (!isAdmin && !isRelated) {
      throw new UnauthorizedException(
        'Acesso negado à localização deste frete',
      );
    }

    const latest = await this.repository.findLatestByFreightId(freightId);

    if (latest) {
      client.emit(`freight.${freightId}.location.latest`, {
        freightId,
        ...latest,
      });
    }
  }

  // ✅ Usuário solicita entrar na sala de um frete
  @SubscribeMessage('freight.room.join')
  async joinFreightRoom(
    @MessageBody() freightId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const identity = this.clients.get(client.id);
    if (!identity) throw new UnauthorizedException('Usuário não autenticado');

    const isAdmin = identity.role === 'ADMIN';
    const isRelated = await this.repository.isUserRelatedToFreight(
      identity.profileId,
      identity.role,
      freightId,
    );

    if (!isAdmin && !isRelated) {
      throw new UnauthorizedException(
        'Você não tem permissão para acessar este frete',
      );
    }

    client.join(`freight:${freightId}`);
    this.logger.log(
      `✅ ${identity.userId} entrou na sala freight:${freightId}`,
    );

    client.emit('freight.room.joined', { freightId });
  }

  // 🔁 Utilitário para emitir para a sala do frete
  broadcastLocation(freightId: string, location: any) {
    this.server
      .to(`freight:${freightId}`)
      .emit(`freight.${freightId}.location`, location);
  }
}
