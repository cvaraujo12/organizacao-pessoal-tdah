import { NextApiRequest, NextApiResponse } from 'next';
import { Report } from '../../../models/Report';
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
        const report = await Report.findOne({
          _id: id,
          userId: session.user.id,
        });

        if (!report) {
          return res.status(404).json({ message: 'Relatório não encontrado' });
        }

        res.status(200).json(report);
      } catch (error) {
        console.error('Erro ao buscar relatório:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
      break;

    case 'DELETE':
      try {
        const report = await Report.findOneAndDelete({
          _id: id,
          userId: session.user.id,
        });

        if (!report) {
          return res.status(404).json({ message: 'Relatório não encontrado' });
        }

        res.status(204).end();
      } catch (error) {
        console.error('Erro ao deletar relatório:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
      break;

    case 'PATCH':
      try {
        const { action } = req.body;

        if (!action) {
          return res.status(400).json({ message: 'Ação não especificada' });
        }

        const report = await Report.findOne({
          _id: id,
          userId: session.user.id,
        });

        if (!report) {
          return res.status(404).json({ message: 'Relatório não encontrado' });
        }

        switch (action) {
          case 'archive':
            report.archived = true;
            break;
          case 'unarchive':
            report.archived = false;
            break;
          case 'share':
            // Implementar lógica de compartilhamento
            break;
          case 'export':
            // Implementar lógica de exportação
            break;
          default:
            return res.status(400).json({ message: 'Ação inválida' });
        }

        await report.save();
        res.status(200).json(report);
      } catch (error) {
        console.error('Erro ao atualizar relatório:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'DELETE', 'PATCH']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 