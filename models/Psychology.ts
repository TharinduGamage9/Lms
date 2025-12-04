import mongoose, { Schema, Document } from 'mongoose';

export interface IPsychology extends Document {
  subject: string;
  driveLink: string;
  createdAt: Date;
  updatedAt: Date;
}

const PsychologySchema: Schema = new Schema(
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

export default mongoose.models.Psychology || mongoose.model<IPsychology>('Psychology', PsychologySchema);


