import PDFDocument from 'pdfkit';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Report } from '../models/Report';

export class PDFService {
  static async generateReportPDF(report: Report): Promise<Buffer> {
    return new Promise((resolve) => {
      const chunks: Buffer[] = [];
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50,
        info: {
          Title: `Relatório ${report.type} - ${format(new Date(report.startDate), 'dd/MM/yyyy', { locale: ptBR })}`,
          Author: 'Organizador TDAH',
        },
      });

      // Coletar chunks do PDF
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      // Cabeçalho
      doc
        .fontSize(24)
        .font('Helvetica-Bold')
        .text(`Relatório ${this.getReportTypeText(report.type)}`, { align: 'center' });

      doc
        .fontSize(12)
        .font('Helvetica')
        .text(
          `Período: ${format(new Date(report.startDate), 'dd/MM/yyyy')} - ${format(new Date(report.endDate), 'dd/MM/yyyy')}`,
          { align: 'center' }
        )
        .moveDown(2);

      // Resumo
      doc
        .fontSize(14)
        .font('Helvetica-Bold')
        .text('Resumo', { underline: true })
        .fontSize(12)
        .font('Helvetica')
        .text(report.summary)
        .moveDown(2);

      // Métricas
      doc
        .fontSize(14)
        .font('Helvetica-Bold')
        .text('Métricas', { underline: true })
        .moveDown();

      // Tarefas
      this.addMetricsSection(doc, 'Tarefas', {
        'Total de tarefas': report.metrics.tasks.total,
        'Tarefas concluídas': `${report.metrics.tasks.completed} (${Math.round(report.metrics.tasks.completionRate)}%)`,
        'Tarefas atrasadas': report.metrics.tasks.overdue,
        ...(report.metrics.tasks.averageCompletionTime && {
          'Tempo médio de conclusão': `${Math.round(report.metrics.tasks.averageCompletionTime / (1000 * 60))} minutos`,
        }),
      });

      // Rotinas
      this.addMetricsSection(doc, 'Rotinas', {
        'Total de rotinas': report.metrics.routines.total,
        'Rotinas ativas': report.metrics.routines.active,
        'Taxa de aderência': `${Math.round(report.metrics.routines.adherenceRate)}%`,
      });

      if (report.metrics.routines.mostCompleted.length > 0) {
        doc
          .fontSize(12)
          .text('Rotinas mais completadas:')
          .list(report.metrics.routines.mostCompleted)
          .moveDown();
      }

      // Metas
      this.addMetricsSection(doc, 'Metas', {
        'Total de metas': report.metrics.goals.total,
        'Metas alcançadas': `${report.metrics.goals.achieved} (${Math.round(report.metrics.goals.achievementRate)}%)`,
        'Metas em progresso': report.metrics.goals.inProgress,
      });

      // Sessões de Foco
      this.addMetricsSection(doc, 'Sessões de Foco', {
        'Total de sessões': report.metrics.focus.totalSessions,
        'Tempo total': `${report.metrics.focus.totalMinutes} minutos`,
        'Duração média': `${Math.round(report.metrics.focus.averageSessionLength)} minutos`,
        ...(report.metrics.focus.bestTimeOfDay && {
          'Melhor horário': report.metrics.focus.bestTimeOfDay,
        }),
        ...(report.metrics.focus.bestDayOfWeek && {
          'Melhor dia': report.metrics.focus.bestDayOfWeek,
        }),
      });

      // Saúde (se disponível)
      if (report.metrics.health) {
        this.addMetricsSection(doc, 'Saúde', {
          ...(report.metrics.health.sleepQuality && {
            'Qualidade do sono': `${Math.round(report.metrics.health.sleepQuality)}/10`,
          }),
          ...(report.metrics.health.exerciseMinutes && {
            'Exercício': `${report.metrics.health.exerciseMinutes} minutos`,
          }),
          ...(report.metrics.health.meditationMinutes && {
            'Meditação': `${report.metrics.health.meditationMinutes} minutos`,
          }),
          ...(report.metrics.health.moodAverage && {
            'Humor médio': `${Math.round(report.metrics.health.moodAverage)}/10`,
          }),
          ...(report.metrics.health.medicationAdherence && {
            'Aderência à medicação': `${Math.round(report.metrics.health.medicationAdherence)}%`,
          }),
        });
      }

      // Insights
      doc
        .addPage()
        .fontSize(14)
        .font('Helvetica-Bold')
        .text('Insights', { underline: true })
        .moveDown();

      report.insights.forEach((insight) => {
        const icon = insight.type === 'success' ? '✅' : insight.type === 'warning' ? '⚠️' : 'ℹ️';
        
        doc
          .fontSize(12)
          .font('Helvetica-Bold')
          .text(`${icon} ${insight.message}`);

        if (insight.value) {
          doc
            .fontSize(10)
            .font('Helvetica')
            .text(`Valor: ${Math.round(insight.value)}${insight.metric.includes('Rate') ? '%' : ''}`);
        }

        if (insight.recommendation) {
          doc
            .fontSize(10)
            .font('Helvetica-Oblique')
            .text(`Recomendação: ${insight.recommendation}`);
        }

        doc.moveDown();
      });

      // Rodapé
      const bottomMargin = 50;
      doc
        .fontSize(8)
        .font('Helvetica')
        .text(
          `Gerado por Organizador TDAH em ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`,
          50,
          doc.page.height - bottomMargin,
          { align: 'center' }
        );

      doc.end();
    });
  }

  private static getReportTypeText(type: string): string {
    switch (type) {
      case 'daily':
        return 'Diário';
      case 'weekly':
        return 'Semanal';
      case 'monthly':
        return 'Mensal';
      default:
        return 'Personalizado';
    }
  }

  private static addMetricsSection(
    doc: PDFKit.PDFDocument,
    title: string,
    metrics: Record<string, string | number>
  ): void {
    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .text(title)
      .moveDown(0.5);

    Object.entries(metrics).forEach(([key, value]) => {
      doc
        .fontSize(10)
        .font('Helvetica')
        .text(`${key}: ${value}`);
    });

    doc.moveDown();
  }
} 