import { Report, IReport } from '../models/Report';
import { Task } from '../models/Task';
import { Routine } from '../models/Routine';
import { Goal } from '../models/Goal';
import { FocusSession } from '../models/FocusSession';
import { HealthLog } from '../models/HealthLog';
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

export class ReportService {
  static async generateReport(userId: string, type: IReport['type'], startDate?: Date, endDate?: Date): Promise<IReport> {
    try {
      const dateRange = this.getDateRange(type, startDate, endDate);
      const [
        taskMetrics,
        routineMetrics,
        goalMetrics,
        focusMetrics,
        healthMetrics,
      ] = await Promise.all([
        this.getTaskMetrics(userId, dateRange.start, dateRange.end),
        this.getRoutineMetrics(userId, dateRange.start, dateRange.end),
        this.getGoalMetrics(userId, dateRange.start, dateRange.end),
        this.getFocusMetrics(userId, dateRange.start, dateRange.end),
        this.getHealthMetrics(userId, dateRange.start, dateRange.end),
      ]);

      const insights = this.generateInsights({
        tasks: taskMetrics,
        routines: routineMetrics,
        goals: goalMetrics,
        focus: focusMetrics,
        health: healthMetrics,
      });

      const summary = this.generateSummary({
        type,
        metrics: {
          tasks: taskMetrics,
          routines: routineMetrics,
          goals: goalMetrics,
          focus: focusMetrics,
          health: healthMetrics,
        },
        insights,
      });

      const report = await Report.create({
        userId,
        type,
        startDate: dateRange.start,
        endDate: dateRange.end,
        metrics: {
          tasks: taskMetrics,
          routines: routineMetrics,
          goals: goalMetrics,
          focus: focusMetrics,
          health: healthMetrics,
        },
        insights,
        summary,
      });

      return report;
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      throw error;
    }
  }

