import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  subject: string;
  driveLink: string;
  level: 'OL' | 'AL';
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema: Schema = new Schema(
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
    category: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Note || mongoose.model<INote>('Note', NoteSchema);

