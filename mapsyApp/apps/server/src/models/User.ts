import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

// Zod schema for validation
export const UserSchema = z.object({
  email: z.string().email('Email must be valid'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  avatar: z.string().url().optional(),
  preferences: z.object({
    language: z.enum(['es', 'en', 'fr', 'de', 'pt']).default('es'),
    theme: z.enum(['light', 'dark', 'system']).default('system')
  }).optional(),
  onboardingCompleted: z.boolean().default(false)
});

export const LoginSchema = z.object({
  email: z.string().email('Email must be valid'),
  password: z.string().min(1, 'Password is required')
});

export const RegisterSchema = UserSchema.pick({
  email: true,
  password: true,
  name: true
});

// TypeScript interface
export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  avatar?: string;
  preferences: {
    language: 'es' | 'en' | 'fr' | 'de' | 'pt';
    theme: 'light' | 'dark' | 'system';
  };
  onboardingCompleted: boolean;
  createdAt: Date;
  lastLogin: Date;
}

// Mongoose schema
const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default: null
  },
  preferences: {
    language: {
      type: String,
      enum: ['es', 'en', 'fr', 'de', 'pt'],
      default: 'es'
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system'
    }
  },
  onboardingCompleted: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});


export const User = mongoose.model<IUser>('User', userSchema);