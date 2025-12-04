import mongoose, { Schema, Document } from 'mongoose';

export interface IBAExternal extends Document {
  subject: string;
  medium: string;
  driveLink: string;
  createdAt: Date;
  updatedAt: Date;
}

const BAExternalSchema: Schema = new Schema(
  {
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    medium: {
      type: String,
      required: [true, 'Medium is required'],
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

export default mongoose.models.BAExternal || mongoose.model<IBAExternal>('BAExternal', BAExternalSchema);


