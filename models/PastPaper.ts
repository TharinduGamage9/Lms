import mongoose, { Schema, Document } from 'mongoose';

export interface IPastPaper extends Document {
  subject: string;
  driveLink: string;
  level: 'OL' | 'AL';
  createdAt: Date;
  updatedAt: Date;
}

const PastPaperSchema: Schema = new Schema(
  {
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    driveLink: {
      type: String,
      required: [true, 'Drive link is required'],
      trim: true,
    },
    level: {
      type: String,
      enum: ['OL', 'AL'],
      required: [true, 'Level is required'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.PastPaper || mongoose.model<IPastPaper>('PastPaper', PastPaperSchema);
