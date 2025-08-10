import mongoose, { Document, Schema } from 'mongoose';

export interface IChatSession extends Document {
  userId: mongoose.Types.ObjectId;
  country: string;
  city: string;
  title?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

const chatSessionSchema = new Schema<IChatSession>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  country: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  city: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  title: {
    type: String,
    trim: true,
    maxlength: 200
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      Reflect.deleteProperty(ret, '_id');
      Reflect.deleteProperty(ret, '__v');
      return ret;
    }
  }
});

// Index para búsquedas eficientes
chatSessionSchema.index({ userId: 1, createdAt: -1 });
chatSessionSchema.index({ userId: 1, isActive: 1 });

export const ChatSession = mongoose.model<IChatSession>('ChatSession', chatSessionSchema);