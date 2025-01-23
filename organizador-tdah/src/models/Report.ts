import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

// Schema de validação Zod
export const ReportSchema = z.object({
  userId: z.string(),
  type: z.enum(['daily', 'weekly', 'monthly', 'custom']),
  startDate: z.date(),
  endDate: z.date(),
  metrics: z.object({
    tasks: z.object({
      total: z.number(),
      completed: z.number(),
      overdue: z.number(),
      completionRate: z.number(),
      averageCompletionTime: z.number().optional(),
      byPriority: z.record(z.number()),
      byCategory: z.record(z.number()),
    }),
    routines: z.object({
      total: z.number(),
      active: z.number(),
      adherenceRate: z.number(),
      mostMissed: z.array(z.string()),
      mostCompleted: z.array(z.string()),
      byCategory: z.record(z.number()),
    }),
    goals: z.object({
      total: z.number(),
      achieved: z.number(),
      inProgress: z.number(),
      achievementRate: z.number(),
      byCategory: z.record(z.number()),
    }),
    focus: z.object({
      totalSessions: z.number(),
      totalMinutes: z.number(),
      averageSessionLength: z.number(),
      bestTimeOfDay: z.string().optional(),
      bestDayOfWeek: z.string().optional(),
    }),
    health: z.object({
      sleepQuality: z.number().optional(),
      exerciseMinutes: z.number().optional(),
      meditationMinutes: z.number().optional(),
      moodAverage: z.number().optional(),
      medicationAdherence: z.number().optional(),
    }).optional(),
  }),
  insights: z.array(z.object({
    type: z.enum(['success', 'warning', 'suggestion']),
    message: z.string(),
    metric: z.string(),
    value: z.number().optional(),
    recommendation: z.string().optional(),
  })).default([]),
  summary: z.string(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Interface do documento
export interface IReport extends Document {
  userId: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  startDate: Date;
  endDate: Date;
  metrics: {
    tasks: {
      total: number;
      completed: number;
      overdue: number;
      completionRate: number;
      averageCompletionTime?: number;
      byPriority: Record<string, number>;
      byCategory: Record<string, number>;
    };
    routines: {
      total: number;
      active: number;
      adherenceRate: number;
      mostMissed: string[];
      mostCompleted: string[];
      byCategory: Record<string, number>;
    };
    goals: {
      total: number;
      achieved: number;
      inProgress: number;
      achievementRate: number;
      byCategory: Record<string, number>;
    };
    focus: {
      totalSessions: number;
      totalMinutes: number;
      averageSessionLength: number;
      bestTimeOfDay?: string;
      bestDayOfWeek?: string;
    };
    health?: {
      sleepQuality?: number;
      exerciseMinutes?: number;
      meditationMinutes?: number;
      moodAverage?: number;
      medicationAdherence?: number;
    };
  };
  insights: Array<{
    type: 'success' | 'warning' | 'suggestion';
    message: string;
    metric: string;
    value?: number;
    recommendation?: string;
  }>;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema do Mongoose
const reportSchema = new Schema<IReport>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'custom'],
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  metrics: {
    tasks: {
      total: { type: Number, required: true },
      completed: { type: Number, required: true },
      overdue: { type: Number, required: true },
      completionRate: { type: Number, required: true },
      averageCompletionTime: Number,
      byPriority: { type: Map, of: Number },
      byCategory: { type: Map, of: Number },
    },
    routines: {
      total: { type: Number, required: true },
      active: { type: Number, required: true },
      adherenceRate: { type: Number, required: true },
      mostMissed: [String],
      mostCompleted: [String],
      byCategory: { type: Map, of: Number },
    },
    goals: {
      total: { type: Number, required: true },
      achieved: { type: Number, required: true },
      inProgress: { type: Number, required: true },
      achievementRate: { type: Number, required: true },
      byCategory: { type: Map, of: Number },
    },
    focus: {
      totalSessions: { type: Number, required: true },
      totalMinutes: { type: Number, required: true },
      averageSessionLength: { type: Number, required: true },
      bestTimeOfDay: String,
      bestDayOfWeek: String,
    },
    health: {
      sleepQuality: Number,
      exerciseMinutes: Number,
      meditationMinutes: Number,
      moodAverage: Number,
      medicationAdherence: Number,
    },
  },
  insights: [{
    type: {
      type: String,
      enum: ['success', 'warning', 'suggestion'],
      required: true,
    },
    message: { type: String, required: true },
    metric: { type: String, required: true },
    value: Number,
    recommendation: String,
  }],
  summary: { type: String, required: true },
}, {
  timestamps: true,
});

// Índices
reportSchema.index({ userId: 1, type: 1, startDate: -1 });
reportSchema.index({ userId: 1, createdAt: -1 });

// Hooks
reportSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Report = mongoose.models.Report || mongoose.model<IReport>('Report', reportSchema); 