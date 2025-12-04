import mongoose, { Schema, Document } from 'mongoose';

export interface IVisitor extends Document {
  ip: string;
  userAgent?: string;
  page: string;
  referer?: string;
  timestamp: Date;
  isUnique: boolean;
}

const VisitorSchema: Schema = new Schema(
  {
    ip: {
      type: String,
      required: true,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
    page: {
      type: String,
      required: true,
      trim: true,
    },
    referer: {
      type: String,
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    isUnique: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
VisitorSchema.index({ timestamp: -1 });
VisitorSchema.index({ ip: 1, timestamp: -1 });

export default mongoose.models.Visitor || mongoose.model<IVisitor>('Visitor', VisitorSchema);

