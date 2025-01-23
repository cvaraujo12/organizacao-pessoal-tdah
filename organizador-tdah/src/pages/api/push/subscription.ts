import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import {
  savePushSubscription,
  removePushSubscription,
  generateVAPIDKeys,
} from '../../../lib/push';
import connectDB from '../../../lib/mongodb';

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
    case 'POST':
      try {
        const subscription = req.body;

        if (!subscription || !subscription.endpoint) {
          return res.status(400).json({ message: 'Dados de inscrição inválidos' });
        }

        await savePushSubscription(session.user.id, subscription);

        res.status(201).json({ message: 'Inscrição salva com sucesso' });
      } catch (error) {
        console.error('Erro ao salvar inscrição:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
      break;

    case 'DELETE':
      try {
        await removePushSubscription(session.user.id);
        res.status(200).json({ message: 'Inscrição removida com sucesso' });
      } catch (error) {
        console.error('Erro ao remover inscrição:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
      break;

    case 'GET':
      try {
        // Retorna as chaves VAPID públicas para o cliente
        // Isso é necessário para a inscrição inicial
        res.status(200).json({
          publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        });
      } catch (error) {
        console.error('Erro ao buscar chaves VAPID:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
      break;

    case 'PUT':
      try {
        // Gera novas chaves VAPID
        // Isso só deve ser usado em desenvolvimento ou quando necessário
        if (process.env.NODE_ENV !== 'development') {
          return res.status(403).json({ message: 'Operação não permitida' });
        }

        const keys = generateVAPIDKeys();
        res.status(200).json(keys);
      } catch (error) {
        console.error('Erro ao gerar chaves VAPID:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 