import mongoose, { Schema, Document } from 'mongoose';

export interface IGrade5 extends Document {
  subject: string;
  driveLink: string;
  createdAt: Date;
  updatedAt: Date;
}

const Grade5Schema: Schema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Grade5 || mongoose.model<IGrade5>('Grade5', Grade5Schema);


