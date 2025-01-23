import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { connectDB } from '@/lib/db';
import { ReportService } from '@/services/ReportService';
import { ReportSchema } from '@/models/Report';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });
    if (!session?.user?.id) {
      return res.status(401).json({ error: 'Não autorizado' });
    }

    await connectDB();

    switch (req.method) {
      case 'GET':
        return handleGet(req, res, session.user.id);
      case 'POST':
        return handlePost(req, res, session.user.id);
      default:
        return res.status(405).json({ error: 'Método não permitido' });
    }
  } catch (error) {
    console.error('Erro ao processar requisição:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse, userId: string) {
  try {
    const { type, startDate, endDate, page, limit } = req.query;

    const options: any = {
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 10,
    };

    if (type) {
      options.type = Array.isArray(type) ? type : [type];
    }

    if (startDate) {
      options.startDate = new Date(startDate as string);
    }

    if (endDate) {
      options.endDate = new Date(endDate as string);
    }

    const result = await ReportService.getReports(userId, options);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Erro ao buscar relatórios:', error);
    return res.status(500).json({ error: 'Erro ao buscar relatórios' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse, userId: string) {
  try {
    const validation = ReportSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        error: 'Dados inválidos',
        details: validation.error.errors,
      });
    }

    const { type, startDate, endDate } = req.body;

    const report = await ReportService.generateReport(
      userId,
      type,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );

    return res.status(201).json(report);
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    return res.status(500).json({ error: 'Erro ao gerar relatório' });
  }
} 