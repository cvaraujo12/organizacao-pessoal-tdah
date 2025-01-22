import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

// Schema de validação Zod
export const RoutineSchema = z.object({
  userId: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  category: z.enum(['matinal', 'noturna', 'trabalho', 'estudo', 'saude', 'casa']).default('matinal'),
  schedule: z.object({
    frequency: z.enum(['diaria', 'semanal', 'mensal']).default('diaria'),
    daysOfWeek: z.array(z.number().min(0).max(6)).optional(), // 0 = Domingo, 6 = Sábado
    timeOfDay: z.string(), // formato HH:mm
    duration: z.number().min(5), // em minutos
  }),
  steps: z.array(z.object({
    title: z.string(),
    description: z.string().optional(),
    estimatedDuration: z.number().optional(), // em minutos
    order: z.number(),
    isRequired: z.boolean().default(true),
  })),
  tracking: z.object({
    streakCount: z.number().default(0),
    lastCompleted: z.date().optional(),
    completionRate: z.number().default(0), // porcentagem
    averageCompletionTime: z.number().optional(), // em minutos
  }).default({}),
  adaptations: z.object({
    useVisualGuides: z.boolean().default(true),
    useTimers: z.boolean().default(true),
    useReminders: z.boolean().default(true),
    breakdownSteps: z.boolean().default(true),
  }).default({}),
  notes: z.array(z.object({
    content: z.string(),
    timestamp: z.date().default(() => new Date()),
  })).default([]),
  isActive: z.boolean().default(true),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Interface do documento
export interface IRoutine extends Document {
  userId: string;
  title: string;
  description?: string;
  category: 'matinal' | 'noturna' | 'trabalho' | 'estudo' | 'saude' | 'casa';
  schedule: {
    frequency: 'diaria' | 'semanal' | 'mensal';
    daysOfWeek?: number[];
    timeOfDay: string;
    duration: number;
  };
  steps: Array<{
    title: string;
    description?: string;
    estimatedDuration?: number;
    order: number;
    isRequired: boolean;
  }>;
  tracking: {
    streakCount: number;
    lastCompleted?: Date;
    completionRate: number;
    averageCompletionTime?: number;
  };
  adaptations: {
    useVisualGuides: boolean;
    useTimers: boolean;
    useReminders: boolean;
    breakdownSteps: boolean;
  };
  notes: Array<{
    content: string;
    timestamp: Date;
  }>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Schema do Mongoose
const routineSchema = new Schema<IRoutine>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  category: {
    type: String,
    enum: ['matinal', 'noturna', 'trabalho', 'estudo', 'saude', 'casa'],
    default: 'matinal'
  },
  schedule: {
    frequency: {
      type: String,
      enum: ['diaria', 'semanal', 'mensal'],
      default: 'diaria'
    },
    daysOfWeek: [Number],
    timeOfDay: { type: String, required: true },
    duration: { type: Number, required: true, min: 5 },
  },
  steps: [{
    title: { type: String, required: true },
    description: String,
    estimatedDuration: Number,
    order: { type: Number, required: true },
    isRequired: { type: Boolean, default: true },
  }],
  tracking: {
    streakCount: { type: Number, default: 0 },
    lastCompleted: Date,
    completionRate: { type: Number, default: 0 },
    averageCompletionTime: Number,
  },
  adaptations: {
    useVisualGuides: { type: Boolean, default: true },
    useTimers: { type: Boolean, default: true },
    useReminders: { type: Boolean, default: true },
    breakdownSteps: { type: Boolean, default: true },
  },
  notes: [{
    content: String,
    timestamp: { type: Date, default: Date.now },
  }],
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

// Índices
routineSchema.index({ userId: 1, category: 1 });
routineSchema.index({ userId: 1, 'schedule.frequency': 1 });
routineSchema.index({ userId: 1, isActive: 1 });

// Hooks
routineSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Routine = mongoose.models.Routine || mongoose.model<IRoutine>('Routine', routineSchema); 