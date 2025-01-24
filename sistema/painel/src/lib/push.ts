import webpush from 'web-push';
import { User } from '../models/User';

// Configurar as chaves VAPID
webpush.setVapidDetails(
  process.env.NEXT_PUBLIC_APP_URL || 'https://organizadortdah.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '',
  process.env.VAPID_PRIVATE_KEY || ''
);

interface PushNotificationPayload {
  userId: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  icon?: string;
  badge?: string;
  image?: string;
  tag?: string;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
}

export async function sendPushNotification(payload: PushNotificationPayload): Promise<void> {
  try {
    const user = await User.findById(payload.userId);
    if (!user?.pushSubscription) {
      console.warn(`Usuário ${payload.userId} não tem inscrição para push notifications`);
      return;
    }

    const notificationPayload = {
      notification: {
        title: payload.title,
        body: payload.body,
        icon: payload.icon || '/icons/icon-192x192.png',
        badge: payload.badge || '/icons/badge-96x96.png',
        image: payload.image,
        tag: payload.tag,
        data: payload.data,
        actions: payload.actions,
        vibrate: [100, 50, 100],
        requireInteraction: true,
        renotify: true,
      },
    };

    await webpush.sendNotification(
      user.pushSubscription,
      JSON.stringify(notificationPayload)
    );
  } catch (error) {
    console.error('Erro ao enviar push notification:', error);
    throw error;
  }
}

export async function savePushSubscription(userId: string, subscription: PushSubscription): Promise<void> {
  try {
    await User.findByIdAndUpdate(userId, {
      pushSubscription: subscription,
    });
  } catch (error) {
    console.error('Erro ao salvar inscrição de push:', error);
    throw error;
  }
}

export async function removePushSubscription(userId: string): Promise<void> {
  try {
    await User.findByIdAndUpdate(userId, {
      $unset: { pushSubscription: 1 },
    });
  } catch (error) {
    console.error('Erro ao remover inscrição de push:', error);
    throw error;
  }
}

export function generateVAPIDKeys(): { publicKey: string; privateKey: string } {
  return webpush.generateVAPIDKeys();
}

// Service Worker
export const serviceWorkerScript = `
  self.addEventListener('push', function(event) {
    const data = event.data.json();
    const options = data.notification;

    event.waitUntil(
      self.registration.showNotification(options.title, options)
    );
  });

  self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    if (event.action) {
      // Lidar com ações específicas
      const action = event.action;
      const notification = event.notification;
      const data = notification.data;

      event.waitUntil(
        handleNotificationAction(action, data)
      );
    } else {
      // Abrir a aplicação quando clicar na notificação
      event.waitUntil(
        clients.openWindow('/')
      );
    }
  });

  async function handleNotificationAction(action, data) {
    switch (action) {
      case 'view':
        if (data?.url) {
          return clients.openWindow(data.url);
        }
        break;
      case 'dismiss':
        // Apenas fecha a notificação (já feito automaticamente)
        break;
      default:
        console.warn('Ação desconhecida:', action);
    }
  }

  self.addEventListener('pushsubscriptionchange', function(event) {
    event.waitUntil(
      self.registration.pushManager.subscribe(event.oldSubscription.options)
        .then(function(subscription) {
          // Enviar nova inscrição para o servidor
          return fetch('/api/push/subscription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(subscription),
          });
        })
    );
  });
`;

// Função para registrar o service worker
export async function registerServiceWorker(): Promise<void> {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      // Criar um blob com o script do service worker
      const blob = new Blob([serviceWorkerScript], { type: 'text/javascript' });
      const serviceWorkerUrl = URL.createObjectURL(blob);

      // Registrar o service worker
      const registration = await navigator.serviceWorker.register(serviceWorkerUrl, {
        scope: '/',
      });

      // Limpar o URL do blob após o registro
      URL.revokeObjectURL(serviceWorkerUrl);

      console.log('Service Worker registrado com sucesso:', registration);
    } catch (error) {
      console.error('Erro ao registrar Service Worker:', error);
      throw error;
    }
  } else {
    throw new Error('Push notifications não são suportadas neste navegador');
  }
}

// Função para solicitar permissão e inscrever nas push notifications
export async function subscribeToPushNotifications(userId: string): Promise<PushSubscription> {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      throw new Error('Permissão para notificações negada');
    }

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    });

    await savePushSubscription(userId, subscription);

    return subscription;
  } catch (error) {
    console.error('Erro ao inscrever nas push notifications:', error);
    throw error;
  }
}

// Função para cancelar a inscrição nas push notifications
export async function unsubscribeFromPushNotifications(userId: string): Promise<void> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();
      await removePushSubscription(userId);
    }
  } catch (error) {
    console.error('Erro ao cancelar inscrição nas push notifications:', error);
    throw error;
  }
} 