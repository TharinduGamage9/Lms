import mongoose, { Schema, Document } from 'mongoose';

export interface IBCom extends Document {
  subject: string;
  driveLink: string;
  year: '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'English Medium';
  createdAt: Date;
  updatedAt: Date;
}

const BComSchema: Schema = new Schema(
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
    year: {
      type: String,
      enum: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'English Medium'],
      required: [true, 'Year is required'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.BCom || mongoose.model<IBCom>('BCom', BComSchema);

