import { createMocks } from 'node-mocks-http';
import reportsHandler from '../reports';
import reportIdHandler from '../reports/[id]';
import { Report } from '../../../models/Report';
import { ReportService } from '../../../services/ReportService';
import { getSession } from 'next-auth/react';
import mongoose from 'mongoose';

jest.mock('next-auth/react');
jest.mock('../../../lib/mongodb', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(true),
}));
jest.mock('../../../services/ReportService');

const mockSession = {
  user: {
    id: '123456789',
    email: 'test@example.com',
  },
};

(getSession as jest.Mock).mockResolvedValue(mockSession);

describe('Reports API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe('GET /api/reports', () => {
    it('should return 401 for unauthenticated request', async () => {
      (getSession as jest.Mock).mockResolvedValueOnce(null);

      const { req, res } = createMocks({
        method: 'GET',
      });

      await reportsHandler(req, res);

      expect(res._getStatusCode()).toBe(401);
      expect(JSON.parse(res._getData())).toEqual({
        error: 'Não autorizado',
      });
    });

    it('should return paginated reports', async () => {
      const mockReports = {
        reports: [
          { _id: 'report1', type: 'daily' },
          { _id: 'report2', type: 'weekly' },
        ],
        pagination: {
          total: 2,
          page: 1,
          pages: 1,
        },
      };

      (ReportService.getReports as jest.Mock).mockResolvedValue(mockReports);

      const { req, res } = createMocks({
        method: 'GET',
        query: {
          page: '1',
          limit: '10',
        },
      });

      await reportsHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(mockReports);
    });

    it('should handle type filter', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          type: 'daily',
        },
      });

      await reportsHandler(req, res);

      expect(ReportService.getReports).toHaveBeenCalledWith(
        mockSession.user.id,
        expect.objectContaining({
          type: ['daily'],
        })
      );
    });

    it('should handle date range filter', async () => {
      const startDate = '2024-01-01';
      const endDate = '2024-01-31';

      const { req, res } = createMocks({
        method: 'GET',
        query: {
          startDate,
          endDate,
        },
      });

      await reportsHandler(req, res);

      expect(ReportService.getReports).toHaveBeenCalledWith(
        mockSession.user.id,
        expect.objectContaining({
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        })
      );
    });
  });

  describe('POST /api/reports', () => {
    it('should generate a new report', async () => {
      const mockReport = {
        _id: 'report1',
        type: 'daily',
        metrics: {},
        insights: [],
        summary: 'Test summary',
      };

      (ReportService.generateReport as jest.Mock).mockResolvedValue(mockReport);

      const { req, res } = createMocks({
        method: 'POST',
        body: {
          type: 'daily',
        },
      });

      await reportsHandler(req, res);

      expect(res._getStatusCode()).toBe(201);
      expect(JSON.parse(res._getData())).toEqual(mockReport);
    });

    it('should validate request body', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          type: 'invalid_type',
        },
      });

      await reportsHandler(req, res);

      expect(res._getStatusCode()).toBe(400);
      expect(JSON.parse(res._getData())).toHaveProperty('error', 'Dados inválidos');
    });
  });

  describe('GET /api/reports/[id]', () => {
    it('should return a specific report', async () => {
      const mockReport = {
        _id: 'report1',
        type: 'daily',
        userId: mockSession.user.id,
      };

      (Report.findOne as jest.Mock).mockResolvedValue(mockReport);

      const { req, res } = createMocks({
        method: 'GET',
        query: {
          id: 'report1',
        },
      });

      await reportIdHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(mockReport);
    });

    it('should return 404 for non-existent report', async () => {
      (Report.findOne as jest.Mock).mockResolvedValue(null);

      const { req, res } = createMocks({
        method: 'GET',
        query: {
          id: 'nonexistent',
        },
      });

      await reportIdHandler(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /api/reports/[id]', () => {
    it('should delete a report', async () => {
      const mockReport = {
        _id: 'report1',
        type: 'daily',
        userId: mockSession.user.id,
      };

      (Report.findOneAndDelete as jest.Mock).mockResolvedValue(mockReport);

      const { req, res } = createMocks({
        method: 'DELETE',
        query: {
          id: 'report1',
        },
      });

      await reportIdHandler(req, res);

      expect(res._getStatusCode()).toBe(204);
    });

    it('should return 404 for non-existent report', async () => {
      (Report.findOneAndDelete as jest.Mock).mockResolvedValue(null);

      const { req, res } = createMocks({
        method: 'DELETE',
        query: {
          id: 'nonexistent',
        },
      });

      await reportIdHandler(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('PATCH /api/reports/[id]', () => {
    it('should archive a report', async () => {
      const mockReport = {
        _id: 'report1',
        type: 'daily',
        userId: mockSession.user.id,
        save: jest.fn(),
      };

      (Report.findOne as jest.Mock).mockResolvedValue(mockReport);

      const { req, res } = createMocks({
        method: 'PATCH',
        query: {
          id: 'report1',
        },
        body: {
          action: 'archive',
        },
      });

      await reportIdHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(mockReport.archived).toBe(true);
      expect(mockReport.save).toHaveBeenCalled();
    });

    it('should validate action', async () => {
      const { req, res } = createMocks({
        method: 'PATCH',
        query: {
          id: 'report1',
        },
        body: {
          action: 'invalid_action',
        },
      });

      await reportIdHandler(req, res);

      expect(res._getStatusCode()).toBe(400);
      expect(JSON.parse(res._getData())).toHaveProperty('message', 'Ação inválida');
    });
  });
}); 