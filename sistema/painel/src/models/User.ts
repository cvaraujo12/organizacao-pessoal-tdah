import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

// Schema de validação Zod
export const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
  preferences: z.object({
    theme: z.enum(['light', 'dark']).default('light'),
    notifications: z.boolean().default(true),
    focusMode: z.boolean().default(false),
    taskView: z.enum(['list', 'kanban', 'calendar']).default('list'),
  }).default({}),
  healthProfile: z.object({
    tdahType: z.enum(['desatento', 'hiperativo', 'combinado']).optional(),
    medications: z.array(z.object({
      name: z.string(),
      dosage: z.string(),
      frequency: z.string(),
      schedule: z.array(z.string()),
    })).default([]),
    dietaryRestrictions: z.array(z.string()).default([]),
    exercisePreferences: z.array(z.string()).default([]),
  }).default({}),
  studyPreferences: z.object({
    preferredStudyTime: z.array(z.string()).default([]),
    breakDuration: z.number().min(5).max(30).default(15),
    studyDuration: z.number().min(15).max(120).default(45),
    preferredMaterials: z.array(z.string()).default([]),
  }).default({}),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Interface do documento
export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    focusMode: boolean;
    taskView: 'list' | 'kanban' | 'calendar';
  };
  healthProfile: {
    tdahType?: 'desatento' | 'hiperativo' | 'combinado';
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
      schedule: string[];
    }>;
    dietaryRestrictions: string[];
    exercisePreferences: string[];
  };
  studyPreferences: {
    preferredStudyTime: string[];
    breakDuration: number;
    studyDuration: number;
    preferredMaterials: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

// Schema do Mongoose
const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  preferences: {
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    notifications: { type: Boolean, default: true },
    focusMode: { type: Boolean, default: false },
    taskView: { type: String, enum: ['list', 'kanban', 'calendar'], default: 'list' },
  },
  healthProfile: {
    tdahType: { type: String, enum: ['desatento', 'hiperativo', 'combinado'] },
    medications: [{
      name: String,
      dosage: String,
      frequency: String,
      schedule: [String],
    }],
    dietaryRestrictions: [String],
    exercisePreferences: [String],
  },
  studyPreferences: {
    preferredStudyTime: [String],
    breakDuration: { type: Number, min: 5, max: 30, default: 15 },
    studyDuration: { type: Number, min: 15, max: 120, default: 45 },
    preferredMaterials: [String],
  },
}, {
  timestamps: true,
});

// Índices
userSchema.index({ email: 1 }, { unique: true });

// Hooks
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema); 