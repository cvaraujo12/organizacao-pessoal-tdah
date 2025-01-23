import { ReportService } from '../ReportService';
import { Report } from '../../models/Report';
import { Task } from '../../models/Task';
import { Routine } from '../../models/Routine';
import { Goal } from '../../models/Goal';
import { FocusSession } from '../../models/FocusSession';
import { HealthLog } from '../../models/HealthLog';
import mongoose from 'mongoose';

jest.mock('../../models/Report');
jest.mock('../../models/Task');
jest.mock('../../models/Routine');
jest.mock('../../models/Goal');
jest.mock('../../models/FocusSession');
jest.mock('../../models/HealthLog');

describe('ReportService', () => {
  const userId = new mongoose.Types.ObjectId().toString();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateReport', () => {
    it('should generate a daily report', async () => {
      // Mock data
      const tasks = [
        {
          _id: 'task1',
          title: 'Task 1',
          completedAt: new Date(),
          createdAt: new Date(),
          priority: 'high',
          category: 'work',
        },
      ];

      const routines = [
        {
          _id: 'routine1',
          title: 'Routine 1',
          isActive: true,
          category: 'morning',
        },
      ];

      const goals = [
        {
          _id: 'goal1',
          title: 'Goal 1',
          achievedAt: new Date(),
          progress: 100,
          category: 'personal',
        },
      ];

      const focusSessions = [
        {
          _id: 'session1',
          duration: 25,
          startTime: new Date(),
        },
      ];

      const healthLogs = [
        {
          _id: 'log1',
          sleepQuality: 8,
          exerciseMinutes: 30,
          mood: 7,
          medicationsTaken: true,
          medications: ['med1'],
        },
      ];

      // Setup mocks
      (Task.find as jest.Mock).mockResolvedValue(tasks);
      (Routine.find as jest.Mock).mockResolvedValue(routines);
      (Goal.find as jest.Mock).mockResolvedValue(goals);
      (FocusSession.find as jest.Mock).mockResolvedValue(focusSessions);
      (HealthLog.find as jest.Mock).mockResolvedValue(healthLogs);
      (Report.create as jest.Mock).mockImplementation((data) => data);

      const report = await ReportService.generateReport(userId, 'daily');

      expect(report).toBeDefined();
      expect(report.userId).toBe(userId);
      expect(report.type).toBe('daily');
      expect(report.metrics).toBeDefined();
      expect(report.insights).toBeDefined();
      expect(report.summary).toBeDefined();
    });

    it('should generate a weekly report', async () => {
      // Setup mocks with empty data
      (Task.find as jest.Mock).mockResolvedValue([]);
      (Routine.find as jest.Mock).mockResolvedValue([]);
      (Goal.find as jest.Mock).mockResolvedValue([]);
      (FocusSession.find as jest.Mock).mockResolvedValue([]);
      (HealthLog.find as jest.Mock).mockResolvedValue([]);
      (Report.create as jest.Mock).mockImplementation((data) => data);

      const report = await ReportService.generateReport(userId, 'weekly');

      expect(report).toBeDefined();
      expect(report.type).toBe('weekly');
      expect(report.metrics.tasks.total).toBe(0);
      expect(report.metrics.routines.total).toBe(0);
      expect(report.metrics.goals.total).toBe(0);
      expect(report.metrics.focus.totalSessions).toBe(0);
    });

    it('should handle custom date range', async () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-31');

      // Setup mocks with empty data
      (Task.find as jest.Mock).mockResolvedValue([]);
      (Routine.find as jest.Mock).mockResolvedValue([]);
      (Goal.find as jest.Mock).mockResolvedValue([]);
      (FocusSession.find as jest.Mock).mockResolvedValue([]);
      (HealthLog.find as jest.Mock).mockResolvedValue([]);
      (Report.create as jest.Mock).mockImplementation((data) => data);

      const report = await ReportService.generateReport(userId, 'custom', startDate, endDate);

      expect(report).toBeDefined();
      expect(report.type).toBe('custom');
      expect(report.startDate).toEqual(startDate);
      expect(report.endDate).toEqual(endDate);
    });

    it('should generate insights based on metrics', async () => {
      // Mock data with specific metrics to trigger insights
      const tasks = [
        { completedAt: new Date(), createdAt: new Date(), priority: 'high', category: 'work' },
        { completedAt: new Date(), createdAt: new Date(), priority: 'high', category: 'work' },
      ];

      // Setup mocks
      (Task.find as jest.Mock).mockResolvedValue(tasks);
      (Routine.find as jest.Mock).mockResolvedValue([]);
      (Goal.find as jest.Mock).mockResolvedValue([]);
      (FocusSession.find as jest.Mock).mockResolvedValue([]);
      (HealthLog.find as jest.Mock).mockResolvedValue([]);
      (Report.create as jest.Mock).mockImplementation((data) => data);

      const report = await ReportService.generateReport(userId, 'daily');

      expect(report.insights).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'success',
            metric: 'tasks.completionRate',
          }),
        ])
      );
    });
  });

  describe('getReports', () => {
    it('should get paginated reports', async () => {
      const mockReports = [
        { _id: 'report1', type: 'daily' },
        { _id: 'report2', type: 'weekly' },
      ];

      (Report.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue(mockReports),
          }),
        }),
      });

      (Report.countDocuments as jest.Mock).mockResolvedValue(2);

      const result = await ReportService.getReports(userId, {
        type: ['daily', 'weekly'],
        page: 1,
        limit: 10,
      });

      expect(result.reports).toHaveLength(2);
      expect(result.pagination).toBeDefined();
      expect(result.pagination.total).toBe(2);
    });

    it('should filter reports by type', async () => {
      (Report.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([]),
          }),
        }),
      });

      (Report.countDocuments as jest.Mock).mockResolvedValue(0);

      const result = await ReportService.getReports(userId, {
        type: ['daily'],
      });

      expect(Report.find).toHaveBeenCalledWith(
        expect.objectContaining({
          type: { $in: ['daily'] },
        })
      );
    });

    it('should handle date range filters', async () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-31');

      (Report.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([]),
          }),
        }),
      });

      (Report.countDocuments as jest.Mock).mockResolvedValue(0);

      const result = await ReportService.getReports(userId, {
        startDate,
        endDate,
      });

      expect(Report.find).toHaveBeenCalledWith(
        expect.objectContaining({
          startDate: {
            $gte: startDate,
            $lte: endDate,
          },
        })
      );
    });
  });
}); 