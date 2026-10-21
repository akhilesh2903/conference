import mongoose, { Schema, model, models } from 'mongoose';

export interface ICoAuthor {
  name: string;
  email: string;
  organization: string;
  country: string;
}

export interface IAbstractSubmission {
  submissionId: string;
  track: string;
  secondaryTrack?: string;
  title: string;
  abstract: string;
  keywords: string;
  userEmail: string;
  primaryAuthor: {
    name: string;
    email: string;
    organization: string;
    country: string;
  };
  coAuthors: ICoAuthor[];
  domainConflicts?: string;
  wordCount: number;
  status: 'Submitted' | 'Under Review' | 'Accepted' | 'Revision' | 'Rejected';
  createdAt: Date;
}

const CoAuthorSchema = new Schema<ICoAuthor>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  organization: { type: String, required: true },
  country: { type: String, required: true },
}, { _id: false });

const AbstractSubmissionSchema = new Schema<IAbstractSubmission>({
  submissionId: { type: String, required: true, unique: true },
  track: { type: String, required: true },
  secondaryTrack: { type: String, default: '' },
  title: { type: String, required: true },
  abstract: { type: String, required: true },
  keywords: { type: String, required: true },
  userEmail: { type: String, required: true },
  primaryAuthor: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    organization: { type: String, required: true },
    country: { type: String, required: true },
  },
  coAuthors: [CoAuthorSchema],
  domainConflicts: { type: String, default: '' },
  wordCount: { type: Number, required: true },
  status: { type: String, default: 'Submitted' },
  createdAt: { type: Date, default: Date.now },
});

const AbstractSubmission = models.AbstractSubmission || model<IAbstractSubmission>('AbstractSubmission', AbstractSubmissionSchema);

export default AbstractSubmission;
