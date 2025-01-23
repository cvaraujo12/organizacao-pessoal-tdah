import { NextApiRequest, NextApiResponse } from 'next';
import { Routine, RoutineSchema } from '../../../models/Routine';
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
        const routine = await Routine.findOne({
          _id: id,
          userId: session.user.id,
        });

        if (!routine) {
          return res.status(404).json({ message: 'Rotina não encontrada' });
        }

        res.status(200).json(routine);
      } catch (error) {
        console.error('Erro ao buscar rotina:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
      break;

    case 'PUT':
      try {
        const validation = RoutineSchema.safeParse({
          ...req.body,
          userId: session.user.id,
        });

        if (!validation.success) {
          return res.status(400).json({
            message: 'Dados inválidos',
            errors: validation.error.errors,
          });
        }

        const routine = await Routine.findOneAndUpdate(
          { _id: id, userId: session.user.id },
          validation.data,
          { new: true }
        );

        if (!routine) {
          return res.status(404).json({ message: 'Rotina não encontrada' });
        }

        res.status(200).json(routine);
      } catch (error) {
        console.error('Erro ao atualizar rotina:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
      break;

    case 'DELETE':
      try {
        const routine = await Routine.findOneAndDelete({
          _id: id,
          userId: session.user.id,
        });

        if (!routine) {
          return res.status(404).json({ message: 'Rotina não encontrada' });
        }

        res.status(204).end();
      } catch (error) {
        console.error('Erro ao deletar rotina:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 