  static async getReports(userId: string, options: {
    type?: IReport['type'][];
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    page?: number;
  } = {}) {
    try {
      const query: any = { userId };

      if (options.type?.length) {
        query.type = { $in: options.type };
      }

      if (options.startDate || options.endDate) {
        query.startDate = {};
        if (options.startDate) query.startDate.$gte = options.startDate;
        if (options.endDate) query.startDate.$lte = options.endDate;
      }

      const limit = options.limit || 10;
      const skip = ((options.page || 1) - 1) * limit;

      const [reports, total] = await Promise.all([
        Report.find(query)
          .sort({ startDate: -1 })
          .skip(skip)
          .limit(limit),
        Report.countDocuments(query),
      ]);

      return {
        reports,
        pagination: {
          total,
          page: options.page || 1,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error('Erro ao buscar relatórios:', error);
      throw error;
    }
  }

  private static getDateRange(type: IReport['type'], startDate?: Date, endDate?: Date) {
    const now = new Date();

    if (type === 'custom' && startDate && endDate) {
      return {
        start: startOfDay(startDate),
        end: endOfDay(endDate),
      };
    }

    switch (type) {
      case 'daily':
        return {
          start: startOfDay(now),
          end: endOfDay(now),
        };
      case 'weekly':
        return {
          start: startOfWeek(now),
          end: endOfWeek(now),
        };
      case 'monthly':
        return {
          start: startOfMonth(now),
          end: endOfMonth(now),
        };
      default:
        throw new Error('Tipo de relatório inválido');
    }
  }

  private static async getTaskMetrics(userId: string, startDate: Date, endDate: Date) {
    const tasks = await Task.find({
      userId,
      createdAt: { $lte: endDate },
      $or: [
        { completedAt: { $gte: startDate, $lte: endDate } },
        { dueDate: { $gte: startDate, $lte: endDate } },
        { completedAt: null },
      ],
    });

    const total = tasks.length;
    const completed = tasks.filter(t => t.completedAt).length;
    const overdue = tasks.filter(t => !t.completedAt && t.dueDate && t.dueDate < new Date()).length;

    const byPriority: Record<string, number> = {};
    const byCategory: Record<string, number> = {};

    tasks.forEach(task => {
      byPriority[task.priority] = (byPriority[task.priority] || 0) + 1;
      byCategory[task.category] = (byCategory[task.category] || 0) + 1;
    });

    const completionTimes = tasks
      .filter(t => t.completedAt)
      .map(t => t.completedAt!.getTime() - t.createdAt.getTime());

    return {
      total,
      completed,
      overdue,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
      averageCompletionTime: completionTimes.length > 0
        ? completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length
        : undefined,
      byPriority,
      byCategory,
    };
  }

  private static async getRoutineMetrics(userId: string, startDate: Date, endDate: Date) {
    const routines = await Routine.find({
      userId,
      createdAt: { $lte: endDate },
    });

    const total = routines.length;
    const active = routines.filter(r => r.isActive).length;

    // Calcular aderência às rotinas
    const routineExecutions = await Promise.all(
      routines.map(routine =>
        this.getRoutineExecutions(routine._id, startDate, endDate)
      )
    );

    const adherenceRates = routineExecutions.map(executions => {
      const total = executions.expected;
      const completed = executions.actual;
      return total > 0 ? (completed / total) * 100 : 0;
    });

    const adherenceRate = adherenceRates.length > 0
      ? adherenceRates.reduce((a, b) => a + b, 0) / adherenceRates.length
      : 0;

    // Rotinas mais perdidas e mais completadas
    const routineStats = routines.map((routine, index) => ({
      id: routine._id,
      title: routine.title,
      adherenceRate: adherenceRates[index],
    }));

    const mostMissed = routineStats
      .sort((a, b) => a.adherenceRate - b.adherenceRate)
      .slice(0, 5)
      .map(r => r.title);

    const mostCompleted = routineStats
      .sort((a, b) => b.adherenceRate - a.adherenceRate)
      .slice(0, 5)
      .map(r => r.title);

    const byCategory: Record<string, number> = {};
    routines.forEach(routine => {
      byCategory[routine.category] = (byCategory[routine.category] || 0) + 1;
    });

    return {
      total,
      active,
      adherenceRate,
      mostMissed,
      mostCompleted,
      byCategory,
    };
  }

  private static async getGoalMetrics(userId: string, startDate: Date, endDate: Date) {
    const goals = await Goal.find({
      userId,
      createdAt: { $lte: endDate },
      $or: [
        { achievedAt: { $gte: startDate, $lte: endDate } },
        { deadline: { $gte: startDate } },
        { achievedAt: null },
      ],
    });

    const total = goals.length;
    const achieved = goals.filter(g => g.achievedAt).length;
    const inProgress = goals.filter(g => !g.achievedAt && g.progress > 0).length;

    const byCategory: Record<string, number> = {};
    goals.forEach(goal => {
      byCategory[goal.category] = (byCategory[goal.category] || 0) + 1;
    });

    return {
      total,
      achieved,
      inProgress,
      achievementRate: total > 0 ? (achieved / total) * 100 : 0,
      byCategory,
    };
  }

  private static async getFocusMetrics(userId: string, startDate: Date, endDate: Date) {
    const sessions = await FocusSession.find({
      userId,
      startTime: { $gte: startDate, $lte: endDate },
    });

    const totalSessions = sessions.length;
    const totalMinutes = sessions.reduce((total, session) =>
      total + session.duration,
      0
    );

    const averageSessionLength = totalSessions > 0
      ? totalMinutes / totalSessions
      : 0;

    // Encontrar melhor horário do dia
    const hourCounts: Record<number, number> = {};
    sessions.forEach(session => {
      const hour = session.startTime.getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    const bestHour = Object.entries(hourCounts)
      .sort(([, a], [, b]) => b - a)[0]?.[0];

    // Encontrar melhor dia da semana
    const dayCounts: Record<number, number> = {};
    sessions.forEach(session => {
      const day = session.startTime.getDay();
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    });

    const bestDay = Object.entries(dayCounts)
      .sort(([, a], [, b]) => b - a)[0]?.[0];

    const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    return {
      totalSessions,
      totalMinutes,
      averageSessionLength,
      bestTimeOfDay: bestHour ? `${bestHour}:00` : undefined,
      bestDayOfWeek: bestDay ? weekDays[parseInt(bestDay)] : undefined,
    };
  }

  private static async getHealthMetrics(userId: string, startDate: Date, endDate: Date) {
    const logs = await HealthLog.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    });

    if (logs.length === 0) {
      return undefined;
    }

    const sleepQualityLogs = logs.filter(log => log.sleepQuality);
    const exerciseLogs = logs.filter(log => log.exerciseMinutes);
    const meditationLogs = logs.filter(log => log.meditationMinutes);
    const moodLogs = logs.filter(log => log.mood);
    const medicationLogs = logs.filter(log => log.medications?.length);

    return {
      sleepQuality: sleepQualityLogs.length > 0
        ? sleepQualityLogs.reduce((sum, log) => sum + log.sleepQuality!, 0) / sleepQualityLogs.length
        : undefined,
      exerciseMinutes: exerciseLogs.length > 0
        ? exerciseLogs.reduce((sum, log) => sum + log.exerciseMinutes!, 0)
        : undefined,
      meditationMinutes: meditationLogs.length > 0
        ? meditationLogs.reduce((sum, log) => sum + log.meditationMinutes!, 0)
        : undefined,
      moodAverage: moodLogs.length > 0
        ? moodLogs.reduce((sum, log) => sum + log.mood!, 0) / moodLogs.length
        : undefined,
      medicationAdherence: medicationLogs.length > 0
        ? (medicationLogs.filter(log => log.medicationsTaken).length / medicationLogs.length) * 100
        : undefined,
    };
  }

  private static generateInsights(metrics: IReport['metrics']) {
    const insights: IReport['insights'] = [];

    // Insights de tarefas
    if (metrics.tasks.completionRate >= 80) {
      insights.push({
        type: 'success',
        message: 'Excelente taxa de conclusão de tarefas!',
        metric: 'tasks.completionRate',
        value: metrics.tasks.completionRate,
      });
    } else if (metrics.tasks.completionRate <= 50) {
      insights.push({
        type: 'warning',
        message: 'Taxa de conclusão de tarefas abaixo do ideal',
        metric: 'tasks.completionRate',
        value: metrics.tasks.completionRate,
        recommendation: 'Tente quebrar as tarefas em partes menores e mais gerenciáveis',
      });
    }

    // Insights de rotinas
    if (metrics.routines.adherenceRate >= 80) {
      insights.push({
        type: 'success',
        message: 'Ótima aderência às rotinas!',
        metric: 'routines.adherenceRate',
        value: metrics.routines.adherenceRate,
      });
    } else if (metrics.routines.adherenceRate <= 50) {
      insights.push({
        type: 'warning',
        message: 'Baixa aderência às rotinas',
        metric: 'routines.adherenceRate',
        value: metrics.routines.adherenceRate,
        recommendation: 'Considere ajustar os horários das rotinas ou simplificá-las',
      });
    }

    // Insights de metas
    if (metrics.goals.achievementRate >= 70) {
      insights.push({
        type: 'success',
        message: 'Excelente progresso nas metas!',
        metric: 'goals.achievementRate',
        value: metrics.goals.achievementRate,
      });
    }

    // Insights de foco
    if (metrics.focus.totalSessions > 0) {
      if (metrics.focus.averageSessionLength >= 25) {
        insights.push({
          type: 'success',
          message: 'Bom tempo médio de foco!',
          metric: 'focus.averageSessionLength',
          value: metrics.focus.averageSessionLength,
        });
      } else {
        insights.push({
          type: 'suggestion',
          message: 'Tempo médio de foco pode melhorar',
          metric: 'focus.averageSessionLength',
          value: metrics.focus.averageSessionLength,
          recommendation: 'Experimente a técnica Pomodoro com intervalos regulares',
        });
      }
    }

    // Insights de saúde
    if (metrics.health) {
      if (metrics.health.sleepQuality && metrics.health.sleepQuality >= 7) {
        insights.push({
          type: 'success',
          message: 'Boa qualidade de sono!',
          metric: 'health.sleepQuality',
          value: metrics.health.sleepQuality,
        });
      }

      if (metrics.health.medicationAdherence && metrics.health.medicationAdherence < 90) {
        insights.push({
          type: 'warning',
          message: 'Aderência à medicação pode melhorar',
          metric: 'health.medicationAdherence',
          value: metrics.health.medicationAdherence,
          recommendation: 'Configure lembretes para tomar as medicações',
        });
      }
    }

    return insights;
  }

  private static generateSummary({
    type,
    metrics,
    insights,
  }: {
    type: IReport['type'];
    metrics: IReport['metrics'];
    insights: IReport['insights'];
  }) {
    const period = type === 'daily' ? 'hoje' :
      type === 'weekly' ? 'esta semana' :
      type === 'monthly' ? 'este mês' : 'neste período';

    const taskSummary = `${period === 'hoje' ? 'Completou' : 'Completaram-se'} ${metrics.tasks.completed} de ${metrics.tasks.total} tarefas (${Math.round(metrics.tasks.completionRate)}% de conclusão)`;
    
    const routineSummary = `A aderência às rotinas foi de ${Math.round(metrics.routines.adherenceRate)}%`;
    
    const goalSummary = metrics.goals.achieved > 0
      ? `${metrics.goals.achieved} ${metrics.goals.achieved === 1 ? 'meta foi alcançada' : 'metas foram alcançadas'}`
      : 'Nenhuma meta foi alcançada ainda';

    const focusSummary = metrics.focus.totalSessions > 0
      ? `Realizou ${metrics.focus.totalSessions} ${metrics.focus.totalSessions === 1 ? 'sessão' : 'sessões'} de foco, totalizando ${metrics.focus.totalMinutes} minutos`
      : 'Nenhuma sessão de foco registrada';

    const healthSummary = metrics.health
      ? [
          metrics.health.sleepQuality && `Qualidade média do sono: ${Math.round(metrics.health.sleepQuality)}/10`,
          metrics.health.exerciseMinutes && `${metrics.health.exerciseMinutes} minutos de exercício`,
          metrics.health.medicationAdherence && `${Math.round(metrics.health.medicationAdherence)}% de aderência à medicação`,
        ].filter(Boolean).join(', ')
      : '';

    const insightsSummary = insights.length > 0
      ? `Principais insights: ${insights
          .filter(i => i.type === 'success' || i.type === 'warning')
          .slice(0, 2)
          .map(i => i.message.toLowerCase())
          .join('; ')}`
      : '';

    return [
      `Resumo do desempenho ${period}:`,
      taskSummary,
      routineSummary,
      goalSummary,
      focusSummary,
      healthSummary,
      insightsSummary,
    ].filter(Boolean).join('. ');
  }

  private static async getRoutineExecutions(routineId: string, startDate: Date, endDate: Date) {
    // Aqui você implementaria a lógica para contar quantas vezes a rotina deveria ter sido executada
    // e quantas vezes foi realmente executada no período
    // Por enquanto, retornamos valores fictícios
    return {
      expected: 10,
      actual: 8,
    };
  }
} 