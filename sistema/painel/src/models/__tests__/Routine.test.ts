import { RoutineSchema } from '../Routine';

describe('Routine Model', () => {
  describe('Validation', () => {
    it('should validate a valid routine', () => {
      const validRoutine = {
        title: 'Rotina Matinal',
        description: 'Rotina para começar o dia',
        time: '08:00',
        days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
        category: 'Manhã',
        isActive: true,
        notifications: true,
        steps: [
          {
            description: 'Tomar água',
            estimatedTime: 5,
            isOptional: false,
          },
          {
            description: 'Meditar',
            estimatedTime: 15,
            isOptional: true,
          },
        ],
        neuroNotes: 'Começar com tarefas simples para criar momentum',
        userId: '123456789',
      };

      const result = RoutineSchema.safeParse(validRoutine);
      expect(result.success).toBe(true);
    });

    it('should validate a routine without optional fields', () => {
      const minimalRoutine = {
        title: 'Rotina Básica',
        time: '09:00',
        days: ['Segunda'],
        category: 'Manhã',
        userId: '123456789',
      };

      const result = RoutineSchema.safeParse(minimalRoutine);
      expect(result.success).toBe(true);
    });

    it('should fail with invalid title', () => {
      const invalidRoutine = {
        title: 'R', // título muito curto
        time: '09:00',
        days: ['Segunda'],
        category: 'Manhã',
        userId: '123456789',
      };

      const result = RoutineSchema.safeParse(invalidRoutine);
      expect(result.success).toBe(false);
    });

    it('should fail with invalid category', () => {
      const invalidRoutine = {
        title: 'Rotina',
        time: '09:00',
        days: ['Segunda'],
        category: 'Categoria Inválida',
        userId: '123456789',
      };

      const result = RoutineSchema.safeParse(invalidRoutine);
      expect(result.success).toBe(false);
    });

    it('should fail with invalid step time', () => {
      const invalidRoutine = {
        title: 'Rotina',
        time: '09:00',
        days: ['Segunda'],
        category: 'Manhã',
        steps: [
          {
            description: 'Tarefa',
            estimatedTime: 0, // tempo inválido
            isOptional: false,
          },
        ],
        userId: '123456789',
      };

      const result = RoutineSchema.safeParse(invalidRoutine);
      expect(result.success).toBe(false);
    });

    it('should fail without required fields', () => {
      const invalidRoutine = {
        description: 'Apenas descrição',
      };

      const result = RoutineSchema.safeParse(invalidRoutine);
      expect(result.success).toBe(false);
    });
  });
}); 