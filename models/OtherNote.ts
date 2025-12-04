import mongoose, { Schema, Document } from 'mongoose';

export interface IOtherNote extends Document {
  subject: string;
  driveLink: string;
  createdAt: Date;
  updatedAt: Date;
}

const OtherNoteSchema: Schema = new Schema(
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

export default mongoose.models.OtherNote || mongoose.model<IOtherNote>('OtherNote', OtherNoteSchema);


