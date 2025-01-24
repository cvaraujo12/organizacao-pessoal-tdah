import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

// Schema de validação Zod
export const TaskSchema = z.object({
  userId: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(['pendente', 'em_progresso', 'concluida', 'adiada', 'cancelada']).default('pendente'),
  priority: z.enum(['baixa', 'media', 'alta', 'urgente']).default('media'),
  category: z.enum(['trabalho', 'estudo', 'saude', 'casa', 'pessoal', 'financas']).default('pessoal'),
  dueDate: z.date().optional(),
  estimatedDuration: z.number().min(5).optional(), // em minutos
  actualDuration: z.number().min(0).optional(), // em minutos
  complexity: z.enum(['facil', 'media', 'dificil']).default('media'),
  tags: z.array(z.string()).default([]),
  subtasks: z.array(z.object({
    title: z.string(),
    completed: z.boolean().default(false),
    order: z.number(),
  })).default([]),
  focusSession: z.object({
    isActive: z.boolean().default(false),
    startTime: z.date().optional(),
    endTime: z.date().optional(),
    interruptions: z.number().default(0),
  }).default({}),
  notes: z.array(z.object({
    content: z.string(),
    timestamp: z.date().default(() => new Date()),
  })).default([]),
  reminders: z.array(z.date()).default([]),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Interface do documento
export interface ITask extends Document {
  userId: string;
  title: string;
  description?: string;
  status: 'pendente' | 'em_progresso' | 'concluida' | 'adiada' | 'cancelada';
  priority: 'baixa' | 'media' | 'alta' | 'urgente';
  category: 'trabalho' | 'estudo' | 'saude' | 'casa' | 'pessoal' | 'financas';
  dueDate?: Date;
  estimatedDuration?: number;
  actualDuration?: number;
  complexity: 'facil' | 'media' | 'dificil';
  tags: string[];
  subtasks: Array<{
    title: string;
    completed: boolean;
    order: number;
  }>;
  focusSession: {
    isActive: boolean;
    startTime?: Date;
    endTime?: Date;
    interruptions: number;
  };
  notes: Array<{
    content: string;
    timestamp: Date;
  }>;
  reminders: Date[];
  createdAt: Date;
  updatedAt: Date;
}

// Schema do Mongoose
const taskSchema = new Schema<ITask>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  status: { 
    type: String, 
    enum: ['pendente', 'em_progresso', 'concluida', 'adiada', 'cancelada'],
    default: 'pendente'
  },
  priority: {
    type: String,
    enum: ['baixa', 'media', 'alta', 'urgente'],
    default: 'media'
  },
  category: {
    type: String,
    enum: ['trabalho', 'estudo', 'saude', 'casa', 'pessoal', 'financas'],
    default: 'pessoal'
  },
  dueDate: Date,
  estimatedDuration: Number,
  actualDuration: Number,
  complexity: {
    type: String,
    enum: ['facil', 'media', 'dificil'],
    default: 'media'
  },
  tags: [String],
  subtasks: [{
    title: String,
    completed: { type: Boolean, default: false },
    order: Number,
  }],
  focusSession: {
    isActive: { type: Boolean, default: false },
    startTime: Date,
    endTime: Date,
    interruptions: { type: Number, default: 0 },
  },
  notes: [{
    content: String,
    timestamp: { type: Date, default: Date.now },
  }],
  reminders: [Date],
}, {
  timestamps: true,
});

// Índices
taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ userId: 1, dueDate: 1 });
taskSchema.index({ userId: 1, category: 1 });

// Hooks
taskSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Task = mongoose.models.Task || mongoose.model<ITask>('Task', taskSchema); 