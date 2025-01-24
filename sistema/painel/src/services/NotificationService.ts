import { Notification, INotification } from '../models/Notification';
import { sendEmail } from '../lib/email';
import { sendPushNotification } from '../lib/push';

export class NotificationService {
  static async create(data: Partial<INotification>) {
    try {
      const notification = await Notification.create(data);
      await this.processNotification(notification);
      return notification;
    } catch (error) {
      console.error('Erro ao criar notificação:', error);
      throw error;
    }
  }

  static async getUserNotifications(userId: string, options: {
    status?: string[];
    type?: string[];
    limit?: number;
    page?: number;
  } = {}) {
    try {
      const query: any = { userId };

      if (options.status?.length) {
        query.status = { $in: options.status };
      }

      if (options.type?.length) {
        query.type = { $in: options.type };
      }

      const limit = options.limit || 10;
      const skip = ((options.page || 1) - 1) * limit;

      const [notifications, total] = await Promise.all([
        Notification.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
        Notification.countDocuments(query),
      ]);

      return {
        notifications,
        pagination: {
          total,
          page: options.page || 1,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
      throw error;
    }
  }

  static async markAsRead(notificationId: string, userId: string) {
    try {
      const notification = await Notification.findOneAndUpdate(
        { _id: notificationId, userId },
        { status: 'read' },
        { new: true }
      );

      if (!notification) {
        throw new Error('Notificação não encontrada');
      }

      return notification;
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
      throw error;
    }
  }

  static async dismiss(notificationId: string, userId: string) {
    try {
      const notification = await Notification.findOneAndUpdate(
        { _id: notificationId, userId },
        { status: 'dismissed' },
        { new: true }
      );

      if (!notification) {
        throw new Error('Notificação não encontrada');
      }

      return notification;
    } catch (error) {
      console.error('Erro ao descartar notificação:', error);
      throw error;
    }
  }

  static async processNotification(notification: INotification) {
    try {
      // Se a notificação está agendada para o futuro, não processa agora
      if (notification.scheduledFor && notification.scheduledFor > new Date()) {
        return;
      }

      const deliveryPromises = notification.deliveryMethod.map(async (method) => {
        switch (method) {
          case 'email':
            return this.sendEmailNotification(notification);
          case 'push':
            return this.sendPushNotification(notification);
          case 'app':
            return this.markAsSent(notification._id);
          default:
            console.warn(`Método de entrega desconhecido: ${method}`);
            return null;
        }
      });

      await Promise.all(deliveryPromises);
    } catch (error) {
      console.error('Erro ao processar notificação:', error);
      throw error;
    }
  }

  private static async sendEmailNotification(notification: INotification) {
    try {
      await sendEmail({
        to: notification.userId, // Aqui precisaria buscar o email do usuário
        subject: notification.title,
        text: notification.message,
        html: this.generateEmailTemplate(notification),
      });

      await this.markAsSent(notification._id);
    } catch (error) {
      console.error('Erro ao enviar notificação por email:', error);
      throw error;
    }
  }

  private static async sendPushNotification(notification: INotification) {
    try {
      await sendPushNotification({
        userId: notification.userId,
        title: notification.title,
        body: notification.message,
        data: notification.metadata,
      });

      await this.markAsSent(notification._id);
    } catch (error) {
      console.error('Erro ao enviar push notification:', error);
      throw error;
    }
  }

  private static async markAsSent(notificationId: string) {
    try {
      await Notification.findByIdAndUpdate(notificationId, {
        status: 'sent',
      });
    } catch (error) {
      console.error('Erro ao marcar notificação como enviada:', error);
      throw error;
    }
  }

  private static generateEmailTemplate(notification: INotification): string {
    // Template básico, pode ser melhorado com um sistema de templates mais robusto
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${notification.title}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              border-radius: 4px;
            }
            .content {
              padding: 20px;
            }
            .footer {
              text-align: center;
              padding: 20px;
              font-size: 12px;
              color: #666;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: white;
              text-decoration: none;
              border-radius: 4px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${notification.title}</h1>
            </div>
            <div class="content">
              <p>${notification.message}</p>
              ${notification.metadata.actionUrl ? `
                <a href="${notification.metadata.actionUrl}" class="button">
                  Ver mais
                </a>
              ` : ''}
            </div>
            <div class="footer">
              <p>Esta é uma notificação automática do Organizador TDAH.</p>
              <p>Por favor, não responda este email.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  static async processScheduledNotifications() {
    try {
      const now = new Date();
      const notifications = await Notification.find({
        status: 'pending',
        scheduledFor: { $lte: now },
      });

      const processPromises = notifications.map((notification) =>
        this.processNotification(notification)
      );

      await Promise.all(processPromises);
    } catch (error) {
      console.error('Erro ao processar notificações agendadas:', error);
      throw error;
    }
  }

  static async cleanupExpiredNotifications() {
    try {
      const now = new Date();
      await Notification.deleteMany({
        expiresAt: { $lte: now },
      });
    } catch (error) {
      console.error('Erro ao limpar notificações expiradas:', error);
      throw error;
    }
  }
} 