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

  const { id } = req.query;

  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const notification = await Notification.findOne({
          _id: id,
          userId: session.user.id,
        });

        if (!notification) {
          return res.status(404).json({ message: 'Notificação não encontrada' });
        }

        res.status(200).json(notification);
      } catch (error) {
        console.error('Erro ao buscar notificação:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
      break;

    case 'PUT':
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

        const notification = await Notification.findOneAndUpdate(
          { _id: id, userId: session.user.id },
          validation.data,
          { new: true }
        );

        if (!notification) {
          return res.status(404).json({ message: 'Notificação não encontrada' });
        }

        res.status(200).json(notification);
      } catch (error) {
        console.error('Erro ao atualizar notificação:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
      break;

    case 'DELETE':
      try {
        const notification = await Notification.findOneAndDelete({
          _id: id,
          userId: session.user.id,
        });

        if (!notification) {
          return res.status(404).json({ message: 'Notificação não encontrada' });
        }

        res.status(204).end();
      } catch (error) {
        console.error('Erro ao deletar notificação:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
      break;

    case 'PATCH':
      try {
        const { action } = req.body;

        if (!action) {
          return res.status(400).json({ message: 'Ação não especificada' });
        }

        let notification;

        switch (action) {
          case 'mark_as_read':
            notification = await NotificationService.markAsRead(id as string, session.user.id);
            break;
          case 'dismiss':
            notification = await NotificationService.dismiss(id as string, session.user.id);
            break;
          default:
            return res.status(400).json({ message: 'Ação inválida' });
        }

        res.status(200).json(notification);
      } catch (error) {
        console.error('Erro ao atualizar status da notificação:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'PATCH']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 