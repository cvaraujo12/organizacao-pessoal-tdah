import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

// Schema de validação Zod
export const RoutineSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  time: z.string(),
  days: z.array(z.string()),
  category: z.enum(['Manhã', 'Tarde', 'Noite', 'Trabalho', 'Estudo', 'Saúde', 'Lazer']),
  isActive: z.boolean().default(true),
  notifications: z.boolean().default(true),
  steps: z.array(z.object({
    description: z.string(),
    estimatedTime: z.number().min(1).max(180),
    isOptional: z.boolean().default(false),
  })).default([]),
  neuroNotes: z.string().optional(),
  userId: z.string(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Interface do documento
export interface IRoutine extends Document {
  title: string;
  description?: string;
  time: string;
  days: string[];
  category: 'Manhã' | 'Tarde' | 'Noite' | 'Trabalho' | 'Estudo' | 'Saúde' | 'Lazer';
  isActive: boolean;
  notifications: boolean;
  steps: Array<{
    description: string;
    estimatedTime: number;
    isOptional: boolean;
  }>;
  neuroNotes?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema do Mongoose
const routineSchema = new Schema<IRoutine>({
  title: { type: String, required: true },
  description: String,
  time: { type: String, required: true },
  days: [{ type: String, required: true }],
  category: {
    type: String,
    enum: ['Manhã', 'Tarde', 'Noite', 'Trabalho', 'Estudo', 'Saúde', 'Lazer'],
    required: true,
  },
  isActive: { type: Boolean, default: true },
  notifications: { type: Boolean, default: true },
  steps: [{
    description: { type: String, required: true },
    estimatedTime: { type: Number, required: true, min: 1, max: 180 },
    isOptional: { type: Boolean, default: false },
  }],
  neuroNotes: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
});

// Índices
routineSchema.index({ userId: 1, category: 1 });
routineSchema.index({ userId: 1, days: 1 });

// Hooks
routineSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Routine = mongoose.models.Routine || mongoose.model<IRoutine>('Routine', routineSchema); 