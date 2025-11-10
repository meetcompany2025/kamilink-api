// src/helpers/notificationTemplates.ts
import { NotificationType } from '@prisma/client';

export interface NotificationTemplateData {
  userName?: string;
  freightId?: string;
  senderName?: string;
  offerId?: string;
  systemMessage?: string;
}

export const notificationTemplates = {
  freightStatus: (data: NotificationTemplateData) => ({
    title: 'Frete criado',
    message: `Seu frete foi criado com referência ${data.freightId ?? ''}`,
    type: NotificationType.FREIGHT_STATUS,
  }),

  acceptedFreight: (data: NotificationTemplateData) => ({
    title: 'Frete aceite',
    message: `Seu frete ${data.freightId ?? ''} foi confirmado pelo transportador.`,
    type: NotificationType.FREIGHT_STATUS,
  }),

  canceledFreight: (data: NotificationTemplateData) => ({
    title: 'Frete cancelado',
    message: `Seu frete ${data.freightId ?? ''} foi cancelado.`,
    type: NotificationType.FREIGHT_STATUS,
  }),

  newOffer: (data: NotificationTemplateData) => ({
    title: 'Nova oferta recebida',
    message: `Transportador ${data.senderName ?? 'desconhecido'} enviou uma nova oferta.`,
    type: NotificationType.NEW_REQUEST,
  }),

  message: (data: NotificationTemplateData) => ({
    title: 'Mensagem recebida',
    message: `Você tem uma nova mensagem de ${data.senderName ?? 'um usuário'}.`,
    type: NotificationType.MESSAGE,
  }),

  system: (data: NotificationTemplateData) => ({
    title: 'Notificação do sistema',
    message: data.systemMessage ?? 'O sistema enviou uma notificação.',
    type: NotificationType.SYSTEM,
  }),
};
