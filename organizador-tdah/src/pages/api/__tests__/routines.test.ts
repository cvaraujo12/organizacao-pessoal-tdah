import { createMocks } from 'node-mocks-http';
import routineHandler from '../routines';
import routineIdHandler from '../routines/[id]';
import { Routine } from '../../../models/Routine';
import { getSession } from 'next-auth/react';
import mongoose from 'mongoose';

jest.mock('next-auth/react');
jest.mock('../../../lib/mongodb', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(true),
}));

const mockSession = {
  user: {
    id: '123456789',
    email: 'test@example.com',
  },
};

(getSession as jest.Mock).mockResolvedValue(mockSession);

describe('Routines API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Routine.deleteMany({});
  });

  describe('GET /api/routines', () => {
    it('should return 401 for unauthenticated request', async () => {
      (getSession as jest.Mock).mockResolvedValueOnce(null);

      const { req, res } = createMocks({
        method: 'GET',
      });

      await routineHandler(req, res);

      expect(res._getStatusCode()).toBe(401);
      expect(JSON.parse(res._getData())).toEqual({
        message: 'Não autorizado',
      });
    });

    it('should return empty array when no routines exist', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });

      await routineHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual([]);
    });

    it('should return user routines', async () => {
      // Criar uma rotina de teste
      const routine = await Routine.create({
        title: 'Rotina de Teste',
        time: '09:00',
        days: ['Segunda'],
        category: 'Manhã',
        userId: mockSession.user.id,
      });

      const { req, res } = createMocks({
        method: 'GET',
      });

      await routineHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data).toHaveLength(1);
      expect(data[0].title).toBe('Rotina de Teste');
    });
  });

  describe('POST /api/routines', () => {
    it('should create a new routine', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          title: 'Nova Rotina',
          time: '10:00',
          days: ['Segunda', 'Quarta'],
          category: 'Manhã',
          steps: [
            {
              description: 'Etapa 1',
              estimatedTime: 15,
              isOptional: false,
            },
          ],
        },
      });

      await routineHandler(req, res);

      expect(res._getStatusCode()).toBe(201);
      const data = JSON.parse(res._getData());
      expect(data.title).toBe('Nova Rotina');
      expect(data.steps).toHaveLength(1);
    });

    it('should validate required fields', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          description: 'Apenas descrição',
        },
      });

      await routineHandler(req, res);

      expect(res._getStatusCode()).toBe(400);
      const data = JSON.parse(res._getData());
      expect(data.message).toBe('Dados inválidos');
    });
  });

  describe('GET /api/routines/[id]', () => {
    it('should return a specific routine', async () => {
      const routine = await Routine.create({
        title: 'Rotina Específica',
        time: '11:00',
        days: ['Terça'],
        category: 'Manhã',
        userId: mockSession.user.id,
      });

      const { req, res } = createMocks({
        method: 'GET',
        query: {
          id: routine._id.toString(),
        },
      });

      await routineIdHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.title).toBe('Rotina Específica');
    });

    it('should return 404 for non-existent routine', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          id: new mongoose.Types.ObjectId().toString(),
        },
      });

      await routineIdHandler(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('PUT /api/routines/[id]', () => {
    it('should update a routine', async () => {
      const routine = await Routine.create({
        title: 'Rotina para Atualizar',
        time: '12:00',
        days: ['Quinta'],
        category: 'Manhã',
        userId: mockSession.user.id,
      });

      const { req, res } = createMocks({
        method: 'PUT',
        query: {
          id: routine._id.toString(),
        },
        body: {
          title: 'Rotina Atualizada',
          time: '13:00',
          days: ['Sexta'],
          category: 'Tarde',
        },
      });

      await routineIdHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.title).toBe('Rotina Atualizada');
      expect(data.category).toBe('Tarde');
    });

    it('should validate update data', async () => {
      const routine = await Routine.create({
        title: 'Rotina para Validar',
        time: '14:00',
        days: ['Sábado'],
        category: 'Manhã',
        userId: mockSession.user.id,
      });

      const { req, res } = createMocks({
        method: 'PUT',
        query: {
          id: routine._id.toString(),
        },
        body: {
          title: '', // título inválido
        },
      });

      await routineIdHandler(req, res);

      expect(res._getStatusCode()).toBe(400);
    });
  });

  describe('DELETE /api/routines/[id]', () => {
    it('should delete a routine', async () => {
      const routine = await Routine.create({
        title: 'Rotina para Deletar',
        time: '15:00',
        days: ['Domingo'],
        category: 'Manhã',
        userId: mockSession.user.id,
      });

      const { req, res } = createMocks({
        method: 'DELETE',
        query: {
          id: routine._id.toString(),
        },
      });

      await routineIdHandler(req, res);

      expect(res._getStatusCode()).toBe(204);

      const deletedRoutine = await Routine.findById(routine._id);
      expect(deletedRoutine).toBeNull();
    });

    it('should return 404 for non-existent routine', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
        query: {
          id: new mongoose.Types.ObjectId().toString(),
        },
      });

      await routineIdHandler(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });
}); 