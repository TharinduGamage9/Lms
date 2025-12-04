import mongoose, { Schema, Document } from 'mongoose';

export interface IDriveLink extends Document {
  subject: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

const DriveLinkSchema: Schema = new Schema(
  {
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    link: {
      type: String,
      required: [true, 'Link is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.DriveLink || mongoose.model<IDriveLink>('DriveLink', DriveLinkSchema);

