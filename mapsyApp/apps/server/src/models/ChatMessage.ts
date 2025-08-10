import mongoose, { Document, Schema } from 'mongoose';
import type { LandmarkDetectionResult } from '../services/googleVision.js';

export interface IPlaceRecommendation {
  name: string;
  type: string; // museum, monument, attraction, restaurant, etc.
  distance?: number; // distance in meters
  description: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  imageUrl?: string;
  rating?: number;
  openingHours?: string;
}

export interface IChatMessage extends Document {
  chatSessionId: mongoose.Types.ObjectId;
  type: 'text' | 'image' | 'recommendation' | 'system';
  content: string;
  imageUrl?: string;
  landmarkInfo?: LandmarkDetectionResult;
  aiResponse?: string;
  recommendations?: IPlaceRecommendation[];
  timestamp: Date;
  sender: 'user' | 'assistant';
  processing?: boolean;
}

const placeRecommendationSchema = new Schema<IPlaceRecommendation>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  distance: {
    type: Number,
    min: 0
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
  imageUrl: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  openingHours: {
    type: String,
    trim: true
  }
}, { _id: false });

const chatMessageSchema = new Schema<IChatMessage>({
  chatSessionId: {
    type: Schema.Types.ObjectId,
    ref: 'ChatSession',
    required: true,
    index: true
  },
  type: {
    type: String,
    required: true,
    enum: ['text', 'image', 'recommendation', 'system'],
    index: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  landmarkInfo: {
    type: Schema.Types.Mixed // Flexible para almacenar LandmarkDetectionResult
  },
  aiResponse: {
    type: String,
    trim: true
  },
  recommendations: [placeRecommendationSchema],
  sender: {
    type: String,
    required: true,
    enum: ['user', 'assistant'],
    index: true
  },
  processing: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: { createdAt: 'timestamp', updatedAt: false },
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      Reflect.deleteProperty(ret, '_id');
      Reflect.deleteProperty(ret, '__v');
      return ret;
    }
  }
});

// Index para búsquedas eficientes y ordenamiento
chatMessageSchema.index({ chatSessionId: 1, timestamp: 1 });
chatMessageSchema.index({ chatSessionId: 1, type: 1 });

export const ChatMessage = mongoose.model<IChatMessage>('ChatMessage', chatMessageSchema);