import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { Report } from '../../../../models/Report';
import { PDFService } from '../../../../services/PDFService';
import connectDB from '../../../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  const { id } = req.query;

  try {
    await connectDB();

    const report = await Report.findOne({
      _id: id,
      userId: session.user.id,
    });

    if (!report) {
      return res.status(404).json({ message: 'Relatório não encontrado' });
    }

    const pdfBuffer = await PDFService.generateReportPDF(report);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=relatorio-${report.type}-${report._id}.pdf`
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Erro ao exportar relatório:', error);
    res.status(500).json({ message: 'Erro ao exportar relatório' });
  }
} 