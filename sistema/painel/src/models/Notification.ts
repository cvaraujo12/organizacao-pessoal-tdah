import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

// Schema de validação Zod
export const NotificationSchema = z.object({
  userId: z.string(),
  title: z.string().min(2),
  message: z.string(),
  type: z.enum(['routine', 'task', 'goal', 'system', 'reminder']),
  priority: z.enum(['high', 'medium', 'low']).default('medium'),
  status: z.enum(['pending', 'sent', 'read', 'dismissed']).default('pending'),
  scheduledFor: z.date().optional(),
  expiresAt: z.date().optional(),
  metadata: z.object({
    sourceId: z.string().optional(),
    sourceType: z.string().optional(),
    actionUrl: z.string().optional(),
    additionalInfo: z.record(z.any()).optional(),
  }).default({}),
  deliveryMethod: z.array(z.enum(['app', 'email', 'push'])).default(['app']),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Interface do documento
export interface INotification extends Document {
  userId: string;
  title: string;
  message: string;
  type: 'routine' | 'task' | 'goal' | 'system' | 'reminder';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'sent' | 'read' | 'dismissed';
  scheduledFor?: Date;
  expiresAt?: Date;
  metadata: {
    sourceId?: string;
    sourceType?: string;
    actionUrl?: string;
    additionalInfo?: Record<string, any>;
  };
  deliveryMethod: Array<'app' | 'email' | 'push'>;
  createdAt: Date;
  updatedAt: Date;
}

// Schema do Mongoose
const notificationSchema = new Schema<INotification>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ['routine', 'task', 'goal', 'system', 'reminder'],
    required: true,
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'read', 'dismissed'],
    default: 'pending',
  },
  scheduledFor: Date,
  expiresAt: Date,
  metadata: {
    sourceId: String,
    sourceType: String,
    actionUrl: String,
    additionalInfo: Schema.Types.Mixed,
  },
  deliveryMethod: {
    type: [String],
    enum: ['app', 'email', 'push'],
    default: ['app'],
  },
}, {
  timestamps: true,
});

// Índices
notificationSchema.index({ userId: 1, status: 1 });
notificationSchema.index({ userId: 1, scheduledFor: 1 });
notificationSchema.index({ userId: 1, type: 1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Hooks
notificationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Notification = mongoose.models.Notification || mongoose.model<INotification>('Notification', notificationSchema); 