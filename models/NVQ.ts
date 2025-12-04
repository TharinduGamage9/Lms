import mongoose, { Schema, Document } from 'mongoose';

export interface INVQ extends Document {
  subject: string;
  driveLink: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const NVQSchema: Schema = new Schema(
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
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.NVQ || mongoose.model<INVQ>('NVQ', NVQSchema);


