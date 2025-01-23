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

  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const routines = await Routine.find({ userId: session.user.id })
          .sort({ category: 1, time: 1 });
        res.status(200).json(routines);
      } catch (error) {
        console.error('Erro ao buscar rotinas:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
      break;

    case 'POST':
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

        const routine = await Routine.create({
          ...validation.data,
          userId: session.user.id,
        });

        res.status(201).json(routine);
      } catch (error) {
        console.error('Erro ao criar rotina:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 