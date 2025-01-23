import { NextApiRequest, NextApiResponse } from 'next';
import { Notification, NotificationSchema } from '../../../models/Notification';
import { NotificationService } from '../../../services/NotificationService';
import connectDB from '../../../lib/mongodb';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const { status, type, limit, page } = req.query;

        const result = await NotificationService.getUserNotifications(
          session.user.id,
          {
            status: status ? (status as string).split(',') : undefined,
            type: type ? (type as string).split(',') : undefined,
            limit: limit ? parseInt(limit as string) : undefined,
            page: page ? parseInt(page as string) : undefined,
          }
        );

        res.status(200).json(result);
      } catch (error) {
        console.error('Erro ao buscar notificações:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
      break;

    case 'POST':
      try {
        const validation = NotificationSchema.safeParse({
          ...req.body,
          userId: session.user.id,
        });

        if (!validation.success) {
          return res.status(400).json({
            message: 'Dados inválidos',
            errors: validation.error.errors,
          });
        }

        const notification = await NotificationService.create(validation.data);
        res.status(201).json(notification);
      } catch (error) {
        console.error('Erro ao criar notificação:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 